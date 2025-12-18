This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Clerk account (for authentication)
- OpenAI API key (for AI features)

### Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Fill in your environment variables:
   - **Clerk Keys**: Get these from [Clerk Dashboard](https://dashboard.clerk.com)
     - For development: Use keys with `pk_test_` and `sk_test_` prefixes
     - For production: Use keys with `pk_live_` and `sk_live_` prefixes
   - **Database**: Your PostgreSQL connection string
   - **OpenAI**: Your OpenAI API key for AI features

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Database Setup

```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Production Deployment

**Important**: Before deploying to production:

1. Create a production instance in [Clerk Dashboard](https://dashboard.clerk.com)
2. Update your environment variables with production keys (`pk_live_` and `sk_live_` prefixes)
3. Configure OAuth credentials for social sign-ins
4. Set up required DNS records for your domain

The warning about development keys will disappear once you use production keys.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
