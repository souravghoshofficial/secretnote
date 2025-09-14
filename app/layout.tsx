import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes"


export const metadata: Metadata = {
  title: "SecretNote – Share Your Thoughts Anonymously",
  description:
    "A safe and simple platform to send and receive anonymous messages, feedback, or wishes. SecretNote helps you discover what others truly think, without revealing their identity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-full h-screen`}
        >
           <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
