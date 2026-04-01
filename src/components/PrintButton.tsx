"use client"

import { Printer } from "lucide-react"

export function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-3 rounded-xl font-medium transition"
    >
      <Printer size={20} />
      <span>Print Receipt</span>
    </button>
  )
}
