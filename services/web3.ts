import { ethers } from "ethers"
import AugmentationNFTAbi from "@/contracts/AugmentationNFT.json"

// Contract addresses (would be environment variables in production)
const AUGMENTATION_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890"

// Initialize provider
export const getProvider = () => {
  // For browser environments
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum)
  }

  // Fallback to a public provider (for read-only operations)
  return new ethers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/your-api-key")
}

// Get signer
export const getSigner = async () => {
  const provider = getProvider()
  return await provider.getSigner()
}

// Get contract instance
export const getAugmentationContract = async (withSigner = false) => {
  const provider = getProvider()

  if (withSigner) {
    const signer = await getSigner()
    return new ethers.Contract(AUGMENTATION_CONTRACT_ADDRESS, AugmentationNFTAbi, signer)
  }

  return new ethers.Contract(AUGMENTATION_CONTRACT_ADDRESS, AugmentationNFTAbi, provider)
}

// Mint augmentation
export const mintAugmentation = async (
  originalContract: string,
  originalTokenId: string,
  tokenURI: string,
  augType: number,
  rarity: number,
  processingBoost: number,
  powerBoost: number,
  defenseBoost: number,
  name: string,
) => {
  try {
    const contract = await getAugmentationContract(true)

    const tx = await contract.mintAugmentation(
      originalContract,
      originalTokenId,
      tokenURI,
      augType,
      rarity,
      processingBoost,
      powerBoost,
      defenseBoost,
      name,
    )

    const receipt = await tx.wait()
    return {
      success: true,
      txHash: receipt.hash,
      tokenId: receipt.events[0].args.tokenId.toString(),
    }
  } catch (error) {
    console.error("Error minting augmentation:", error)
    return {
      success: false,
      error,
    }
  }
}

// Get gas estimate for minting
export const estimateGasMintAugmentation = async (
  originalContract: string,
  originalTokenId: string,
  tokenURI: string,
  augType: number,
  rarity: number,
  processingBoost: number,
  powerBoost: number,
  defenseBoost: number,
  name: string,
) => {
  try {
    const contract = await getAugmentationContract(true)

    const gasEstimate = await contract.mintAugmentation.estimateGas(
      originalContract,
      originalTokenId,
      tokenURI,
      augType,
      rarity,
      processingBoost,
      powerBoost,
      defenseBoost,
      name,
    )

    const provider = getProvider()
    const gasPrice = await provider.getFeeData()

    const gasCost = gasEstimate * gasPrice.gasPrice

    return {
      gasEstimate: ethers.formatEther(gasEstimate),
      gasCost: ethers.formatEther(gasCost),
    }
  } catch (error) {
    console.error("Error estimating gas:", error)
    return {
      error,
    }
  }
}

// Get augmentations for an NFT
export const getAugmentations = async (originalContract: string, originalTokenId: string) => {
  try {
    const contract = await getAugmentationContract()
    const augmentations = await contract.getAugmentations(originalContract, originalTokenId)

    return {
      success: true,
      augmentations,
    }
  } catch (error) {
    console.error("Error getting augmentations:", error)
    return {
      success: false,
      error,
    }
  }
}
