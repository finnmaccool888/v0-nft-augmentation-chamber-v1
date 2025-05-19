export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-red-600 font-mono text-lg">LOADING...</p>
      </div>
    </div>
  )
}
