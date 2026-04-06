import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmationEmail(email: string | null, booking: any) {
  if (!email || !process.env.RESEND_API_KEY) {
    console.warn("⚠️ Email not sent: Missing email address or RESEND_API_KEY");
    return;
  }

  const { vehicle, startDate, endDate, pickupLocation, totalPrice, extras, id } = booking;
  const formattedStart = new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const formattedEnd = new Date(endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  try {
    const { data, error } = await resend.emails.send({
      from: 'Island Drive Rentals <onboarding@resend.dev>',
      to: [email],
      subject: `Reservation Confirmed: ${vehicle.name} 🏎️`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: -0.5px; }
            .confirmation-badge { background: #e6fffa; color: #047481; padding: 4px 12px; border-radius: 9999px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 15px; }
            .details-card { background: #f9fafb; border-radius: 12px; padding: 24px; border: 1px solid #f3f4f6; margin-bottom: 30px; }
            .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px; }
            .detail-label { color: #6b7280; font-size: 14px; }
            .detail-value { font-weight: 600; text-align: right; }
            .extras-section { margin-top: 20px; padding-top: 20px; border-top: 2px dashed #e5e7eb; }
            .total-section { margin-top: 20px; font-size: 20px; font-weight: 800; display: flex; justify-content: space-between; }
            .footer { font-size: 12px; color: #9ca3af; margin-top: 40px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Island Drive Rentals</div>
          </div>

          <div class="confirmation-badge">✓ Reservation Confirmed</div>
          <h1>Your ride is ready!</h1>
          <p>Hi there,</p>
          <p>Thank you for choosing Island Drive Rentals. We've confirmed your booking for the <strong>${vehicle.name}</strong>. Here are your reservation details:</p>

          <div class="details-card">
            <div class="detail-row">
              <span class="detail-label">Reservation Reference</span>
              <span class="detail-value">#${id.toUpperCase()}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Vehicle</span>
              <span class="detail-value">${vehicle.name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Pickup Date</span>
              <span class="detail-value">${formattedStart}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Drop-off Date</span>
              <span class="detail-value">${formattedEnd}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Pickup Location</span>
              <span class="detail-value">${pickupLocation}</span>
            </div>

            ${extras ? `
            <div class="extras-section">
              <p style="margin-bottom: 8px; font-weight: 600; font-size: 14px; color: #6b7280;">Selected Extras:</p>
              <p style="margin: 0; font-size: 14px;">${extras}</p>
            </div>
            ` : ''}

            <div class="total-section">
              <span>Total Paid</span>
              <span>€${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <p><strong>Next Steps:</strong> Please bring a valid driver's license and your passport/ID to the pickup location. If you have any questions, simply reply to this email.</p>
          
          <p>Safe travels!</p>

          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Island Drive Rentals. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error("❌ Resend error:", error);
    } else {
      console.log(`✅ Email sent successfully: ${data?.id}`);
    }
  } catch (err) {
    console.error("❌ Failed to send email confirmation:", err);
  }
}

