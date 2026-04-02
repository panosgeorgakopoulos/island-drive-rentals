export interface IslandLocation {
  id: string
  nameKey: string
  image: string
  pickupPoints: string[]
  coordinates?: { lat: number; lng: number }
}

export const ISLANDS: IslandLocation[] = [
  {
    id: "santorini",
    nameKey: "locations.santorini",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800",
    pickupPoints: ["Santorini Airport (JTR)", "Athinios Port"],
    coordinates: { lat: 36.3932, lng: 25.4615 },
  },
  {
    id: "mykonos",
    nameKey: "locations.mykonos",
    image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&q=80&w=800",
    pickupPoints: ["Mykonos Airport (JMK)", "New Port"],
    coordinates: { lat: 37.4467, lng: 25.3289 },
  },
  {
    id: "crete",
    nameKey: "locations.crete",
    image: "https://images.unsplash.com/photo-1577903203403-dc3ec56a31c5?auto=format&fit=crop&q=80&w=800",
    pickupPoints: ["Heraklion Airport (HER)", "Chania Airport (CHQ)"],
    coordinates: { lat: 35.2401, lng: 24.8093 },
  },
  {
    id: "paros",
    nameKey: "locations.paros",
    image: "https://images.unsplash.com/photo-1620803512891-9e735ff6f05f?auto=format&fit=crop&q=80&w=800",
    pickupPoints: ["Paros Airport (PAS)", "Parikia Port"],
    coordinates: { lat: 37.0486, lng: 25.1480 },
  },
  {
    id: "rhodes",
    nameKey: "locations.rhodes",
    image: "https://images.unsplash.com/photo-1603565816030-6b38c4ebfe06?auto=format&fit=crop&q=80&w=800",
    pickupPoints: ["Rhodes Airport (RHO)", "Rhodes Port"],
    coordinates: { lat: 36.4344, lng: 28.2176 },
  },
]

/** Flat list of all pickup points with their island ID */
export const ALL_PICKUP_POINTS = ISLANDS.flatMap((island) =>
  island.pickupPoints.map((point) => ({
    islandId: island.id,
    islandNameKey: island.nameKey,
    point,
  }))
)
