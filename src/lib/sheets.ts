import { google } from "googleapis"

export async function appendToSheet(bookingData: any[], spreadsheetId: string) {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.warn("Google Sheets credentials not found. Skipping sheet sync.")
      return false
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:I", // Adjust sheet name if needed
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [bookingData]
      }
    })

    console.log("Successfully appended row to Google Sheet.")
    return true
  } catch (error) {
    console.error("Failed to append to Google Sheet:", error)
    return false
  }
}
