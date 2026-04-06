import { google } from "googleapis"

/**
 * Creates a Google Calendar event for a confirmed booking.
 * Displays vehicle name and customer name in the summary for quick overview.
 */
export async function createCalendarEvent(booking: {
  id: string;
  user: { name: string | null; email: string };
  phone: string;
  vehicle: { name: string };
  pickupLocation: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  extras?: string;
}) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY

  if (!calendarId || !clientEmail || !privateKey) {
    console.warn("⚠️ Calendar credentials or ID missing. Skipping calendar sync.")
    return false
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/calendar.events"],
    })

    const calendar = google.calendar({ version: "v3", auth })

    const description = `
Reservation Reference: ${booking.id}
Customer: ${booking.user.name || "N/A"}
Email: ${booking.user.email}
Phone: ${booking.phone}
Pickup Location: ${booking.pickupLocation}
Extras: ${booking.extras || "None"}
Total Price: €${booking.totalPrice.toFixed(2)}
    `.trim()

    const event = {
      summary: `🚗 ${booking.vehicle.name} - ${booking.user.name || booking.user.email}`,
      description,
      start: {
        dateTime: booking.startDate.toISOString(),
        timeZone: 'Europe/Athens',
      },
      end: {
        dateTime: booking.endDate.toISOString(),
        timeZone: 'Europe/Athens',
      },
    }

    await calendar.events.insert({
      calendarId,
      requestBody: event,
    })

    return true
  } catch (error) {
    console.error("❌ Failed to create Google Calendar event:", error)
    return false
  }
}
