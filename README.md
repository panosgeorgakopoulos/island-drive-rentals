# Island Drive Rentals - Tier-1 Enterprise Car Rental Platform

Welcome to **Island Drive Rentals**, a professional-grade, highly scalable car rental platform designed to emulate industry leaders. Built to handle secure bookings, dynamic pricing, role-based administration, and full global internationalization.

## 🚀 Tech Stack
- **Framework**: Next.js 15 (App Router) with React Server Components and Server Actions.
- **Internationalization**: `next-intl` providing strictly typed, middleware-driven localization for 8 languages.
- **Styling**: Tailwind CSS configured with a highly consistent, premium luxury design system (Sixt-inspired).
- **Database Engine**: Prisma ORM bridging local SQLite (development) and PostgreSQL (production).
- **Authentication**: NextAuth.js v5 providing strictly typed session objects and RBAC middleware protection.
- **Payments Processing**: Stripe Checkout integration protected by Backend Webhook asynchronous validation.

---

## 🔥 Key Enterprise Features

1. **Global i18n Architecture**: Native support for 8 languages (**EN, EL, FR, IT, ES, DE, SV, NO**). Managed via a centralized `next-intl` configuration with middleware-based locale detection and URL-segment routing (`/[lang]/...`).
2. **Strict Role-Based Access Control (RBAC)**: All mutations and backend endpoints restrict access gracefully based on user session role (Customer vs Admin). Middleware ensures `/admin` routes are strictly protected while maintaining locale context.
3. **Dynamic Pricing Engine**: Shared backend utility accurately enforcing an automatic **+20% High Season Surge** in July/August, and calculating tiered **Weekly Discounts** automatically dynamically mirrored in the UI.
4. **Advanced Fleet Filtering**: A lightning-fast, visually rich client filtering system updating via URL search parameters, pushing immediate Prisma conditional where-clauses. 
5. **Atomic Booking Transactions**: The Checkout Webhooks rely exclusively on atomic `prisma.$transaction()` statements checking concurrent active spans to guarantee zero double-bookings.
6. **Self-Service Cancellations**: A highly secure User Profile portal (`/profile`) allowing users to interact directly with Server Actions to cancel their bookings subject to a strict `Wait exactly 48 hours buffer` threshold.
7. **Island Locations Hub**: Interactive visual locations pages structured to funnel premium SEO juice across all supported languages.

---

## 🛠 Setup & Requirements

### 1. Installation
1. Clone the repository and run `npm install`.
2. Copy `.env.example` to `.env`.

### 2. Database Bootstrap
1. Generate Prisma Client: `npx prisma generate`
2. Sync schema to dev database: `npx prisma db push`
3. Generate the 20-vehicle Enterprise Fleet Seed: 
```bash
npx prisma db seed
```
*(Default Admin Login: `admin@islanddrive.com` / `admin123`)*

### 3. Environment Variables

To fully utilize the production webhooks, configure your `.env`:

**Authentication**
- `AUTH_SECRET`: Generate this via `openssl rand -base64 32` or `npx auth secret`.

**Stripe Integrations**
- `STRIPE_SECRET_KEY`: Standard Stripe testing keys (`sk_test...`).
- `STRIPE_WEBHOOK_SECRET`: Secure webhook verification key (`whsec_...`).
> 💡 **MOCK MODE FALLBACK**: If you skip configuring Stripe, the platform automatically detects missing keys and safely redirects customers to an internal mock-flow that commits safe atomic transactions directly without prompting a card wall.

**Google Sheets (Operational Syncing)**
- `GOOGLE_SPREADSHEET_ID`: Standard G-Suite document ID to mirror bookings securely without logging into the dashboard.

### 4. Running the Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to browse the platform. Your browser will automatically redirect to the appropriate locale (defaulting to `/en`).
