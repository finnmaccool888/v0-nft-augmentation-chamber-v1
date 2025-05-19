interface ProgressBarProps {
  steps: string[]
  currentStep: number
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="hidden md:flex justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-xs font-medium ${index <= currentStep ? "text-red-500" : "text-gray-500"}`}
            style={{ width: `${100 / steps.length}%`, textAlign: "center" }}
          >
            {step}
          </div>
        ))}
      </div>

      <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>

      <div className="md:hidden mt-2 text-center">
        <span className="text-xs font-medium text-red-500">{steps[currentStep]}</span>
        <span className="text-xs text-gray-500">
          {" "}
          ({currentStep + 1}/{steps.length})
        </span>
      </div>
    </div>
  )
}
