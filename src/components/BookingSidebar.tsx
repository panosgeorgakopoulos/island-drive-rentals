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
  const isValid = Boolean(!isMissingDates && !dateError && location)

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
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 md:sticky md:top-24">
        <h3 className="text-lg md:text-xl font-bold mb-4">Booking Details</h3>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-2 flex items-center gap-2">
            <MapPin size={16} /> Location
          </label>
          <select 
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full min-h-11 border border-gray-300 rounded-lg px-3 bg-white"
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
        
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Calendar size={16} /> Pick-up
            </label>
            <input 
              type="date" 
              value={startDate}
              min={todayDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full min-h-11 border border-gray-300 rounded-lg px-3 bg-white"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Calendar size={16} /> Return
            </label>
            <input 
              type="date" 
              value={endDate}
              min={startDate || todayDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full min-h-11 border border-gray-300 rounded-lg px-3 bg-white"
            />
          </div>
        </div>
        
        {dateError && (
          <div className="flex items-center gap-2 text-red-700 bg-red-50 p-3 rounded-lg text-sm">
            <AlertCircle size={16} />
            {dateError}
          </div>
        )}
        
        <div className="pt-4 border-t border-gray-200">
          {isValid ? (
            <>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-500">€{basePrice} × {days} days</span>
                <span className="font-semibold text-gray-900">€{totalPrice}</span>
              </div>
              <div className="flex justify-between font-bold text-xl mt-3 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>€{totalPrice}</span>
              </div>
            </>
          ) : (
            <div className="text-center text-sm text-gray-500 py-3 bg-gray-50 rounded-lg">
              Please select dates to see total
            </div>
          )}

          <button 
            type="submit"
            disabled={!isValid}
            className="w-full min-h-11 mt-4 rounded-lg bg-black text-white font-semibold disabled:opacity-50"
          >
            {buttonText}
          </button>
          <p className="text-xs text-center text-gray-500 mt-2">You won't be charged yet.</p>
        </div>

        </div>
      </div>
    </form>
  )
}
