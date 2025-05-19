"use client"

import { motion } from "framer-motion"
import { Wallet } from "lucide-react"
import Button from "@/components/common/Button"
import { useWallet } from "@/hooks/useWallet"

export default function WalletRequired() {
  const { connect, isConnecting } = useWallet()

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 border border-red-600 rounded-lg p-8 shadow-lg shadow-red-900/20 max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <Wallet className="w-10 h-10 text-red-500" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Wallet Connection Required</h2>
        <p className="text-gray-400 mb-6">
          Connect your wallet to access your 0N1 Force NFTs and begin the augmentation process.
        </p>

        <Button onClick={connect} isLoading={isConnecting} className="w-full">
          Connect Wallet
        </Button>

        <p className="mt-4 text-sm text-gray-500">
          You'll need a wallet with 0N1 Force NFTs to use the Augmentation Chamber.
        </p>
      </motion.div>
    </div>
  )
}
