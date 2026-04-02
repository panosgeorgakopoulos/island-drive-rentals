import { google } from "googleapis"

/**
 * Appends a new booking row to the centralized Google Sheets ledger.
 * Mapping: [ID, Name, Vehicle, Location, Dates, Amount]
 */
export async function appendBookingToSheet(booking: {
  id: string;
  user: { name: string | null; email: string };
  vehicle: { name: string };
  pickupLocation: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}) {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY

  if (!spreadsheetId || !clientEmail || !privateKey) {
    console.warn("⚠️ Sheets credentials or Spreadsheet ID missing. Skipping sync.")
    return false
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })
    
    // Formatting: [Booking ID, Customer Name, Vehicle, Pickup, Dates, Amount]
    const row = [
      booking.id,
      booking.user.name || booking.user.email,
      booking.vehicle.name,
      booking.pickupLocation,
      `${booking.startDate.toLocaleDateString()} - ${booking.endDate.toLocaleDateString()}`,
      `€${booking.totalPrice}`
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row]
      }
    })

    return true
  } catch (error) {
    console.error("❌ Failed to append to Google Sheet:", error)
    return false
  }
}
