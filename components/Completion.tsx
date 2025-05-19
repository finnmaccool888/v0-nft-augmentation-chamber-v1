"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import { CheckCircle, Share2, ExternalLink, Download, Copy } from "lucide-react"

export default function Completion({ pfp, costume }: { pfp: any; costume: any }) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    // In a real app, this would be the actual link to the NFT
    navigator.clipboard.writeText(`https://on1force.io/augmented/${pfp?.tokenId}-${costume?.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex justify-center"
      >
        <div className="w-24 h-24 rounded-full bg-green-900/30 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
      </motion.div>

      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold mb-2"
      >
        Augmentation Complete!
      </motion.h3>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-gray-400 mb-6"
      >
        Your 0N1 Force NFT has been successfully augmented with {costume?.name}.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="mb-6 max-w-md mx-auto">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 mb-4">
            <img
              src={costume?.previewImage || costume?.image}
              alt="Augmented NFT"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="text-left">
            <h4 className="font-bold text-lg">Augmented 0N1 #{pfp?.tokenId}</h4>
            <p className="text-gray-400 text-sm mb-4">Enhanced with {costume?.name}</p>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm" onClick={handleCopyLink}>
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" /> Copy Link
                  </>
                )}
              </Button>
              <Button variant="secondary" size="sm">
                <Share2 className="w-4 h-4 mr-1" /> Share
              </Button>
              <Button variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-1" /> Download
              </Button>
              <Button variant="secondary" size="sm">
                <ExternalLink className="w-4 h-4 mr-1" /> View on OpenSea
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center space-x-4"
      >
        <Button onClick={() => window.location.reload()}>Augment Another NFT</Button>
      </motion.div>
    </div>
  )
}
