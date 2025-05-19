"use client"

import { useState, useEffect } from "react"

// Sample costume data
const sampleCostumes = [
  {
    id: "1",
    name: "Neuro-Link Visor",
    category: "cyber",
    rarity: "Rare",
    power: 8,
    image: "/placeholder.svg?height=300&width=300&query=cyberpunk visor red tech overlay",
    previewImage: "/placeholder.svg?height=300&width=300&query=cyberpunk oni mask with red visor",
    stats: { processing: 8, power: 5, defense: 3 },
  },
  {
    id: "2",
    name: "Quantum Armor",
    category: "armor",
    rarity: "Epic",
    power: 9,
    image: "/placeholder.svg?height=300&width=300&query=cyberpunk armor shoulder pads overlay",
    previewImage: "/placeholder.svg?height=300&width=300&query=cyberpunk oni mask with armor",
    stats: { processing: 4, power: 7, defense: 9 },
  },
  {
    id: "3",
    name: "Arcane Halo",
    category: "magic",
    rarity: "Legendary",
    power: 10,
    image: "/placeholder.svg?height=300&width=300&query=magical halo energy overlay",
    previewImage: "/placeholder.svg?height=300&width=300&query=cyberpunk oni mask with magical halo",
    stats: { processing: 10, power: 10, defense: 5 },
  },
  {
    id: "4",
    name: "Neural Implant",
    category: "cyber",
    rarity: "Uncommon",
    power: 6,
    image: "/placeholder.svg?height=300&width=300&query=cyberpunk neural implant overlay",
    previewImage: "/placeholder.svg?height=300&width=300&query=cyberpunk oni mask with neural implant",
    stats: { processing: 9, power: 4, defense: 2 },
  },
  {
    id: "5",
    name: "Mech Exoskeleton",
    category: "armor",
    rarity: "Rare",
    power: 8,
    image: "/placeholder.svg?height=300&width=300&query=mechanical exoskeleton overlay",
    previewImage: "/placeholder.svg?height=300&width=300&query=cyberpunk oni mask with exoskeleton",
    stats: { processing: 3, power: 8, defense: 8 },
  },
  {
    id: "6",
    name: "Ethereal Crown",
    category: "magic",
    rarity: "Epic",
    power: 9,
    image: "/placeholder.svg?height=300&width=300&query=magical crown energy overlay",
    previewImage: "/placeholder.svg?height=300&width=300&query=cyberpunk oni mask with magical crown",
    stats: { processing: 7, power: 9, defense: 6 },
  },
]

export function useCostumes() {
  const [costumes, setCostumes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCostumes = async () => {
      setIsLoading(true)

      // Simulate API call delay
      setTimeout(() => {
        setCostumes(sampleCostumes)
        setIsLoading(false)
      }, 1000)
    }

    fetchCostumes()
  }, [])

  return { costumes, isLoading }
}
