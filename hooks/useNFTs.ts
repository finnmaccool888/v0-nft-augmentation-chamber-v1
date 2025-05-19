"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@/hooks/useWallet"

// Sample NFT data
const sampleNFTs = [
  {
    id: "1",
    tokenId: "1234",
    name: "0N1 Force #1234",
    image: "/placeholder.svg?key=ryhi1",
    owner: "0x1234...",
  },
  {
    id: "2",
    tokenId: "5678",
    name: "0N1 Force #5678",
    image: "/placeholder.svg?key=f7wds",
    owner: "0x1234...",
  },
  {
    id: "3",
    tokenId: "9012",
    name: "0N1 Force #9012",
    image: "/placeholder.svg?key=xhqwh",
    owner: "0x1234...",
  },
  {
    id: "4",
    tokenId: "3456",
    name: "0N1 Force #3456",
    image: "/placeholder.svg?key=afxf5",
    owner: "0x1234...",
  },
  {
    id: "5",
    tokenId: "7890",
    name: "0N1 Force #7890",
    image: "/placeholder.svg?key=jvv5d",
    owner: "0x1234...",
  },
  {
    id: "6",
    tokenId: "2345",
    name: "0N1 Force #2345",
    image: "/placeholder.svg?height=300&width=300&query=cyberpunk oni mask orange",
    owner: "0x1234...",
  },
]

export function useNFTs() {
  const { isConnected } = useWallet()
  const [nfts, setNFTs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!isConnected) {
        setNFTs([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      // Simulate API call delay
      setTimeout(() => {
        setNFTs(sampleNFTs)
        setIsLoading(false)
      }, 1500)
    }

    fetchNFTs()
  }, [isConnected])

  return { nfts, isLoading }
}
