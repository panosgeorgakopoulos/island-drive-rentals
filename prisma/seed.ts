import { PrismaClient } from "@prisma/client"
import bcryptjs from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcryptjs.hash("admin123", 10)

  // Upsert admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@islanddrive.com" },
    update: {},
    create: {
      email: "admin@islanddrive.com",
      name: "Admin User",
      password: hashedPassword,
      role: "admin",
    },
  })

  console.log("Admin user created:", admin.email)

  // 20 Premium Vehicles Seed Data
  const vehicles = [
    // === 6 CARS ===
    {
      type: "car", category: "economy", name: "Toyota Yaris", slug: "toyota-yaris-economy",
      description: "A reliable and fuel-efficient economy car perfect for island driving and narrow streets.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ seats: 5, doors: 4, transmission: "Manual", fuel: "Petrol" }),
      basePrice: 35.0, weeklyDiscount: 10, isActive: true,
    },
    {
      type: "car", category: "economy", name: "Fiat 500", slug: "fiat-500-economy",
      description: "Iconic Italian design. Easy to park, fun to drive, and perfect for couples.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1549420340-022e1b12d5cd?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ seats: 4, doors: 2, transmission: "Manual", fuel: "Petrol" }),
      basePrice: 30.0, weeklyDiscount: 10, isActive: true,
    },
    {
      type: "car", category: "suv", name: "Jeep Renegade", slug: "jeep-renegade-suv",
      description: "Tackle any terrain with this robust SUV. Great for exploring hidden beaches.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ seats: 5, doors: 4, transmission: "Automatic", fuel: "Diesel" }),
      basePrice: 65.0, weeklyDiscount: 15, isActive: true,
    },
    {
      type: "car", category: "suv", name: "Peugeot 3008", slug: "peugeot-3008-suv",
      description: "Premium comfort and modern tech features for family travels across the island.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1582490805562-ab163c40a324?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ seats: 5, doors: 4, transmission: "Automatic", fuel: "Diesel" }),
      basePrice: 75.0, weeklyDiscount: 15, isActive: true,
    },
    {
      type: "car", category: "luxury", name: "Mercedes-Benz C-Class", slug: "mercedes-c-class-luxury",
      description: "Experience ultimate luxury and performance for VIP travel and business.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ seats: 5, doors: 4, transmission: "Automatic", fuel: "Hybrid" }),
      basePrice: 120.0, weeklyDiscount: 20, isActive: true,
    },
    {
      type: "car", category: "convertible", name: "Mini Cooper Cabrio", slug: "mini-cooper-cabrio",
      description: "Feel the Mediterranean breeze with this stylish and agile convertible.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1510480332304-ce444bf3f628?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ seats: 4, doors: 2, transmission: "Automatic", fuel: "Petrol" }),
      basePrice: 80.0, weeklyDiscount: 15, isActive: true,
    },

    // === 7 TWO-WHEELERS ===
    {
      type: "scooter", category: "50cc", name: "Vespa Primavera", slug: "vespa-primavera-50",
      description: "Classic Italian aesthetics paired with modern agility. Perfect for city hopping.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "50cc", transmission: "Automatic", helmets: 2 }),
      basePrice: 20.0, weeklyDiscount: 10, isActive: true,
    },
    {
      type: "scooter", category: "50cc", name: "Piaggio Liberty", slug: "piaggio-liberty-50",
      description: "Lightweight and incredibly fuel-efficient. Great for absolute beginners.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "50cc", transmission: "Automatic", helmets: 2 }),
      basePrice: 18.0, weeklyDiscount: 10, isActive: true,
    },
    {
      type: "scooter", category: "125cc", name: "Honda PCX 125", slug: "honda-pcx-125",
      description: "Spacious under-seat storage and smooth handling. A tourist favorite.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1558980394-0a37b3b3a3ab?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "125cc", transmission: "Automatic", helmets: 2 }),
      basePrice: 25.0, weeklyDiscount: 10, isActive: true,
    },
    {
      type: "scooter", category: "125cc", name: "Yamaha NMAX", slug: "yamaha-nmax-125",
      description: "Sporty design with ABS braking for maximum safety on winding coastal roads.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1463130283526-0e10403dc377?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "125cc", transmission: "Automatic", helmets: 2 }),
      basePrice: 28.0, weeklyDiscount: 10, isActive: true,
    },
    {
      type: "scooter", category: "125cc", name: "SYM Symphony", slug: "sym-symphony-125",
      description: "Large wheels offer superior stability on uneven or cobblestone streets.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "125cc", transmission: "Automatic", helmets: 2 }),
      basePrice: 22.0, weeklyDiscount: 10, isActive: true,
    },
    {
      type: "motorcycle", category: "adventure", name: "Honda CB500X", slug: "honda-cb500x",
      description: "Capable adventure bike for long distances and exploring mountainous terrain.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "500cc", transmission: "Manual", helmets: 2 }),
      basePrice: 45.0, weeklyDiscount: 15, isActive: true,
    },
    {
      type: "motorcycle", category: "naked", name: "Yamaha MT-07", slug: "yamaha-mt-07",
      description: "Thrilling torque and hyper-naked styling for experienced riders.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "689cc", transmission: "Manual", helmets: 2 }),
      basePrice: 55.0, weeklyDiscount: 15, isActive: true,
    },

    // === 7 ATV/BUGGIES ===
    {
      type: "atv", category: "quad", name: "Kymco MXU 300", slug: "kymco-mxu-300",
      description: "Sturdy and reliable quad. Ideal for navigating to hard-to-reach shores.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1596328546171-77e37b5f8ea2?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "300cc", transmission: "Automatic", seats: 2 }),
      basePrice: 40.0, weeklyDiscount: 10, isActive: true,
    },
    {
      type: "atv", category: "quad", name: "Polaris Sportsman 450", slug: "polaris-sportsman-450",
      description: "Legendary off-road capability with AWD on demand. Conquers any trail.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1596328546171-77e37b5f8ea2?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "450cc", transmission: "Automatic", seats: 2 }),
      basePrice: 50.0, weeklyDiscount: 10, isActive: true,
    },
    {
      type: "atv", category: "quad", name: "CFMOTO CFORCE 520", slug: "cfmoto-cforce-520",
      description: "Powerful 4x4 quad with electronic power steering for maximum comfort.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1596328546171-77e37b5f8ea2?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "520cc", transmission: "Automatic", seats: 2 }),
      basePrice: 55.0, weeklyDiscount: 10, isActive: true,
    },
    {
      type: "atv", category: "quad", name: "Kymco Maxxer 300", slug: "kymco-maxxer-300",
      description: "Sporty quad with a wider stance for aggressive riding and fun.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1596328546171-77e37b5f8ea2?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "300cc", transmission: "Automatic", seats: 2 }),
      basePrice: 45.0, weeklyDiscount: 10, isActive: true,
    },
    {
      type: "buggy", category: "utv", name: "Polaris RZR 570", slug: "polaris-rzr-570",
      description: "Side-by-side buggy offering a car-like driving experience off-road.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1628178652368-87bc126a108a?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "570cc", transmission: "Automatic", seats: 2 }),
      basePrice: 80.0, weeklyDiscount: 15, isActive: true,
    },
    {
      type: "buggy", category: "utv", name: "CFMOTO ZFORCE 1000", slug: "cfmoto-zforce-1000",
      description: "An absolute beast of a machine. Extreme suspension and horsepower.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1628178652368-87bc126a108a?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "1000cc", transmission: "Automatic", seats: 2 }),
      basePrice: 110.0, weeklyDiscount: 20, isActive: true,
    },
    {
      type: "buggy", category: "utv", name: "Can-Am Maverick X3", slug: "can-am-maverick-x3",
      description: "The pinnacle of off-road performance. Drive the desert like a pro.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1628178652368-87bc126a108a?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "900cc Turbo", transmission: "Automatic", seats: 2 }),
      basePrice: 150.0, weeklyDiscount: 20, isActive: true,
    }
  ]

  console.log("Seeding vehicles...")
  for (const v of vehicles) {
    await prisma.vehicle.upsert({
      where: { slug: v.slug },
      update: v,
      create: v,
    })
  }

  console.log(`Seeding complete. Added ${vehicles.length} premium vehicles!`)

  // Seed GlobalSettings
  await prisma.globalSettings.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      highSeasonStartMonth: 7,
      highSeasonEndMonth: 8,
      surgePercentage: 20,
      weeklyDiscountPercent: 10,
      commissionPercent: 15,
    },
  })
  console.log("Global settings seeded.")

  // Seed Extras
  const extras = [
    { name: "Full Protection Insurance", nameKey: "booking.fullInsurance", priceType: "per_day", price: 15 },
    { name: "Child Seat", nameKey: "booking.childSeat", priceType: "per_day", price: 5 },
    { name: "Additional Driver", nameKey: "booking.additionalDriver", priceType: "per_day", price: 10 },
  ]

  for (const extra of extras) {
    await prisma.extra.upsert({
      where: { name: extra.name },
      update: extra,
      create: extra,
    })
  }
  console.log(`Seeded ${extras.length} extras.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
