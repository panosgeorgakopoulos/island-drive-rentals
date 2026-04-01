import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: "Learn about Island Drive Rentals cancellation and refund policies",
}

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          Cancellation & Refund Policy
        </h1>
        <p className="text-lg text-gray-500 mb-12">
          Effective Date: January 1, 2026
        </p>

        <div className="bg-white rounded-3xl p-8 md:p-12 border shadow-sm prose prose-blue max-w-none prose-headings:tracking-tight">
          <h2>1. Free Cancellation Period</h2>
          <p>
            At Island Drive Rentals, we understand that plans change. You can cancel your reservation completely free of charge up to <strong>48 hours before</strong> your scheduled pick-up time.
          </p>
          <p>
            If you cancel before this deadline, a full 100% refund will be issued to your original payment method. Please allow 3-5 business days for the credit to appear on your bank statement.
          </p>

          <h2>2. Late Cancellations</h2>
          <p>
            Cancellations made within 48 hours of the scheduled pick-up time are subject to a late cancellation fee:
          </p>
          <ul>
            <li><strong>24-48 hours before pick-up:</strong> 50% refund of the total booking price.</li>
            <li><strong>Under 24 hours before pick-up:</strong> No refund will be issued.</li>
          </ul>

          <h2>3. No-Shows</h2>
          <p>
            If you fail to arrive at the rental desk within 2 hours of your scheduled pick-up time without prior notice, it will be considered a "No-Show". No-shows will not receive any refund. We highly recommend contacting our support team if your flight is delayed or you anticipate arriving late.
          </p>

          <h2>4. Early Returns</h2>
          <p>
            If you choose to return the vehicle earlier than your scheduled drop-off date, we are unable to refund the unused days. The vehicle is reserved specifically for your selected timeline, preventing others from booking it.
          </p>

          <h2>5. How to Cancel</h2>
          <p>
            You can cancel your booking instantly through your <a href="/profile">User Profile dashboard</a>. Alternatively, you can email our support team at <strong>support@islanddrive.gr</strong> with your Invoice Reference Number.
          </p>
          
          <hr />
          
          <p className="text-sm text-gray-500 text-center">
            If you have any further questions regarding this policy, please reach out to our customer service desk at the Athens Airport location.
          </p>
        </div>
      </div>
    </div>
  )
}
