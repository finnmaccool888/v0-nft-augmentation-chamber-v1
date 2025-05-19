import { Suspense } from "react"
import IntroAnimation from "@/components/IntroAnimation"
import MainFlow from "@/components/MainFlow"
import Loading from "@/components/common/Loading"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Suspense fallback={<Loading />}>
        <IntroAnimation />
        <MainFlow />

        {/* Scan line effect */}
        <div className="scan-line"></div>
      </Suspense>
    </main>
  )
}
