"use client"

import { motion } from "framer-motion"
import Image from "next/image"
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
        className="bg-black border border-red-500/30 p-8 shadow-lg max-w-2xl w-full text-center relative overflow-hidden" // Increased from max-w-md to max-w-2xl
      >
        {/* Animated circuit lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-30"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-30"></div>

        <motion.div
          className="relative w-[450px] h-[90px] mx-auto mb-10" // Increased from w-48 h-12 mb-6 to w-[450px] h-[90px] mb-10 (approx 3x)
          animate={{
            filter: [
              "drop-shadow(0 0 5px rgba(255, 0, 0, 0.7))",
              "drop-shadow(0 0 15px rgba(255, 0, 0, 0.7))",
              "drop-shadow(0 0 5px rgba(255, 0, 0, 0.7))",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <Image src="/images/oni-force-logo.png" alt="ONI FORCE" fill className="object-contain" />
        </motion.div>

        <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/50">
          {" "}
          {/* Increased from w-20 h-20 mb-6 to w-24 h-24 mb-8 */}
          <Wallet className="w-12 h-12 text-red-500" /> {/* Increased from w-10 h-10 to w-12 h-12 */}
        </div>

        <h2 className="text-3xl font-bold text-white mb-4 tracking-wider">
          {" "}
          {/* Increased from text-2xl mb-2 to text-3xl mb-4 */}
          <GlitchText text="WALLET CONNECTION REQUIRED" glitchIntensity="low" />
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          {" "}
          {/* Increased from mb-6 to mb-8 and added text-lg */}
          Connect your wallet to access your 0N1 Force NFTs and begin the augmentation process.
        </p>

        <Button onClick={connect} isLoading={isConnecting} className="w-full text-lg py-6">
          {" "}
          {/* Added text-lg py-6 for a larger button */}
          CONNECT WALLET
        </Button>

        <p className="mt-6 text-sm text-gray-500">
          {" "}
          {/* Increased from mt-4 to mt-6 */}
          You'll need a wallet with 0N1 Force NFTs to use the Augmentation Chamber.
        </p>

        {/* Digital data display */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-left">
          {" "}
          {/* Increased from mt-6 pt-4 to mt-8 pt-6 */}
          <p className="text-sm font-mono text-red-500">SYSTEM STATUS</p> {/* Increased from text-xs to text-sm */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            {" "}
            {/* Increased from gap-2 mt-2 to gap-3 mt-3 */}
            <div className="bg-black p-3 border border-gray-800 text-sm font-mono">
              {" "}
              {/* Increased from p-2 text-xs to p-3 text-sm */}
              <span className="text-gray-500">NETWORK:</span> <span className="text-red-500">ONLINE</span>
            </div>
            <div className="bg-black p-3 border border-gray-800 text-sm font-mono">
              {" "}
              {/* Increased from p-2 text-xs to p-3 text-sm */}
              <span className="text-gray-500">CHAIN:</span> <span className="text-red-500">ETHEREUM</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
