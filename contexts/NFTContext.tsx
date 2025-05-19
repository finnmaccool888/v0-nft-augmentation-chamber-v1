"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useNFTs } from "@/hooks/useNFTs"
import { useCostumes } from "@/hooks/useCostumes"

interface NFTContextType {
  nfts: any[]
  costumes: any[]
  isLoadingNFTs: boolean
  isLoadingCostumes: boolean
}

const NFTContext = createContext<NFTContextType | undefined>(undefined)

export function NFTProvider({ children }: { children: ReactNode }) {
  const { nfts, isLoading: isLoadingNFTs } = useNFTs()
  const { costumes, isLoading: isLoadingCostumes } = useCostumes()

  return (
    <NFTContext.Provider value={{ nfts, costumes, isLoadingNFTs, isLoadingCostumes }}>{children}</NFTContext.Provider>
  )
}

export function useNFTContext() {
  const context = useContext(NFTContext)
  if (context === undefined) {
    throw new Error("useNFTContext must be used within a NFTProvider")
  }
  return context
}
