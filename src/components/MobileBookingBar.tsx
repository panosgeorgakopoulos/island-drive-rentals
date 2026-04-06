"use client"

import { useTranslations } from "next-intl"

interface MobileBookingBarProps {
  startDate: string
  endDate: string
  basePrice: number
  isValid: boolean
  onBook: () => void
  buttonText: string
}

export function MobileBookingBar({
  startDate,
  endDate,
  basePrice,
  isValid,
  onBook,
  buttonText
}: MobileBookingBarProps) {
  const t = useTranslations('fleetPage')

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = end.getTime() - start.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays * basePrice : 0
  }

  const total = calculateTotal()

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 pb-8 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)] z-[100] flex items-center justify-between pointer-events-auto">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-gray-900">
            {isValid ? `€${total}` : '––'}
          </span>
          {isValid && <span className="text-xs text-gray-400 font-medium">{t('perDay')}</span>}
        </div>
        {startDate && endDate && isValid && (
          <span className="text-[10px] text-[var(--color-primary)] font-bold uppercase mt-0.5">
            {new Date(startDate).toLocaleDateString([], { month: 'short', day: 'numeric' })} - {new Date(endDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>
      
      <button 
        onClick={onBook}
        disabled={!isValid}
        className="btn-primary !px-10 !py-4 shadow-lg shadow-[var(--color-primary)]/20 active:scale-95 transition-transform disabled:opacity-50 disabled:grayscale disabled:scale-100"
      >
        {buttonText}
      </button>
    </div>
  )
}
