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
    <div className="bg-white/95 backdrop-blur-md p-2 rounded-3xl shadow-2xl border border-white/20 max-w-5xl mx-auto mt-6 md:mt-8">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 min-w-0 px-4 py-3 border border-gray-100 rounded-2xl md:border-0 md:rounded-l-2xl md:rounded-r-none md:border-r">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">{t('pickupLocation')}</label>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-[var(--color-primary)] shrink-0" />
            <select
              className="w-full font-semibold outline-none bg-transparent text-gray-900 appearance-none min-h-11"
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

        <div className="flex-1 min-w-0 px-4 py-3 border border-gray-100 rounded-2xl md:border-0 md:rounded-none md:border-r">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">{t('pickupDate')}</label>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[var(--color-primary)] shrink-0" />
            <input
              type="date"
              className="w-full font-semibold outline-none bg-transparent text-gray-900 min-h-11"
              min={todayDate}
              value={startDate}
              onChange={e => handleStartDateChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0 px-4 py-3 border border-gray-100 rounded-2xl md:border-0 md:rounded-none md:border-r">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">{t('returnDate')}</label>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[var(--color-primary)] shrink-0" />
            <input
              type="date"
              className="w-full font-semibold outline-none bg-transparent text-gray-900 min-h-11"
              min={startDate || todayDate}
              value={endDate}
              onChange={e => handleEndDateChange(e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSearch}
          disabled={isSearchDisabled}
          className="btn-primary w-full md:w-auto min-h-11 px-8 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          <Search size={18} />
          <span className="font-bold">Search Vehicles</span>
        </button>
      </div>
    </div>
  )
}
