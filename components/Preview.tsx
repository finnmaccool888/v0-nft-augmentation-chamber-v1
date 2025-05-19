"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import LayerPreview from "@/components/LayerPreview"
import { Cpu, Zap, Shield, RotateCcw, ArrowLeft, Layers } from "lucide-react"

export default function Preview({
  pfp,
  costume,
  onMint,
  onBack,
}: {
  pfp: any
  costume: any
  onMint: () => void
  onBack: () => void
}) {
  const [previewImage, setPreviewImage] = useState("")
  const [isGenerating, setIsGenerating] = useState(true)
  const [backstory, setBackstory] = useState("")
  const [showLayerPreview, setShowLayerPreview] = useState(false)

  // Simulate generating the preview image
  useEffect(() => {
    setIsGenerating(true)

    // In a real implementation, this would combine the PFP and costume images
    const timer = setTimeout(() => {
      setPreviewImage(costume.previewImage || costume.image)
      setIsGenerating(false)

      // Generate a random backstory
      const backstories = [
        `Enhanced with ${costume.name} technology, this 0N1 has gained the ability to manipulate digital reality.`,
        `After the augmentation with ${costume.name}, this 0N1 can now interface directly with the neural network.`,
        `The ${costume.name} augmentation has given this 0N1 unprecedented power in the digital realm.`,
        `Fused with ${costume.name}, this 0N1 has transcended the limitations of the physical world.`,
      ]

      setBackstory(backstories[Math.floor(Math.random() * backstories.length)])
    }, 2000)

    return () => clearTimeout(timer)
  }, [pfp, costume])

  const toggleLayerPreview = () => {
    setShowLayerPreview(!showLayerPreview)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800 mb-4">
          {isGenerating ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-400 font-mono text-sm">GENERATING PREVIEW...</p>
            </div>
          ) : (
            <motion.img
              src={previewImage}
              alt="Augmented NFT Preview"
              className="w-full h-full object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="secondary" size="sm" onClick={() => setIsGenerating(true)}>
            <RotateCcw className="w-4 h-4 mr-1" /> Regenerate
          </Button>
          <Button variant="secondary" size="sm" onClick={toggleLayerPreview}>
            <Layers className="w-4 h-4 mr-1" /> {showLayerPreview ? "Hide Layers" : "Show Layers"}
          </Button>
        </div>

        {showLayerPreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <LayerPreview pfp={pfp} costume={costume} />
          </motion.div>
        )}
      </div>

      <div>
        <Card className="mb-4">
          <h3 className="text-xl font-bold mb-2 text-red-500">Augmentation Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">BASE NFT</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded overflow-hidden mr-2">
                  <img src={pfp?.image || "/placeholder.svg"} alt={pfp?.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-medium">{pfp?.name}</p>
                  <p className="text-gray-500 text-xs">Token ID: {pfp?.tokenId}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-1">AUGMENTATION</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded overflow-hidden mr-2 bg-gray-800">
                  <img
                    src={costume?.image || "/placeholder.svg"}
                    alt={costume?.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">{costume?.name}</p>
                  <p className="text-gray-500 text-xs">
                    {costume?.category} | {costume?.rarity}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-1">TECH SPECS</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-800 p-2 rounded">
                  <div className="flex items-center text-cyan-400 mb-1">
                    <Cpu className="w-3 h-3 mr-1" />
                    <p className="text-xs">PROC</p>
                  </div>
                  <p className="text-white text-sm font-mono">+{costume?.stats?.processing || 5}</p>
                </div>
                <div className="bg-gray-800 p-2 rounded">
                  <div className="flex items-center text-yellow-400 mb-1">
                    <Zap className="w-3 h-3 mr-1" />
                    <p className="text-xs">PWR</p>
                  </div>
                  <p className="text-white text-sm font-mono">+{costume?.stats?.power || 7}</p>
                </div>
                <div className="bg-gray-800 p-2 rounded">
                  <div className="flex items-center text-green-400 mb-1">
                    <Shield className="w-3 h-3 mr-1" />
                    <p className="text-xs">DEF</p>
                  </div>
                  <p className="text-white text-sm font-mono">+{costume?.stats?.defense || 3}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-1">BACKSTORY</p>
              <p className="text-white text-sm italic bg-gray-800 p-3 rounded border border-gray-700">{backstory}</p>
            </div>
          </div>
        </Card>

        <div className="flex justify-between">
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <Button onClick={onMint} disabled={isGenerating} variant="primary">
            Mint Augmentation
          </Button>
        </div>
      </div>
    </div>
  )
}
