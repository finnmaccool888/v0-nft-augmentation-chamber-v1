import Link from "next/link"
import { ArrowLeft, Filter, Search } from "lucide-react"
import Button from "@/components/common/Button"
import GalleryGrid from "@/components/gallery/GalleryGrid"

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link href="/" className="inline-flex items-center text-red-500 hover:text-red-400 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Augmentation Chamber
        </Link>

        <div className="bg-gray-900 border border-red-600 rounded-lg p-6 shadow-lg shadow-red-900/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-red-500">Augmentation Gallery</h1>
              <p className="text-gray-400">Explore recently augmented 0N1 Force NFTs</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search augmentations..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <Button variant="secondary" size="sm" className="whitespace-nowrap">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-800">
              <Button variant="primary" size="sm">
                All
              </Button>
              <Button variant="secondary" size="sm">
                Cyber
              </Button>
              <Button variant="secondary" size="sm">
                Armor
              </Button>
              <Button variant="secondary" size="sm">
                Magic
              </Button>
              <Button variant="secondary" size="sm">
                Rare
              </Button>
              <Button variant="secondary" size="sm">
                Epic
              </Button>
              <Button variant="secondary" size="sm">
                Legendary
              </Button>
            </div>
          </div>

          <GalleryGrid />

          <div className="mt-8 flex justify-center">
            <Button variant="secondary">Load More</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
