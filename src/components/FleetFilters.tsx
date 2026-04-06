"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Filter, X, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

export function FleetFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations('fleetPage')
  
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "200")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.removeProperty("overflow")
      document.documentElement.style.removeProperty("overflow")
    }
    return () => {
      document.body.style.removeProperty("overflow")
      document.documentElement.style.removeProperty("overflow")
    }
  }, [isDrawerOpen])

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (category) params.set("category", category)
    else params.delete("category")
    
    if (maxPrice) params.set("maxPrice", maxPrice)
    else params.delete("maxPrice")
    
    router.push(`/fleet?${params.toString()}`)
    setIsDrawerOpen(false)
  }

  const filterControls = (
    <>
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">{t('category')}</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-200 p-3 rounded-xl bg-[var(--color-surface-alt)] outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-medium text-gray-700"
        >
          <option value="">{t('allCategories')}</option>
          <option value="economy">{t('economy')}</option>
          <option value="suv">{t('suv')}</option>
          <option value="van">{t('van')}</option>
          <option value="luxury">{t('luxury')}</option>
          <option value="scooter">{t('scooter')}</option>
          <option value="atv">{t('atv')}</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
          {t('maxPrice')} <span className="text-[var(--color-primary)]">(€{maxPrice}{t('perDay')})</span>
        </label>
        <input
          type="range"
          min="10"
          max="300"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
        />
        <div className="flex justify-between text-xs text-gray-400 font-medium">
          <span>€10</span>
          <span>€300+</span>
        </div>
      </div>
    </>
  )

  return (
    <>
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="md:hidden w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm cursor-pointer"
      >
        <span className="flex items-center gap-2 font-bold text-gray-900">
          <Filter size={18} className="text-[var(--color-primary)]" />
          {t('filters')}
        </span>
        <ChevronRight size={18} className="text-gray-400" />
      </button>

      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed bottom-0 left-0 w-full z-[10000] md:hidden">
            <div className="card-premium p-6 space-y-6 bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <Filter className="text-[var(--color-primary)]" size={20} />
                  <h3 className="font-bold text-lg text-gray-900">{t('filters')}</h3>
                </div>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 bg-gray-50 rounded-xl cursor-pointer">
                  <X size={20} />
                </button>
              </div>
              {filterControls}
              <button onClick={handleApply} className="btn-primary w-full !py-4 mt-4 font-bold text-lg cursor-pointer">{t('applyFilters')}</button>
            </div>
          </div>
        </>
      )}

      <div className="hidden md:block">
        <div className="card-premium p-6 space-y-6 bg-white rounded-2xl md:sticky md:top-24">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <Filter className="text-[var(--color-primary)]" size={20} />
            <h3 className="font-bold text-lg text-gray-900">{t('filters')}</h3>
          </div>
          {filterControls}
          <button onClick={handleApply} className="btn-primary w-full !py-4 mt-4 font-bold text-lg cursor-pointer">{t('applyFilters')}</button>
        </div>
      </div>
    </>
  )
}
