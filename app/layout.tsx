import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import { WalletProvider } from "@/contexts/WalletContext"
import { NFTProvider } from "@/contexts/NFTContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ONI FORCE | Augmentation Chamber",
  description: "Enhance your ONI FORCE NFTs with powerful augmentations",
  icons: {
    icon: "/images/oni-force-logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
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
