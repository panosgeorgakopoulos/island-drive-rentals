"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

export function HeroSearch() {
  const router = useRouter()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [location, setLocation] = useState("")
  const [todayDate, setTodayDate] = useState("")

  useEffect(() => {
    setTodayDate(new Date().toISOString().split('T')[0])
  }, [])

  const handleSearch = () => {
    let url = "/fleet"
    const params = new URLSearchParams()
    if (startDate) params.append("start", startDate)
    if (endDate) params.append("end", endDate)
    if (location) params.append("location", location)
      
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    router.push(url)
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-between text-gray-800 text-left max-w-4xl mx-auto mt-8">
      <div className="flex-1 w-full pl-4 border-r border-gray-200 hidden md:block">
        <label className="text-xs font-bold text-gray-500 uppercase">Pickup Location</label>
        <div className="flex items-center gap-2 mt-1">
          <MapPin size={20} className="text-blue-600" />
          <input 
            type="text" 
            placeholder="Athens Airport" 
            className="w-full font-medium outline-none" 
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 w-full pl-4 border-r border-gray-200 hidden md:block">
        <label className="text-xs font-bold text-gray-500 uppercase">Pickup Date</label>
        <div className="flex items-center gap-2 mt-1">
          <Calendar size={20} className="text-blue-600" />
          <input 
            type="date" 
            className="w-full font-medium outline-none bg-transparent" 
            min={todayDate}
            value={startDate}
            onChange={e => {
              setStartDate(e.target.value)
              if (endDate && new Date(e.target.value) >= new Date(endDate)) {
                 setEndDate("")
              }
            }}
          />
        </div>
      </div>
      <div className="flex-1 w-full pl-4 hidden md:block">
        <label className="text-xs font-bold text-gray-500 uppercase">Return Date</label>
        <div className="flex items-center gap-2 mt-1">
          <Calendar size={20} className="text-blue-600" />
          <input 
            type="date" 
            className="w-full font-medium outline-none bg-transparent" 
            min={startDate || todayDate}
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <button 
        onClick={handleSearch}
        className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
      >
        <Search size={20} /> Search
      </button>
    </div>
  )
}
