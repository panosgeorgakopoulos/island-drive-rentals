"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createVehicle(formData: FormData) {
  const name = formData.get("name") as string
  const type = formData.get("type") as string
  const category = formData.get("category") as string
  const description = formData.get("description") as string
  const basePrice = parseFloat(formData.get("basePrice") as string)
  const image = formData.get("image") as string // simplified to single URL
  
  // Create slug from name
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4)

  const specs = JSON.stringify({
    transmission: formData.get("transmission") as string,
    fuel: formData.get("fuel") as string,
    seats: parseInt(formData.get("seats") as string) || 4,
  })

  await prisma.vehicle.create({
    data: {
      name,
      slug,
      type,
      category,
      description,
      basePrice,
      images: JSON.stringify([image]),
      specs,
      isActive: true,
    }
  })

  revalidatePath("/admin/fleet")
  redirect("/admin/fleet")
}

export async function updateVehicle(id: string, formData: FormData) {
  const name = formData.get("name") as string
  const type = formData.get("type") as string
  const category = formData.get("category") as string
  const description = formData.get("description") as string
  const basePrice = parseFloat(formData.get("basePrice") as string)
  const image = formData.get("image") as string // simplified to single URL
  
  // Note: We might optionally update the slug too, but it's usually stable

  const specs = JSON.stringify({
    transmission: formData.get("transmission") as string,
    fuel: formData.get("fuel") as string,
    seats: parseInt(formData.get("seats") as string) || 4,
  })

  await prisma.vehicle.update({
    where: { id },
    data: {
      name,
      type,
      category,
      description,
      basePrice,
      images: JSON.stringify([image]),
      specs,
    }
  })

  revalidatePath("/admin/fleet")
  redirect("/admin/fleet")
}
