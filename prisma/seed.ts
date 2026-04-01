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

  // Seed some vehicles
  const v1 = await prisma.vehicle.upsert({
    where: { slug: "toyota-yaris-economy" },
    update: {},
    create: {
      type: "car",
      category: "economy",
      name: "Toyota Yaris",
      slug: "toyota-yaris-economy",
      description: "A reliable and fuel-efficient economy car perfect for island driving.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ seats: 5, doors: 4, transmission: "Manual", fuel: "Petrol" }),
      basePrice: 35.0,
      isActive: true,
    }
  })

  const v2 = await prisma.vehicle.upsert({
    where: { slug: "honda-pcx-scooter" },
    update: {},
    create: {
      type: "scooter",
      category: "125cc",
      name: "Honda PCX 125",
      slug: "honda-pcx-scooter",
      description: "Comfortable and easy to ride scooter for navigating narrow streets.",
      images: JSON.stringify(["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800"]),
      specs: JSON.stringify({ engine: "125cc", transmission: "Automatic", helmets: 2 }),
      basePrice: 20.0,
      isActive: true,
    }
  })

  console.log("Seeded vehicles.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
