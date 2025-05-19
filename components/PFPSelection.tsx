"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Button from "@/components/common/Button"
import { useNFTs } from "@/hooks/useNFTs"
import { Search } from "lucide-react"

export default function PFPSelection({ onSelect }: { onSelect: (pfp: any) => void }) {
  const { nfts, isLoading } = useNFTs()
  const [selectedNFT, setSelectedNFT] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNFTs = nfts.filter((nft) => nft.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSelect = (nft: any) => {
    setSelectedNFT(nft)
  }

  const handleContinue = () => {
    if (selectedNFT) {
      onSelect(selectedNFT)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search your 0N1 Force NFTs..."
            className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-700 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {filteredNFTs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No 0N1 Force NFTs found in your wallet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {filteredNFTs.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => handleSelect(nft)}
                  className={`cursor-pointer relative rounded-lg overflow-hidden transition-all duration-200 transform hover:scale-105 ${
                    selectedNFT?.id === nft.id ? "ring-2 ring-red-500 scale-105" : ""
                  }`}
                >
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white text-sm font-bold truncate">{nft.name}</p>
                      <p className="text-gray-300 text-xs">{nft.tokenId}</p>
                    </div>
                  </div>
                  {selectedNFT?.id === nft.id && (
                    <div className="absolute top-2 right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      <div className="flex justify-end">
        <Button onClick={handleContinue} disabled={!selectedNFT} variant={!selectedNFT ? "disabled" : "primary"}>
          Continue
        </Button>
      </div>
    </div>
  )
}
