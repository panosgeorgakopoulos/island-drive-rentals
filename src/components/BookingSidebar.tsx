"use client"

import { useState, useMemo, useEffect } from "react"
import { Calendar, MapPin, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { ISLANDS } from "@/config/locations"
import { useTranslations } from "next-intl"

export function BookingSidebar({
  vehicleId,
  basePrice,
  initialStart,
  initialEnd,
  initialLocation
}: {
  vehicleId: string
  basePrice: number
  initialStart?: string
  initialEnd?: string
  initialLocation?: string
}) {
  const router = useRouter()
  const tLoc = useTranslations('locations')
  const [startDate, setStartDate] = useState(initialStart || "")
  const [endDate, setEndDate] = useState(initialEnd || "")
  
  // Resolve initial location: if it's an island ID like 'naxos', use its first pickup point
  const getInitialLocation = () => {
    if (!initialLocation) return ""
    const island = ISLANDS.find(i => i.id === initialLocation || i.name === initialLocation)
    if (island && island.points.length > 0) return island.points[0]
    return initialLocation
  }

  const [location, setLocation] = useState(getInitialLocation)
  const [todayDate, setTodayDate] = useState("")

  useEffect(() => {
    setTodayDate(new Date().toISOString().split('T')[0])
  }, [])

  const { days, dateError } = useMemo(() => {
    if (!startDate || !endDate) return { days: 0, dateError: null }
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = end.getTime() - start.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays <= 0) {
      return { days: 0, dateError: "Return date must be after pickup" }
    }
    
    return { days: diffDays, dateError: null }
  }, [startDate, endDate])

  const totalPrice = days * basePrice
  const isMissingDates = !startDate || !endDate
  const isValid = !isMissingDates && !dateError && location

  const handleBook = () => {
    if (isValid) {
      router.push(`/book/${vehicleId}?start=${startDate}&end=${endDate}&location=${encodeURIComponent(location)}`)
    }
  }

  let buttonText = "Continue"
  if (isMissingDates) buttonText = "Select Dates"
  else if (!location) buttonText = "Select Location"
  else if (dateError) buttonText = "Invalid Dates"

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleBook(); }}>
      <div className="bg-white rounded-2xl md:p-6 md:border md:border-gray-100 md:shadow-sm sticky top-24 mb-24 md:mb-0">
        <h3 className="hidden md:block text-xl font-bold mb-6 tracking-tight">Reserve your dates</h3>
        <h3 className="md:hidden text-lg font-bold mb-4 tracking-tight px-1">Step 1: Booking Details</h3>
      
      <div className="space-y-5">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2 tracking-wider">
            <MapPin size={14} className="text-[var(--color-primary)]" /> Location
          </label>
          <select 
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full font-bold text-gray-900 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition bg-[var(--color-surface-alt)]"
          >
            <option value="">Select Location</option>
            {ISLANDS.map(island => (
              <optgroup key={island.id} label={tLoc(island.id as any)}>
                {island.points.map(point => (
                  <option key={point} value={point}>{tLoc(point as any)}</option>
                ))}
              </optgroup>
            ))}
          </select>

        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2 tracking-wider">
              <Calendar size={14} className="text-[var(--color-primary)]" /> Pick-up
            </label>
            <input 
              type="date" 
              value={startDate}
              min={todayDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full font-bold text-gray-900 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition bg-[var(--color-surface-alt)]" 
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2 tracking-wider">
              <Calendar size={14} className="text-[var(--color-primary)]" /> Return
            </label>
            <input 
              type="date" 
              value={endDate}
              min={startDate || todayDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full font-bold text-gray-900 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition bg-[var(--color-surface-alt)]" 
            />
          </div>
        </div>
        
        {dateError && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium">
            <AlertCircle size={16} />
            {dateError}
          </div>
        )}
        
        {/* Desktop Summary & CTA */}
        <div className="hidden md:block pt-4 border-t border-gray-100 mt-6">
          {isValid ? (
            <>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-500">€{basePrice} × {days} days</span>
                <span className="font-semibold text-gray-900">€{totalPrice}</span>
              </div>
              <div className="flex justify-between font-extrabold text-2xl mt-4 pt-4 border-t border-gray-100">
                <span>Total</span>
                <span className="text-[var(--color-primary)]">€{totalPrice}</span>
              </div>
            </>
          ) : (
            <div className="text-center text-sm font-medium text-gray-400 py-4 bg-[var(--color-surface-alt)] rounded-lg">
              Please select dates to see total
            </div>
          )}

          <button 
            type="submit"
            disabled={!isValid}
            className="btn-primary w-full text-lg mt-6"
          >
            {buttonText}
          </button>
          <p className="text-xs text-center text-gray-400 mt-3 font-medium">You won't be charged yet.</p>
        </div>

        </div>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.08)] z-[100] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total</span>
          <span className="text-2xl font-extrabold text-gray-900">
            {isValid ? `€${totalPrice}` : '––'}
          </span>
        </div>
        
        <button 
          type="submit"
          disabled={!isValid}
          className="btn-primary !px-8 !py-3.5"
        >
          {buttonText}
        </button>
      </div>
    </form>
  )
}
