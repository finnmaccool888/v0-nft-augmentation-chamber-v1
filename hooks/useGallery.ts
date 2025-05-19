"use client"

import { useState, useEffect } from "react"

// Sample gallery data
const sampleGalleryItems = [
  {
    id: "1",
    name: "0N1 Force #1234",
    augmentation: "Neuro-Link Visor",
    image: "/placeholder.svg?key=8qi93",
    rarity: "Rare",
    owner: "0xAb...1234",
    ownerAvatar: "/placeholder.svg?key=e6f2l",
    date: "2 days ago",
    likes: 24,
    comments: 5,
  },
  {
    id: "2",
    name: "0N1 Force #5678",
    augmentation: "Quantum Armor",
    image: "/placeholder.svg?key=syu94",
    rarity: "Epic",
    owner: "0xCd...5678",
    ownerAvatar: "/placeholder.svg?key=30pvd",
    date: "3 days ago",
    likes: 42,
    comments: 8,
  },
  {
    id: "3",
    name: "0N1 Force #9012",
    augmentation: "Arcane Halo",
    image: "/placeholder.svg?key=p7uly",
    rarity: "Legendary",
    owner: "0xEf...9012",
    ownerAvatar: "/placeholder.svg?height=40&width=40&query=cyberpunk avatar purple",
    date: "5 days ago",
    likes: 67,
    comments: 12,
  },
  {
    id: "4",
    name: "0N1 Force #3456",
    augmentation: "Neural Implant",
    image: "/placeholder.svg?height=400&width=400&query=cyberpunk oni mask with neural implant",
    rarity: "Uncommon",
    owner: "0xGh...3456",
    ownerAvatar: "/placeholder.svg?height=40&width=40&query=cyberpunk avatar green",
    date: "1 week ago",
    likes: 18,
    comments: 3,
  },
  {
    id: "5",
    name: "0N1 Force #7890",
    augmentation: "Mech Exoskeleton",
    image: "/placeholder.svg?height=400&width=400&query=cyberpunk oni mask with exoskeleton",
    rarity: "Rare",
    owner: "0xIj...7890",
    ownerAvatar: "/placeholder.svg?height=40&width=40&query=cyberpunk avatar yellow",
    date: "1 week ago",
    likes: 31,
    comments: 6,
  },
  {
    id: "6",
    name: "0N1 Force #2345",
    augmentation: "Ethereal Crown",
    image: "/placeholder.svg?height=400&width=400&query=cyberpunk oni mask with magical crown",
    rarity: "Epic",
    owner: "0xKl...2345",
    ownerAvatar: "/placeholder.svg?height=40&width=40&query=cyberpunk avatar orange",
    date: "2 weeks ago",
    likes: 53,
    comments: 9,
  },
]

export function useGallery() {
  const [galleryItems, setGalleryItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGalleryItems = async () => {
      setIsLoading(true)

      // Simulate API call delay
      setTimeout(() => {
        setGalleryItems(sampleGalleryItems)
        setIsLoading(false)
      }, 1000)
    }

    fetchGalleryItems()
  }, [])

  return { galleryItems, isLoading }
}
