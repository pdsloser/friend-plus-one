# Deployment

## Requirements

- Node.js 22 or compatible runtime for Next.js 15.
- Supabase project with Auth, PostgreSQL, RLS, and Storage enabled.
- Resend API key for production email delivery.
- Vercel project configured with the environment variables below.

## Environment Variables

```text
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
EMAIL_FROM_NAME=朋友加一
EMAIL_FROM_ADDRESS=
CRON_SECRET=
INVITATION_TOKEN_SECRET=
```

## Supabase

Run migrations in order:

```bash
supabase db push
supabase db seed
```

The baseline schema creates the MVP tables, public-safe event view, RLS starting policies, automatic six-seat creation, host workflow RPCs, admin workflow RPCs, and role-grant activation trigger.

## Vercel Cron

Create a scheduled POST request to:

```text
/api/cron/expire
```

Send `x-cron-secret` with the value of `CRON_SECRET`.

## Verification

Before deploying:

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```
