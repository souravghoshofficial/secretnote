import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "SecretNote – Share Your Thoughts Anonymously",
  description:
    "A safe and simple platform to send and receive anonymous messages, feedback, or wishes. SecretNote helps you discover what others truly think, without revealing their identity.",
  manifest: "/manifest.json",
    keywords: [
    "anonymous feedback",
    "anonymous messages",
    "SecretNote",
    "anonymous wishes",
    "private messages",
  ],
  authors: [{ name: "SecretNote Team" }],
  openGraph: {
    title: "SecretNote – Share Your Thoughts Anonymously",
    description:
      "Send and receive anonymous feedback, wishes, and thoughts safely with SecretNote.",
    url: "https://secretnote.live", 
    siteName: "SecretNote",
    images: [
      {
        url: "/secretnote.png",
        width: 1200,
        height: 630,
        alt: "SecretNote – Share Your Thoughts Anonymously",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SecretNote – Share Your Thoughts Anonymously",
    description:
      "A safe and simple platform to send and receive anonymous messages, feedback, or wishes.",
    images: ["/secretnote.png"],
    
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://secretnote.live", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-full h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
