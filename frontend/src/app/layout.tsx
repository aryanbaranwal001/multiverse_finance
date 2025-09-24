import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from '@/components/ThemeProvider';
import { WalletProvider } from '@/providers/WalletProvider';
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import "@/styles/wallet.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Multiverse Finance",
  description: "Prediction Markets Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
