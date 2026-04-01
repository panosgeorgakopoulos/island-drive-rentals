import Link from "next/link";
import { Search, Star } from "lucide-react";
import { HeroSearch } from "@/components/HeroSearch";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-gray-900" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80")' }}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>
        
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center text-white space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
            Explore the Island Freedom
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-200">
            Premium car, scooter, and ATV rentals for your perfect vacation.
          </p>

          <HeroSearch />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="bg-blue-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
              <Star className="text-blue-600" size={28} />
            </div>
            <h3 className="font-bold">Top Rated</h3>
            <p className="text-sm text-gray-500">4.9/5 Average Review</p>
          </div>
          <div className="space-y-2">
            <div className="bg-blue-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
              <Search className="text-blue-600" size={28} />
            </div>
            <h3 className="font-bold">No Hidden Fees</h3>
            <p className="text-sm text-gray-500">Transparent pricing</p>
          </div>
          {/* Add more trust badges if needed */}
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20 bg-gray-50 flex-1">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-4xl font-bold tracking-tight">Our Premium Fleet</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Example Card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden text-left hover:shadow-xl transition flex flex-col">
              <div className="h-48 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80")' }} />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Toyota Yaris</h3>
                    <p className="text-sm text-gray-500">Economy Car</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600">€35</span>
                    <span className="text-xs text-gray-500">/day</span>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-600 mt-4 mb-6">
                  <span>5 Seats</span> • <span>Manual</span> • <span>Petrol</span>
                </div>
                <div className="mt-auto">
                  <Link href="/fleet/toyota-yaris-economy" className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8">
            <Link href="/fleet" className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-900 hover:text-white transition">
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 text-center">
        <p>&copy; 2026 Island Drive Rentals. All rights reserved.</p>
      </footer>
    </div>
  );
}
