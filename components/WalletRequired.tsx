"use client"

import { motion } from "framer-motion"
import { Wallet } from "lucide-react"
import Button from "@/components/common/Button"
import { useWallet } from "@/hooks/useWallet"
import GlitchText from "./GlitchText"

export default function WalletRequired() {
  const { connect, isConnecting } = useWallet()

  return (
    <div className="flex flex-col items-center justify-center py-16 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/80 backdrop-blur-md border border-red-600 rounded-lg p-8 shadow-lg shadow-red-900/20 max-w-md w-full text-center relative overflow-hidden"
      >
        {/* Animated circuit lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-30"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-30"></div>

        <div className="w-20 h-20 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/50 cyber-box">
          <Wallet className="w-10 h-10 text-red-500" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          <GlitchText text="Wallet Connection Required" glitchIntensity="low" />
        </h2>
        <p className="text-gray-400 mb-6">
          Connect your wallet to access your 0N1 Force NFTs and begin the augmentation process.
        </p>

        <Button onClick={connect} isLoading={isConnecting} className="w-full">
          Connect Wallet
        </Button>

        <p className="mt-4 text-sm text-gray-500">
          You'll need a wallet with 0N1 Force NFTs to use the Augmentation Chamber.
        </p>

        {/* Digital data display */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-left">
          <p className="text-xs font-mono text-cyan-500">SYSTEM STATUS</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-gray-800/60 p-2 rounded text-xs font-mono">
              <span className="text-gray-500">NETWORK:</span> <span className="text-green-500">ONLINE</span>
            </div>
            <div className="bg-gray-800/60 p-2 rounded text-xs font-mono">
              <span className="text-gray-500">CHAIN:</span> <span className="text-yellow-500">ETHEREUM</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
