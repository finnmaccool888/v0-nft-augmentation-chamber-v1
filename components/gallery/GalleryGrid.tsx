"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useGallery } from "@/hooks/useGallery"

export default function GalleryGrid() {
  const { galleryItems, isLoading } = useGallery()
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({})

  const toggleLike = (id: string) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-800 rounded-lg aspect-square"></div>
            <div className="h-4 bg-gray-800 rounded mt-2 w-3/4"></div>
            <div className="h-3 bg-gray-800 rounded mt-1 w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleryItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-600 transition-colors"
        >
          <div className="relative aspect-square">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1">
              <p className="text-xs font-mono text-red-400">{item.rarity}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white font-bold">{item.name}</p>
              <p className="text-gray-300 text-sm">Augmented with {item.augmentation}</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={item.ownerAvatar || "/placeholder.svg?height=40&width=40&query=cyberpunk avatar"}
                  alt={item.owner}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <p className="text-gray-400 text-sm">{item.owner}</p>
              </div>
              <p className="text-gray-500 text-xs">{item.date}</p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
              <button
                className="flex items-center text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => toggleLike(item.id)}
              >
                <Heart className={`w-4 h-4 mr-1 ${likedItems[item.id] ? "fill-red-500 text-red-500" : ""}`} />
                <span className="text-xs">{likedItems[item.id] ? item.likes + 1 : item.likes}</span>
              </button>
              <button className="flex items-center text-gray-400 hover:text-gray-300 transition-colors">
                <MessageCircle className="w-4 h-4 mr-1" />
                <span className="text-xs">{item.comments}</span>
              </button>
              <button className="flex items-center text-gray-400 hover:text-gray-300 transition-colors">
                <Share2 className="w-4 h-4 mr-1" />
                <span className="text-xs">Share</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
