"use client"

import { useState, useEffect } from "react"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import { useMint } from "@/hooks/useMint"
import { Cpu, Zap, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

const MINT_STAGES = [
  { id: "prepare", name: "Preparing Assets", duration: 2000 },
  { id: "verify", name: "Verifying Ownership", duration: 1500 },
  { id: "estimate", name: "Estimating Gas", duration: 1000 },
  { id: "mint", name: "Minting Augmentation", duration: 3000 },
  { id: "confirm", name: "Confirming Transaction", duration: 2000 },
]

export default function MintProcess({
  pfp,
  costume,
  onComplete,
}: {
  pfp: any
  costume: any
  onComplete: () => void
}) {
  const [currentStage, setCurrentStage] = useState(0)
  const [isStageComplete, setIsStageComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const { mint, estimateGas } = useMint()

  useEffect(() => {
    const processStages = async () => {
      for (let i = 0; i < MINT_STAGES.length; i++) {
        setCurrentStage(i)
        setIsStageComplete(false)

        try {
          // Simulate the stage processing
          await new Promise((resolve) => setTimeout(resolve, MINT_STAGES[i].duration))

          // If this is the mint stage, simulate the actual minting
          if (MINT_STAGES[i].id === "mint") {
            const result = await mint(pfp, costume)
            setTxHash(result.txHash)
          }

          setIsStageComplete(true)
        } catch (err) {
          console.error(`Error in stage ${MINT_STAGES[i].name}:`, err)
          setError(`Failed during ${MINT_STAGES[i].name.toLowerCase()}. Please try again.`)
          return
        }
      }

      // All stages completed successfully
      setTimeout(() => {
        onComplete()
      }, 1000)
    }

    processStages()
  }, [])

  return (
    <div>
      <Card className="mb-6">
        <div className="flex items-center mb-4">
          <Cpu className="w-6 h-6 mr-2 text-red-500" />
          <h3 className="text-xl font-bold">Augmentation Process</h3>
        </div>

        <div className="space-y-4">
          {MINT_STAGES.map((stage, index) => (
            <div
              key={stage.id}
              className={`flex items-center p-3 rounded-md ${
                currentStage === index
                  ? "bg-gray-800 border border-red-900"
                  : currentStage > index
                    ? "bg-gray-900 border border-green-900/30"
                    : "bg-gray-900 border border-gray-800"
              }`}
            >
              <div className="mr-3">
                {currentStage > index ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : currentStage === index ? (
                  isStageComplete ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : error ? (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  )
                ) : (
                  <div className="w-5 h-5 rounded-full border border-gray-700"></div>
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    currentStage === index ? "text-white" : currentStage > index ? "text-green-400" : "text-gray-500"
                  }`}
                >
                  {stage.name}
                </p>
                {currentStage === index && !isStageComplete && !error && (
                  <p className="text-xs text-gray-400 mt-1">Processing...</p>
                )}
                {currentStage === index && stage.id === "estimate" && !error && (
                  <p className="text-xs text-gray-400 mt-1">Estimated cost: 0.005 ETH + gas</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-900 rounded-md flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-medium">Error</p>
              <p className="text-sm text-gray-300">{error}</p>
              <Button variant="secondary" size="sm" className="mt-2" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        )}

        {txHash && (
          <div className="mt-4 p-3 bg-gray-800 rounded-md">
            <p className="text-gray-400 text-sm mb-1">TRANSACTION HASH</p>
            <p className="text-green-400 font-mono text-sm break-all">{txHash}</p>
          </div>
        )}
      </Card>

      <div className="flex justify-center">
        <div className="flex items-center text-gray-500 text-sm">
          <Zap className="w-4 h-4 mr-1 text-yellow-500" />
          <span>Do not close this window during the minting process</span>
        </div>
      </div>
    </div>
  )
}
