import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from 'path';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title');
    const description = formData.get('description');
    const videoFile = formData.get('videoFile');
    const thumbnailFile = formData.get('thumbnailFile');

    if (!title || !description || !videoFile || !thumbnailFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const bucketName = process.env.S3_BUCKET_NAME || 'tesflix-videos';

    const uploadToS3 = async (file, prefix) => {
      const ext = path.extname(file.name);
      const fileName = `${prefix}-${Date.now()}${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      });

      await s3Client.send(command);
      return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
    };

    const [videoUrl, thumbnailUrl] = await Promise.all([
      uploadToS3(videoFile, 'video'),
      uploadToS3(thumbnailFile, 'thumb')
    ]);

    const video = await prisma.video.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
      }
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
