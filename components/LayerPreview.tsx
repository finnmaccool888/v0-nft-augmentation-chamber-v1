"use client"

import { useState, useEffect, useRef } from "react"
import Button from "@/components/common/Button"
import { Layers, Eye, EyeOff, RotateCcw, Download } from "lucide-react"

interface Layer {
  id: string
  name: string
  image: string
  visible: boolean
}

interface LayerPreviewProps {
  pfp: any
  costume: any
}

export default function LayerPreview({ pfp, costume }: LayerPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [layers, setLayers] = useState<Layer[]>([])
  const [isGenerating, setIsGenerating] = useState(true)

  useEffect(() => {
    if (!pfp || !costume) return

    // Create layers
    setLayers([
      {
        id: "base",
        name: "Base NFT",
        image: pfp.image,
        visible: true,
      },
      {
        id: "costume",
        name: costume.name,
        image: costume.image,
        visible: true,
      },
      {
        id: "effects",
        name: "Special Effects",
        image: `/placeholder.svg?height=300&width=300&query=cyberpunk energy effect ${costume.category} overlay`,
        visible: true,
      },
    ])

    setIsGenerating(true)
    const timer = setTimeout(() => {
      setIsGenerating(false)
      renderCanvas()
    }, 1500)

    return () => clearTimeout(timer)
  }, [pfp, costume])

  useEffect(() => {
    renderCanvas()
  }, [layers])

  const toggleLayerVisibility = (layerId: string) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) => (layer.id === layerId ? { ...layer, visible: !layer.visible } : layer)),
    )
  }

  const renderCanvas = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw each visible layer
    for (const layer of layers) {
      if (layer.visible) {
        try {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = layer.image

          await new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = reject
          })

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        } catch (error) {
          console.error(`Error loading image for layer ${layer.name}:`, error)
        }
      }
    }
  }

  const resetLayers = () => {
    setLayers((prevLayers) => prevLayers.map((layer) => ({ ...layer, visible: true })))
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataUrl = canvas.toDataURL("image/png")
    const a = document.createElement("a")
    a.href = dataUrl
    a.download = `0N1-${pfp?.tokenId}-${costume?.name.replace(/\s+/g, "-")}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <Layers className="w-5 h-5 mr-2 text-red-500" />
        <h3 className="text-lg font-bold">Layer Preview</h3>
      </div>

      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800 mb-4">
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400 font-mono text-sm">GENERATING LAYERS...</p>
          </div>
        ) : (
          <canvas ref={canvasRef} width={500} height={500} className="w-full h-full" />
        )}
      </div>

      <div className="space-y-2 mb-4">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`flex items-center justify-between p-2 rounded ${
              layer.visible ? "bg-gray-800" : "bg-gray-900 border border-gray-800"
            }`}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded overflow-hidden bg-gray-700 mr-2">
                <img src={layer.image || "/placeholder.svg"} alt={layer.name} className="w-full h-full object-cover" />
              </div>
              <span className={layer.visible ? "text-white" : "text-gray-500"}>{layer.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => toggleLayerVisibility(layer.id)} className="p-1 h-auto">
              {layer.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" size="sm" onClick={resetLayers}>
          <RotateCcw className="w-4 h-4 mr-1" /> Reset Layers
        </Button>
        <Button variant="primary" size="sm" onClick={downloadImage} disabled={isGenerating}>
          <Download className="w-4 h-4 mr-1" /> Download
        </Button>
      </div>
    </div>
  )
}
