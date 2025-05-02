import type { Metadata } from "next";
import { Prompt  } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-prompt',
})


export const metadata: Metadata = {
  title: "Spy Game",
  description: "",
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
