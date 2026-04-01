"use client"

import { useState } from "react"
import { Shield, Baby, Users } from "lucide-react"

export function BookingCheckoutClient({ 
  vehicle, 
  user,
  start,
  end,
  location,
  pricing
}: {
  vehicle: any,
  user: any,
  start: string,
  end: string,
  location: string,
  pricing: { days: number, baseTotal: number, surgeAmount: number, discountAmount: number, finalTotal: number, hasSurge: boolean, hasDiscount: boolean, discountPercent: number }
}) {
  const [wantsInsurance, setWantsInsurance] = useState(false)
  const [wantsChildSeat, setWantsChildSeat] = useState(false)
  const [wantsExtraDriver, setWantsExtraDriver] = useState(false)

  const insuranceCost = 15;
  const childSeatCost = 5;
  const extraDriverCost = 10;

  let extrasDailyCost = 0;
  let selectedExtrasArr: string[] = []
  
  if (wantsInsurance) {
    extrasDailyCost += insuranceCost;
    selectedExtrasArr.push("Full Protection Insurance")
  }
  if (wantsChildSeat) {
    extrasDailyCost += childSeatCost;
    selectedExtrasArr.push("Child Seat")
  }
  if (wantsExtraDriver) {
    extrasDailyCost += extraDriverCost;
    selectedExtrasArr.push("Additional Driver")
  }

  const { days, baseTotal, surgeAmount, discountAmount, finalTotal, hasSurge, hasDiscount, discountPercent } = pricing
  const totalWithExtras = finalTotal + (days * extrasDailyCost)
  const extrasString = selectedExtrasArr.join(", ")

  return (
    <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-8">
      {/* Booking Form */}
      <div className="md:col-span-2 space-y-6">
        <div className="card-premium p-8">
          <h2 className="text-2xl font-extrabold tracking-tight mb-6">Complete your booking</h2>
          
          <form action="/api/checkout" method="POST" className="space-y-6">
            <input type="hidden" name="vehicleId" value={vehicle.id} />
            <input type="hidden" name="startDate" value={start || ""} />
            <input type="hidden" name="endDate" value={end || ""} />
            <input type="hidden" name="extras" value={extrasString} />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pickup Date</label>
                <input 
                  readOnly 
                  value={start || ""} 
                  className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-700 cursor-not-allowed font-semibold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Return Date</label>
                <input 
                  readOnly 
                  value={end || ""} 
                  className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-700 cursor-not-allowed font-semibold" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pickup Location</label>
              <select name="pickupLocation" defaultValue={location || "Athens Airport"} className="w-full border border-gray-200 rounded-xl p-3 bg-[var(--color-surface-alt)] font-semibold outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
                <option value="Athens Airport">Athens Airport</option>
                <option value="Athens City Center">Athens City Center</option>
                <option value="Santorini Airport">Santorini Airport</option>
                <option value="Mykonos Port">Mykonos Port</option>
                <option value="Crete Heraklion Airport">Crete Heraklion Airport</option>
              </select>
            </div>

            {/* Premium Upsell Section */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-lg font-bold mb-4">Premium Extras</h3>
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${wantsInsurance ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={wantsInsurance} onChange={e => setWantsInsurance(e.target.checked)} className="w-5 h-5 text-[var(--color-primary)] rounded accent-[var(--color-primary)]" />
                    <Shield className={wantsInsurance ? "text-[var(--color-primary)]" : "text-gray-400"} size={20} />
                    <div className="text-sm">
                      <span className="font-bold block">Full Protection Insurance</span>
                      <span className="text-gray-500">Zero excess, glass & tire cover</span>
                    </div>
                  </div>
                  <span className="font-bold">€{insuranceCost}/day</span>
                </label>

                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${wantsChildSeat ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={wantsChildSeat} onChange={e => setWantsChildSeat(e.target.checked)} className="w-5 h-5 text-[var(--color-primary)] rounded accent-[var(--color-primary)]" />
                    <Baby className={wantsChildSeat ? "text-[var(--color-primary)]" : "text-gray-400"} size={20} />
                    <div className="text-sm">
                      <span className="font-bold block">Child Seat</span>
                      <span className="text-gray-500">Safety first for the little ones</span>
                    </div>
                  </div>
                  <span className="font-bold">€{childSeatCost}/day</span>
                </label>

                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${wantsExtraDriver ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={wantsExtraDriver} onChange={e => setWantsExtraDriver(e.target.checked)} className="w-5 h-5 text-[var(--color-primary)] rounded accent-[var(--color-primary)]" />
                    <Users className={wantsExtraDriver ? "text-[var(--color-primary)]" : "text-gray-400"} size={20} />
                    <div className="text-sm">
                      <span className="font-bold block">Additional Driver</span>
                      <span className="text-gray-500">Share the driving duties</span>
                    </div>
                  </div>
                  <span className="font-bold">€{extraDriverCost}/day</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-lg font-bold mb-4">Customer Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                  <input required name="name" defaultValue={user?.name || ""} className="w-full border border-gray-200 rounded-xl p-3 bg-[var(--color-surface-alt)] font-semibold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                  <input required name="email" type="email" readOnly defaultValue={user?.email || ""} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-500 cursor-not-allowed font-semibold" />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={days <= 0}
              className="btn-primary w-full text-lg !py-4 mt-8"
            >
              {days > 0 ? `Confirm & Pay €${totalWithExtras.toFixed(2)}` : 'Select valid dates first'}
            </button>
          </form>
        </div>
      </div>

      {/* Summary Sidebar */}
      <div className="space-y-6">
        <div className="card-premium p-6 sticky top-24">
          <h3 className="font-bold text-lg mb-4">Booking Summary</h3>
          <div className="flex gap-4 items-center mb-6 pb-6 border-b border-gray-100">
            <div 
              className="w-20 h-20 bg-gray-200 rounded-xl bg-cover bg-center border border-gray-100"
              style={{ backgroundImage: `url(${JSON.parse(vehicle.images)[0]})` }}
            />
            <div>
              <h4 className="font-bold text-gray-900 leading-tight">{vehicle.name}</h4>
              <p className="text-sm text-gray-500 capitalize leading-tight">{vehicle.category} {vehicle.type}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
            <div className="flex justify-between">
              <span>Daily Rate</span>
              <span className="font-semibold text-gray-900">€{vehicle.basePrice}</span>
            </div>
            {days > 0 && (
              <>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-semibold text-gray-900">{days} day{days !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dates</span>
                  <span className="font-semibold text-gray-900">{new Date(start).toLocaleDateString('en-GB')} → {new Date(end).toLocaleDateString('en-GB')}</span>
                </div>
                
                {/* Advanced Pricing Breakdown */}
                <div className="pt-3 mt-3 border-t border-gray-50 space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>Base Total</span>
                    <span>€{baseTotal}</span>
                  </div>
                  {hasSurge && (
                    <div className="flex justify-between text-yellow-600 font-medium">
                      <span>High Season Surge (+20%)</span>
                      <span>+€{surgeAmount}</span>
                    </div>
                  )}
                  {hasDiscount && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Weekly Discount (-{discountPercent}%)</span>
                      <span>-€{discountAmount}</span>
                    </div>
                  )}
                </div>

                {extrasDailyCost > 0 && (
                  <div className="flex justify-between pt-3 border-t border-gray-50 text-orange-600 font-medium">
                    <span>Premium Extras</span>
                    <span>+€{extrasDailyCost * days}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex justify-between text-xl font-extrabold pb-2">
            <span>Total</span>
            <span className="text-[var(--color-primary)]">{days > 0 ? `€${totalWithExtras.toFixed(2)}` : '—'}</span>
          </div>
        </div>
      </div>

    </div>
  )
}
