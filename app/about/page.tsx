import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Button from "@/components/common/Button"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/" className="inline-flex items-center text-red-500 hover:text-red-400 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Augmentation Chamber
        </Link>

        <div className="bg-gray-900 border border-red-600 rounded-lg p-6 shadow-lg shadow-red-900/20">
          <h1 className="text-3xl font-bold text-red-500 mb-6">About 0N1 Force Augmentation Chamber</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-white">The Project</h2>
              <p className="text-gray-300 mb-4">
                The 0N1 Force Augmentation Chamber is a cutting-edge platform that allows 0N1 Force NFT holders to
                enhance their digital assets with powerful augmentations.
              </p>
              <p className="text-gray-300 mb-4">
                By applying costume overlays to your existing 0N1 Force NFTs, you can create unique, token-bound NFTs
                with enhanced properties and visual elements.
              </p>
              <p className="text-gray-300">
                Each augmentation not only transforms the appearance of your 0N1 but also grants it special abilities
                and stats in the 0N1 Force ecosystem.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-white">How It Works</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-300">
                <li>Connect your wallet containing 0N1 Force NFTs</li>
                <li>Select the 0N1 Force NFT you want to augment</li>
                <li>Choose from various augmentation types (Cyber, Armor, Magic)</li>
                <li>Preview your augmented 0N1 with detailed tech specs</li>
                <li>Mint your new token-bound NFT to your wallet</li>
                <li>Share your creation with the 0N1 Force community</li>
              </ol>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8">
            <h2 className="text-xl font-bold mb-4 text-white">Augmentation Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg p-4 border border-cyan-900/50">
                <div className="w-12 h-12 bg-cyan-900/30 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Cyber</h3>
                <p className="text-gray-300 text-sm">
                  Technological enhancements that boost processing power and digital capabilities. Perfect for hackers
                  and tech specialists.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border border-yellow-900/50">
                <div className="w-12 h-12 bg-yellow-900/30 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-yellow-400 mb-2">Armor</h3>
                <p className="text-gray-300 text-sm">
                  Physical enhancements that increase defense and power. Ideal for warriors and frontline fighters in
                  the digital realm.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border border-purple-900/50">
                <div className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-purple-400 mb-2">Magic</h3>
                <p className="text-gray-300 text-sm">
                  Mystical enhancements that grant special abilities and ethereal powers. Perfect for those who harness
                  the unknown.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8">
            <h2 className="text-xl font-bold mb-4 text-white">Rarity Tiers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <h3 className="text-md font-bold text-gray-400 mb-1">Common</h3>
                <div className="w-full bg-gray-700 h-1 mb-1">
                  <div className="bg-gray-400 h-1" style={{ width: "25%" }}></div>
                </div>
                <p className="text-gray-400 text-xs">Basic augmentations with minimal stat boosts.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-3 border border-green-900/50">
                <h3 className="text-md font-bold text-green-400 mb-1">Uncommon</h3>
                <div className="w-full bg-gray-700 h-1 mb-1">
                  <div className="bg-green-400 h-1" style={{ width: "50%" }}></div>
                </div>
                <p className="text-gray-400 text-xs">Enhanced augmentations with moderate stat boosts.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-3 border border-blue-900/50">
                <h3 className="text-md font-bold text-blue-400 mb-1">Rare</h3>
                <div className="w-full bg-gray-700 h-1 mb-1">
                  <div className="bg-blue-400 h-1" style={{ width: "75%" }}></div>
                </div>
                <p className="text-gray-400 text-xs">Superior augmentations with significant stat boosts.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-3 border border-purple-900/50">
                <h3 className="text-md font-bold text-purple-400 mb-1">Epic</h3>
                <div className="w-full bg-gray-700 h-1 mb-1">
                  <div className="bg-purple-400 h-1" style={{ width: "90%" }}></div>
                </div>
                <p className="text-gray-400 text-xs">Elite augmentations with powerful stat boosts.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/">
              <Button>Enter the Augmentation Chamber</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
