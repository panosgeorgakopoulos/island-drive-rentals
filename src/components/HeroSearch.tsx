"use client";

import { useState, useEffect, useCallback } from "react"
import { Search, MapPin, Calendar } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { ISLANDS } from "@/config/locations"

export function HeroSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations('booking')
  const tLoc = useTranslations('locations')
  
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [todayDate, setTodayDate] = useState("")

  useEffect(() => {
    setStartDate(searchParams.get('start') || "")
    setEndDate(searchParams.get('end') || "")
    setSelectedLocation(searchParams.get('location') || "")
    setTodayDate(new Date().toISOString().split('T')[0])
  }, [searchParams])

  // Sync state with URL params
  const updateURL = useCallback((params: Record<string, string | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "") {
        current.delete(key)
      } else {
        current.set(key, value)
      }
    })

    const search = current.toString()
    const query = search ? `?${search}` : ""
    router.replace(`${window.location.pathname}${query}`, { scroll: false })
  }, [router, searchParams])

  const handleLocationChange = (val: string) => {
    setSelectedLocation(val)
    updateURL({ location: val })
  }

  const handleStartDateChange = (val: string) => {
    setStartDate(val)
    let newEndDate = endDate
    if (endDate && new Date(val) >= new Date(endDate)) {
      newEndDate = ""
      setEndDate("")
    }
    updateURL({ start: val, end: newEndDate })
  }

  const handleEndDateChange = (val: string) => {
    setEndDate(val)
    updateURL({ end: val })
  }

  const isSearchDisabled = !selectedLocation || !startDate || !endDate || new Date(endDate) <= new Date(startDate)

  const handleSearch = () => {
    if (isSearchDisabled) return
    router.push(`/fleet?location=${selectedLocation}&start=${startDate}&end=${endDate}`)
  }

  return (
    <div className="bg-white/95 backdrop-blur-md p-2 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-2 items-stretch text-gray-800 text-left max-w-5xl mx-auto mt-8 border border-white/20 relative z-[50] pointer-events-auto">
      {/* Location */}
      <div className="flex-1 min-w-0 px-5 py-4 border-b md:border-b-0 md:border-r border-gray-100 transition-colors hover:bg-gray-50/50 rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('pickupLocation')}</label>
        <div className="flex items-center gap-2 mt-1.5">
          <MapPin size={18} className="text-[var(--color-primary)] shrink-0" />
          <select
            className="w-full font-bold outline-none bg-transparent text-gray-900 appearance-none cursor-pointer text-base"
            value={selectedLocation}
            onChange={e => handleLocationChange(e.target.value)}
          >
            <option value="">{t('selectLocation')}</option>
            {ISLANDS.map(island => (
              <option key={island.id} value={island.id}>
                {tLoc(island.id as any)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dates Container */}
      <div className="flex flex-col sm:flex-row flex-2 gap-2 sm:gap-0">
        {/* Pickup Date */}
        <div className="flex-1 min-w-0 px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-100 transition-colors hover:bg-gray-50/50">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('pickupDate')}</label>
          <div className="flex items-center gap-2 mt-1.5">
            <Calendar size={18} className="text-[var(--color-primary)] shrink-0" />
            <input 
              type="date" 
              className="w-full font-bold outline-none bg-transparent text-gray-900 text-base" 
              min={todayDate}
              value={startDate}
              onChange={e => handleStartDateChange(e.target.value)}
            />
          </div>
        </div>

        {/* Return Date */}
        <div className="flex-1 min-w-0 px-5 py-4 border-b md:border-b-0 md:border-r border-gray-100 transition-colors hover:bg-gray-50/50">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('returnDate')}</label>
          <div className="flex items-center gap-2 mt-1.5">
            <Calendar size={18} className="text-[var(--color-primary)] shrink-0" />
            <input 
              type="date" 
              className="w-full font-bold outline-none bg-transparent text-gray-900 text-base" 
              min={startDate || todayDate}
              value={endDate}
              onChange={e => handleEndDateChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button 
        onClick={handleSearch}
        disabled={isSearchDisabled}
        className="btn-primary m-1.5 !rounded-2xl !px-10 py-4 md:py-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
      >
        <Search size={20} /> <span className="md:hidden font-bold">Search Vehicles</span>
      </button>
    </div>
  )
}
