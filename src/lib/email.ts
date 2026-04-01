export async function sendBookingConfirmation(email: string | null, bookingDetails: any) {
  if (!email) return;
  
  console.log("\n====================================================");
  console.log(`✉️ EMAIL DISPATCHED TO: ${email}`);
  console.log(`Subject: Reservation Confirmed - Island Drive Rentals 🏎️`);
  console.log(`\nDear Customer (Booking ID: ${bookingDetails.id}),\n\nYour premium reservation for the ${bookingDetails.vehicle.name} is successfully confirmed!`);
  console.log(`Pickup: ${bookingDetails.pickupLocation}`);
  console.log(`Amount: €${bookingDetails.totalPrice}`);
  console.log(`\nPlease bring a valid driver's license. Safe travels!`);
  console.log("====================================================\n");
}
