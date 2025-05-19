"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  isConnecting: boolean
  address: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  const connect = async () => {
    // Simulate wallet connection
    setIsConnecting(true)
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockAddress =
          "0x" +
          Array(40)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("")

        setAddress(mockAddress)
        setIsConnected(true)
        setIsConnecting(false)
        resolve()
      }, 1000)
    })
  }

  const disconnect = () => {
    setAddress(null)
    setIsConnected(false)
  }

  return (
    <WalletContext.Provider value={{ isConnected, isConnecting, address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
