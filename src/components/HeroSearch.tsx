"use client"

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
  
  const [startDate, setStartDate] = useState(searchParams.get('start') || "")
  const [endDate, setEndDate] = useState(searchParams.get('end') || "")
  const [location, setLocation] = useState(searchParams.get('location') || "")
  const [todayDate, setTodayDate] = useState("")

  useEffect(() => {
    setTodayDate(new Date().toISOString().split('T')[0])
  }, [])

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
    setLocation(val)
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

  const isSearchDisabled = !location || !startDate || !endDate || new Date(endDate) <= new Date(startDate)

  const handleSearch = () => {
    if (isSearchDisabled) return
    router.push(`/fleet?location=${location}&start=${startDate}&end=${endDate}`)
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
      <div className="flex-1 w-full px-5 py-3 border-b md:border-b-0 md:border-r border-gray-100 hidden md:block">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('pickupDate')}</label>
        <div className="flex items-center gap-2 mt-1">
          <Calendar size={18} className="text-[var(--color-primary)]" />
          <input 
            type="date" 
            className="w-full font-semibold outline-none bg-transparent text-gray-900" 
            min={todayDate}
            value={startDate}
            onChange={e => handleStartDateChange(e.target.value)}
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
            onChange={e => handleEndDateChange(e.target.value)}
          />
        </div>
      </div>
      <button 
        onClick={handleSearch}
        disabled={isSearchDisabled}
        className="btn-primary m-1 !rounded-xl !px-8 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <Search size={18} /> Search
      </button>
    </div>
  )
}
