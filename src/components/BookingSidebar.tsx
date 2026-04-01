"use client"

import { useState, useMemo, useEffect } from "react"
import { Calendar, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export function BookingSidebar({
  vehicleId,
  basePrice,
  initialStart,
  initialEnd
}: {
  vehicleId: string
  basePrice: number
  initialStart?: string
  initialEnd?: string
}) {
  const router = useRouter()
  const [startDate, setStartDate] = useState(initialStart || "")
  const [endDate, setEndDate] = useState(initialEnd || "")
  const [location, setLocation] = useState("Athens Airport")
  const [todayDate, setTodayDate] = useState("")

  useEffect(() => {
    setTodayDate(new Date().toISOString().split('T')[0])
  }, [])

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = end.getTime() - start.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }, [startDate, endDate])

  const totalPrice = days * basePrice

  const handleBook = () => {
    if (startDate && endDate && days > 0) {
      router.push(`/book/${vehicleId}?start=${startDate}&end=${endDate}&location=${encodeURIComponent(location)}`)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 border shadow-sm sticky top-24">
      <h3 className="text-xl font-bold mb-6 tracking-tight">Reserve your dates</h3>
      
      <div className="space-y-4">
        <div className="border rounded-xl p-3 flex flex-col">
          <label className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-2">
            <MapPin size={14} /> Location
          </label>
          <select 
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="font-medium outline-none bg-transparent"
          >
            <option value="Athens Airport">Athens Airport</option>
            <option value="City Center">City Center</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-xl p-3 flex flex-col">
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-2">
              <Calendar size={14} /> Pick-up
            </label>
            <input 
              type="date" 
              value={startDate}
              min={todayDate}
              onChange={e => {
                setStartDate(e.target.value)
                if (endDate && new Date(e.target.value) >= new Date(endDate)) {
                   setEndDate("")
                }
              }}
              className="font-medium outline-none bg-transparent w-full" 
            />
          </div>
          <div className="border rounded-xl p-3 flex flex-col">
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 flex items-center gap-2">
              <Calendar size={14} /> Drop-off
            </label>
            <input 
              type="date" 
              value={endDate}
              min={startDate || todayDate}
              onChange={e => setEndDate(e.target.value)}
              className="font-medium outline-none bg-transparent w-full" 
            />
          </div>
        </div>
        
        <div className="pt-4 border-t mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">€{basePrice} x {days} days</span>
            <span className="font-medium text-gray-900">€{totalPrice}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
            <span>Total</span>
            <span className="text-blue-600">€{totalPrice}</span>
          </div>
        </div>

        <button 
          onClick={handleBook}
          disabled={!startDate || !endDate || days <= 0}
          className="block w-full bg-blue-600 text-white text-center font-bold py-4 rounded-xl mt-6 hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Book
        </button>
        <p className="text-xs text-center text-gray-500 mt-3">You won't be charged yet.</p>
      </div>
    </div>
  )
}
