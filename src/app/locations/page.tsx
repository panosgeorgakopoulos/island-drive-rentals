import Link from "next/link"
import { Search } from "lucide-react"

const LOCATIONS = [
  {
    id: "santorini",
    name: "Santorini",
    desc: "Experience the majestic sunsets and volcanic landscapes in premium comfort.",
    img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800",
    points: ["Santorini Airport (JTR)", "Athinios Port"]
  },
  {
    id: "mykonos",
    name: "Mykonos",
    desc: "Navigate the vibrant nightlife and pristine white sandy beaches.",
    img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&q=80&w=800",
    points: ["Mykonos Airport (JMK)", "New Port"]
  },
  {
    id: "crete",
    name: "Crete",
    desc: "Discover ancient ruins, deep gorges, and expansive coastlines with our luxury SUVs.",
    img: "https://images.unsplash.com/photo-1577903203403-dc3ec56a31c5?auto=format&fit=crop&q=80&w=800",
    points: ["Heraklion Airport (HER)", "Chania Airport (CHQ)"]
  },
  {
    id: "paros",
    name: "Paros",
    desc: "The quintessential cycladic experience requires the perfect convertible.",
    img: "https://images.unsplash.com/photo-1620803512891-9e735ff6f05f?auto=format&fit=crop&q=80&w=800",
    points: ["Paros Airport (PAS)", "Parikia Port"]
  },
  {
    id: "rhodes",
    name: "Rhodes",
    desc: "Drive through medieval towns and crystal clear bays in absolute luxury.",
    img: "https://images.unsplash.com/photo-1603565816030-6b38c4ebfe06?auto=format&fit=crop&q=80&w=800",
    points: ["Rhodes Airport (RHO)", "Rhodes Port"]
  }
]

export default function LocationsPage() {
  return (
    <div className="bg-[var(--color-surface-alt)] min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-gray-900 border-b relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000")'}} />
        <div className="max-w-6xl mx-auto px-6 section-spacing relative z-10 text-white">
          <p className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-widest mb-3">Destinations</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Prime Locations</h1>
          <p className="text-lg text-gray-300 mt-4 max-w-xl text-balance">Available across the most exclusive Greek Islands. Pick up your vehicle right off the plane or ferry.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-16">
        <div className="grid md:grid-cols-2 gap-10">
          {LOCATIONS.map(loc => (
            <div key={loc.id} className="card-premium overflow-hidden group flex flex-col">
              <div 
                className="h-64 bg-gray-200 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${loc.img})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h2 className="absolute bottom-6 left-6 text-3xl font-extrabold text-white tracking-tight drop-shadow-md">{loc.name}</h2>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-gray-500 mb-6">{loc.desc}</p>
                <div className="space-y-2 mb-8">
                  <h4 className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-3">Pick-up Points</h4>
                  {loc.points.map(p => (
                    <div key={p} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300" /> {p}
                    </div>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link href={`/fleet?location=${loc.id}`} className="btn-secondary w-full">
                    <Search size={18} /> Search Vehicles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
