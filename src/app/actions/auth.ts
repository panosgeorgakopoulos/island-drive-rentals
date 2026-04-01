"use server"

import { prisma } from "@/lib/prisma"
import bcryptjs from "bcryptjs"
import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", Object.fromEntries(formData), { redirectTo: "/" })
  } catch (error) {
    if (error instanceof AuthError) {
       switch (error.type) {
         case "CredentialsSignin": return { error: "Invalid credentials." }
         default: return { error: "Something went wrong." }
       }
    }
    throw error // Important for Next.js redirects to work!
  }
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  
  if (!name || !email || !password || password.length < 6) {
    return { error: "Invalid input or password too short." }
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: "Email already taken." }
  }

  const hashedPassword = await bcryptjs.hash(password, 10)
  
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "customer"
    }
  })

  // Auto sign in after registration
  redirect("/login?registered=true")
}
