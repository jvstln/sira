import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ClientRootLayout from "@/components/layouts/client-root-layout";

export const metadata: Metadata = {
  title: "Sira | Spot It, Report It, Improve It ",
  description: "Enhancing Our Department, One Report at a Time",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
