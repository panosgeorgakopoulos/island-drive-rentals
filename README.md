# Island Drive Rentals - Full-Stack Car Rental Platform

A premium, fully responsive car rental website built for scale and performance. Features a complete booking engine, Stripe payments, authentication, role-based admin dashboard, and Google Sheets integration.

## Tech Stack
- **Frontend & Backend**: Next.js 15 (App Router), React, Server Actions
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Database**: SQLite (Development) / PostgreSQL (Production) via **Prisma ORM**
- **Authentication**: NextAuth.js v5 (beta) with Credentials provider (Email/Password)
- **Payments**: Stripe Checkout & Webhooks
- **Integrations**: Google Sheets API v4

---

## Features

1. **User Authentication**: Secure Sign up & Login flow. Role-based access control protecting `/admin` routes.
2. **Dynamic Fleet Management**: Admins can manage the vehicle directory (CRUD).
3. **Advanced Booking System**: Date selection, total price calculation, and overlapping validation (extendable).
4. **Stripe Payments**: Checkout session generation with proper webhook validation to confirm secure payments.
5. **Google Sheets Sync**: Each confirmed booking automatically appends a row to a designated spreadsheet.
6. **Customer Portal**: Users can view their past and upcoming reservations via `/profile`.

---

## Getting Started

### 1. Database Setup
1. Copy `.env.example` to `.env`.
2. Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```
3. Push the schema to your SQLite database (`dev.db`):
   ```bash
   npx prisma db push
   ```
4. **Seed the database** (creates an admin user and dummy vehicles):
   ```bash
   npx ts-node prisma/seed.ts
   ```
   *Note: Default admin login is `admin@islanddrive.com` / `admin123`.*
   *Note: You may see an ES Module warning while running ts-node. You can ignore this.*

### 2. Environment Configuration

To fully enable Stripe and Google Sheets, configure your `.env` file:

**Stripe:**
- `STRIPE_SECRET_KEY`: Get this from your Stripe Dashboard (Test Mode).
- `STRIPE_WEBHOOK_SECRET`: Used to verify webhook events. If testing locally, use the Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhook` to get this secret.

**Google Sheets:**
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Google Sheets API**.
3. Create a **Service Account** and generate a JSON Key.
4. Extract the `client_email` and `private_key` from the JSON to your `.env` file.
5. **CRITICAL**: Share your target Google Sheet with the `client_email` (give it Editor access).
6. Copy the Spreadsheet ID from the URL (`https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit`) and set `GOOGLE_SPREADSHEET_ID`.

*Note: If Stripe or Google Sheets keys are missing, the app falls back to a mock payment success endpoint (`/api/webhook-mock`) so you can test the booking flow locally without issues.*

### 3. Running the Server

Start the Next.js development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to browse the site.
