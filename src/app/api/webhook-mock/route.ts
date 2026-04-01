import { NextRequest, NextResponse } from "next/server"

// This endpoint is no longer needed.
// In dev/mock mode, the checkout route now creates bookings atomically.
// Keeping this file to prevent 404s on any old links.
export async function GET(req: NextRequest) {
  return NextResponse.redirect(new URL("/success?mock=true", req.url))
}
