"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Filter } from "lucide-react"

export function FleetFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "200")

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (category) params.set("category", category)
    else params.delete("category")
    
    if (maxPrice) params.set("maxPrice", maxPrice)
    else params.delete("maxPrice")
    
    router.push(`/fleet?${params.toString()}`)
  }

  return (
    <div className="card-premium p-6 space-y-6 sticky top-24">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
        <Filter className="text-[var(--color-primary)]" size={20} />
        <h3 className="font-bold text-lg text-gray-900">Filter Options</h3>
      </div>
      
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Category</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-200 p-3 rounded-xl bg-[var(--color-surface-alt)] outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-medium text-gray-700"
        >
          <option value="">All Categories</option>
          <option value="economy">Economy</option>
          <option value="suv">SUV</option>
          <option value="van">Van</option>
          <option value="luxury">Luxury</option>
          <option value="scooter">Scooter</option>
          <option value="atv">ATV</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Max Price <span className="text-[var(--color-primary)]">(€{maxPrice}/day)</span></label>
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

      <button onClick={handleApply} className="btn-primary w-full !py-3 mt-4">Apply Filters</button>
    </div>
  )
}
