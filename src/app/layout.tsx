import type { Metadata, Viewport } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-prompt',
})


export const metadata: Metadata = {
  title: "Spy Game",
  description: "A party game of deduction and deception.",
  keywords: ["spy game", "party game", "deduction", "multiplayer"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Spy Game",
    description: "Join your friends to uncover the spy!",
    type: "website",
    locale: "en_US",
    siteName: "Spy Game",
  },
  twitter: {
    card: "summary",
    title: "Spy Game",
    description: "Join your friends to uncover the spy!",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${prompt.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
