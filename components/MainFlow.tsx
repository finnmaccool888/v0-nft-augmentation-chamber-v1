"use client"

import { useState, useEffect } from "react"
import PFPSelection from "@/components/PFPSelection"
import CostumeSelection from "@/components/CostumeSelection"
import Preview from "@/components/Preview"
import MintProcess from "@/components/MintProcess"
import ProgressBar from "@/components/common/ProgressBar"
import { useWallet } from "@/hooks/useWallet"
import WalletRequired from "@/components/WalletRequired"
import EnhancedBackground from "@/components/EnhancedBackground"
import GlitchText from "@/components/GlitchText"

// Updated steps without the Connect Wallet step
const steps = ["SELECT NFT", "CHOOSE AUGMENTATION", "PREVIEW & MINT"]

export default function MainFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedPFP, setSelectedPFP] = useState(null)
  const [selectedCostume, setSelectedCostume] = useState(null)
  const [isMinting, setIsMinting] = useState(false)
  const { isConnected } = useWallet()

  // Reset to first step if wallet disconnects
  useEffect(() => {
    if (!isConnected) {
      setCurrentStep(0)
      setSelectedPFP(null)
      setSelectedCostume(null)
    }
  }, [isConnected])

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleMint = () => {
    setIsMinting(true)
  }

  const handleMintComplete = () => {
    // Reset the flow after successful minting
    setIsMinting(false)
    setSelectedPFP(null)
    setSelectedCostume(null)
    setCurrentStep(0)
  }

  // If wallet is not connected, show the wallet required message
  if (!isConnected) {
    return (
      <>
        <EnhancedBackground />
        <WalletRequired />
      </>
    )
  }

  const renderCurrentStep = () => {
    if (isMinting) {
      return <MintProcess pfp={selectedPFP} costume={selectedCostume} onComplete={handleMintComplete} />
    }

    switch (currentStep) {
      case 0:
        return (
          <PFPSelection
            onSelect={(pfp) => {
              setSelectedPFP(pfp)
              goToNextStep()
            }}
          />
        )
      case 1:
        return (
          <CostumeSelection
            onSelect={(costume) => {
              setSelectedCostume(costume)
              goToNextStep()
            }}
          />
        )
      case 2:
        return <Preview pfp={selectedPFP} costume={selectedCostume} onMint={handleMint} onBack={goToPrevStep} />
      default:
        return (
          <PFPSelection
            onSelect={(pfp) => {
              setSelectedPFP(pfp)
              goToNextStep()
            }}
          />
        )
    }
  }

  return (
    <>
      <EnhancedBackground />
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <div className="mb-8">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>

        <div className="bg-black border border-red-500/30 p-6 shadow-lg">
          <div className="mb-4 border-b border-gray-800 pb-4">
            <h2 className="text-2xl font-bold tracking-wider">
              {isMinting ? (
                <GlitchText text="MINTING AUGMENTATION" glitchIntensity="low" />
              ) : (
                <GlitchText text={steps[currentStep]} glitchIntensity="low" />
              )}
            </h2>
            <p className="text-gray-400 font-mono text-sm">SYSTEM STATUS: OPERATIONAL</p>
          </div>

          {renderCurrentStep()}
        </div>
      </div>
    </>
  )
}
