"use client"

import { useWallet as useWalletContext } from "@/contexts/WalletContext"

export function useWallet() {
  return useWalletContext()
}
