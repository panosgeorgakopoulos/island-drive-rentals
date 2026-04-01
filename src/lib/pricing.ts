export function calculateTotal(
  vehicle: { basePrice: number; weeklyDiscount: number | null },
  startDate: Date,
  endDate: Date
) {
  const diffTime = endDate.getTime() - startDate.getTime()
  if (diffTime <= 0) {
    return { days: 0, baseTotal: 0, surgeAmount: 0, discountAmount: 0, finalTotal: 0, hasSurge: false, hasDiscount: false, discountPercent: 0 }
  }
  
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const baseTotal = vehicle.basePrice * days

  // Seasonal Surge: If any day touches July (6) or August (7)
  const isHighSeason = startDate.getMonth() === 6 || startDate.getMonth() === 7 || 
                       endDate.getMonth() === 6 || endDate.getMonth() === 7

  let surgeAmount = 0
  if (isHighSeason) {
    surgeAmount = baseTotal * 0.20 // 20% markup
  }

  let discountAmount = 0
  const discountPercent = vehicle.weeklyDiscount || 10
  if (days >= 7 && discountPercent > 0) {
    discountAmount = (baseTotal + surgeAmount) * (discountPercent / 100)
  }

  const finalTotal = baseTotal + surgeAmount - discountAmount

  return { 
    days, 
    baseTotal: parseFloat(baseTotal.toFixed(2)),
    surgeAmount: parseFloat(surgeAmount.toFixed(2)),
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    finalTotal: parseFloat(finalTotal.toFixed(2)),
    hasSurge: isHighSeason,
    hasDiscount: days >= 7,
    discountPercent
  }
}
