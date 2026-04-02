"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { ISLANDS } from "@/config/locations"

export function HeroSearch() {
  const router = useRouter()
  const t = useTranslations('booking')
  const tLoc = useTranslations('locations')
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
    <div className="bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-0 items-stretch text-gray-800 text-left max-w-4xl mx-auto mt-8 border border-white/20">
      <div className="flex-1 w-full px-5 py-3 border-b md:border-b-0 md:border-r border-gray-100 hidden md:block">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('pickupLocation')}</label>
        <div className="flex items-center gap-2 mt-1">
          <MapPin size={18} className="text-[var(--color-primary)]" />
          <select
            className="w-full font-semibold outline-none bg-transparent text-gray-900 appearance-none cursor-pointer"
            value={location}
            onChange={e => setLocation(e.target.value)}
          >
            <option value="">{tLoc('santorini')}</option>
            {ISLANDS.map(island => (
              <option key={island.id} value={island.id}>
                {tLoc(island.id as any)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-1 w-full px-5 py-3 border-b md:border-b-0 md:border-r border-gray-100 hidden md:block">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('pickupDate')}</label>
        <div className="flex items-center gap-2 mt-1">
          <Calendar size={18} className="text-[var(--color-primary)]" />
          <input 
            type="date" 
            className="w-full font-semibold outline-none bg-transparent text-gray-900" 
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
      <div className="flex-1 w-full px-5 py-3 hidden md:block">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('returnDate')}</label>
        <div className="flex items-center gap-2 mt-1">
          <Calendar size={18} className="text-[var(--color-primary)]" />
          <input 
            type="date" 
            className="w-full font-semibold outline-none bg-transparent text-gray-900" 
            min={startDate || todayDate}
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <button 
        onClick={handleSearch}
        className="btn-primary m-1 !rounded-xl !px-8"
      >
        <Search size={18} /> Search
      </button>
    </div>
  )
}
