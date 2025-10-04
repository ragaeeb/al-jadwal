# Al-Jadwal Setup Instructions

## Database Setup

### 1. Supabase Configuration

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/schema.sql`
4. Execute the SQL to create tables, policies, and functions

### 2. Get Supabase Credentials

1. Go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key
3. Add them to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## Unkey Setup

### 1. Create Unkey Account

1. Go to https://unkey.dev and create an account
2. Create a new API in the dashboard

### 2. Get Unkey Credentials

1. Copy your **API ID** from the API settings
2. Create a **Root Key** with permissions:
   - `api.*.create_key`
   - `api.*.delete_key`
   - `api.*.read_key`
3. Add credentials to `.env.local`:
   ```
   UNKEY_ROOT_KEY=unkey_xxxxx
   UNKEY_API_ID=api_xxxxx
   ```

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Unkey
UNKEY_ROOT_KEY=your-unkey-root-key
UNKEY_API_ID=your-unkey-api-id
```

## Installation

```bash
bun install
```

## Development

```bash
bun dev
```

Visit http://localhost:3000

## Features Implemented

- ✅ User authentication (signup/login)
- ✅ Protected dashboard routes
- ✅ App management (CRUD operations)
- ✅ Library selection (Shamela, Ketab Online, Turath)
- ✅ API key generation with Unkey
- ✅ API key management
- ✅ Book proxy API endpoint
- ✅ Row Level Security policies

## API Usage

### Authenticate

All API requests require a Bearer token in the Authorization header:

```bash
Authorization: Bearer aj_your_api_key
```

### Get a Book

```bash
curl -X GET "http://localhost:3000/api/v1/books/333?provider=shamela.ws" \
  -H "Authorization: Bearer aj_your_api_key"
```

### Providers

- `shamela.ws` - Shamela Library
- `ketabonline.com` - Ketab Online
- `turath.io` - Turath Heritage

## Database Schema

### Tables

- `apps` - User applications with library access
- `api_keys` - Generated API keys with Unkey integration

### Row Level Security

All tables have RLS policies ensuring users can only access their own data.

## Future Extensibility

The dashboard structure supports future features:
- Social media integrations
- Scheduled posting
- Analytics dashboard
- Webhook management
- Usage tracking

## Notes

- Provider API integrations in `src/lib/providers.ts` are mocked - replace with actual API calls
- API key prefix is `aj_` (Al-Jadwal)
- All routes use server-side auth checks
- Middleware handles route protection
