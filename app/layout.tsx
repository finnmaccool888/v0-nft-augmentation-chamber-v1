import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import { WalletProvider } from "@/contexts/WalletContext"
import { NFTProvider } from "@/contexts/NFTContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "0N1 Force Augmentation Chamber",
  description: "Enhance your 0N1 Force NFTs with powerful augmentations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <NFTProvider>
            <Header />
            {children}
          </NFTProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
