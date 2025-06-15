import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showValue?: boolean
}

export function ProgressBar({ value, max = 100, className, showValue = true }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const getColorClass = (percent: number) => {
    if (percent >= 90) return "bg-green-500"
    if (percent >= 80) return "bg-[#152c44]" // IBSRA primary color
    if (percent >= 70) return "bg-yellow-500"
    if (percent >= 60) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-1">
        {showValue && (
          <span className="text-sm font-medium text-[#152c44]">
            {value}
            {max === 100 ? "%" : `/${max}`}
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={cn("h-2 rounded-full transition-all duration-300", getColorClass(percentage))}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
