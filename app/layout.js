import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Tesflix - Watch TV Shows Online, Watch Movies Online",
  description: "A Netflix clone with video upload capabilities built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ paddingTop: '70px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
