"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Filter } from "lucide-react"
import { useTranslations } from "next-intl"

export function FleetFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations('fleetPage')
  
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "200")
  const [isOpen, setIsOpen] = useState(false)

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (category) params.set("category", category)
    else params.delete("category")
    
    if (maxPrice) params.set("maxPrice", maxPrice)
    else params.delete("maxPrice")
    
    router.push(`/fleet?${params.toString()}`)
  }

  return (
    <div className="space-y-4 md:sticky md:top-24">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="md:hidden w-full min-h-11 flex items-center justify-between px-4 rounded-xl border border-gray-200 bg-white shadow-sm"
      >
        <span className="flex items-center gap-2 font-semibold text-gray-900">
          <Filter size={18} className="text-[var(--color-primary)]" />
          {t('filters')}
        </span>
        <span className="text-sm">{isOpen ? "−" : "+"}</span>
      </button>

      <div className={`${isOpen ? "block" : "hidden"} md:block`}>
        <div className="card-premium rounded-2xl p-4 md:p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">{t('category')}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full min-h-11 border border-gray-200 rounded-xl px-3 bg-[var(--color-surface-alt)] font-medium"
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

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              {t('maxPrice')} <span className="text-[var(--color-primary)]">(€{maxPrice}{t('perDay')})</span>
            </label>
            <input
              type="range"
              min="10"
              max="300"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full accent-[var(--color-primary)]"
            />
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="btn-primary w-full min-h-11"
          >
            {t('applyFilters')}
          </button>
        </div>
      </div>
    </div>
  )
}
