"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, User, Grid, Info, LogOut, Loader2 } from "lucide-react"
import Button from "@/components/common/Button"
import { useWallet } from "@/hooks/useWallet"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isConnected, connect, disconnect, address, isConnecting } = useWallet()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  return (
    <header className="bg-black sticky top-0 z-50 border-b border-red-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-red-500 mr-1 tracking-wider">0N1</span>
            <span className="text-white font-medium tracking-wider">FORCE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors tracking-wider">
              HOME
            </Link>
            <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors tracking-wider">
              GALLERY
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors tracking-wider">
              ABOUT
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center">
                <div className="mr-4 bg-black px-3 py-1 rounded-md border border-red-500/30">
                  <p className="text-xs text-red-500">CONNECTED</p>
                  <p className="text-sm text-white truncate max-w-[120px] font-mono">
                    {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                  </p>
                </div>
                <Button variant="secondary" size="sm" onClick={disconnect}>
                  <LogOut className="w-4 h-4 mr-1" /> DISCONNECT
                </Button>
              </div>
            ) : (
              <Button variant="primary" size="sm" onClick={handleConnect} isLoading={isConnecting}>
                {isConnecting ? "CONNECTING..." : "CONNECT WALLET"}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {!isMenuOpen && (
              <div className="mr-4">
                {isConnected ? (
                  <Button variant="secondary" size="sm" onClick={disconnect}>
                    <LogOut className="w-4 h-4 mr-1" /> DISCONNECT
                  </Button>
                ) : (
                  <Button variant="primary" size="sm" onClick={handleConnect} isLoading={isConnecting}>
                    {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : "CONNECT"}
                  </Button>
                )}
              </div>
            )}
            <button className="text-gray-300" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black border-t border-red-500/20"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="flex items-center text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-2 text-red-500" />
                AUGMENTATION CHAMBER
              </Link>
              <Link
                href="/gallery"
                className="flex items-center text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <Grid className="w-5 h-5 mr-2 text-red-500" />
                GALLERY
              </Link>
              <Link
                href="/about"
                className="flex items-center text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-5 h-5 mr-2 text-red-500" />
                ABOUT
              </Link>

              {isConnected && (
                <div className="pt-4 border-t border-gray-800">
                  <div className="bg-black px-3 py-2 rounded-md border border-red-500/30">
                    <p className="text-xs text-red-500">CONNECTED</p>
                    <p className="text-sm text-white truncate font-mono">{address}</p>
                  </div>
                </div>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
