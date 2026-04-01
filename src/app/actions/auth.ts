"use server"

import { prisma } from "@/lib/prisma"
import bcryptjs from "bcryptjs"
import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
       switch (error.type) {
         case "CredentialsSignin": redirect("/login?error=InvalidCredentials")
         default: redirect("/login?error=SomethingWentWrong")
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
    redirect("/register?error=InvalidInput")
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    redirect("/register?error=EmailTaken")
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
