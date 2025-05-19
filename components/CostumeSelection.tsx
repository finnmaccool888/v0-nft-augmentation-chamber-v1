"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Button from "@/components/common/Button"
import { useCostumes } from "@/hooks/useCostumes"
import { Zap } from "lucide-react"

export default function CostumeSelection({ onSelect }: { onSelect: (costume: any) => void }) {
  const { costumes, isLoading } = useCostumes()
  const [selectedCostume, setSelectedCostume] = useState(null)
  const filteredCostumes = costumes

  const handleSelect = (costume: any) => {
    setSelectedCostume(costume)
  }

  const handleContinue = () => {
    if (selectedCostume) {
      onSelect(selectedCostume)
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-700 rounded-lg aspect-square"></div>
              <div className="h-4 bg-gray-700 rounded mt-2 w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded mt-1 w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {filteredCostumes.map((costume, index) => (
            <motion.div
              key={costume.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleSelect(costume)}
              className={`cursor-pointer relative rounded-lg overflow-hidden transition-all duration-200 transform hover:scale-105 ${
                selectedCostume?.id === costume.id ? "ring-2 ring-red-500 scale-105" : ""
              }`}
            >
              <div className="relative aspect-square bg-gray-800">
                <img
                  src={costume.image || "/placeholder.svg"}
                  alt={costume.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1">
                  <p className="text-xs font-mono text-red-400">{costume.rarity}</p>
                </div>
              </div>
              <div className="p-2 bg-gray-800">
                <p className="text-white text-sm font-bold truncate">{costume.name}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-gray-400 text-xs">{costume.category}</p>
                  <div className="flex items-center">
                    <Zap className="w-3 h-3 text-yellow-500 mr-1" />
                    <p className="text-yellow-500 text-xs">{costume.power}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!selectedCostume}
          variant={!selectedCostume ? "disabled" : "primary"}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
