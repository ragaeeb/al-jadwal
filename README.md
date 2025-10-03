# Al-Jadwal

[![wakatime](https://wakatime.com/badge/user/a0b906ce-b8e7-4463-8bce-383238df6d4b/project/5125a46b-9438-4ab1-9064-4e5e0e8d748c.svg)](https://wakatime.com/badge/user/a0b906ce-b8e7-4463-8bce-383238df6d4b/project/5125a46b-9438-4ab1-9064-4e5e0e8d748c)
[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/al-jadwal)](https://al-jadwal.vercel.app)
[![codecov](https://codecov.io/gh/ragaeeb/al-jadwal/graph/badge.svg?token=A2E06C7QXO)](https://codecov.io/gh/ragaeeb/al-jadwal)
[![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label&color=blue)](https://www.typescriptlang.org)
[![Node.js CI](https://github.com/ragaeeb/al-jadwal/actions/workflows/build.yml/badge.svg)](https://github.com/ragaeeb/al-jadwal/actions/workflows/build.yml)
![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![GitHub License](https://img.shields.io/github/license/ragaeeb/al-jadwal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Islamic API-first platform for accessing Islamic libraries (Shamela, Ketab Online, Turath) through a unified API.

## Features

- 🔐 **Authentication** - Secure signup/login with Supabase
- 📚 **Library Access** - Connect to multiple Islamic text libraries
- 🔑 **API Key Management** - Generate and manage API keys with Unkey
- 🛡️ **Row Level Security** - Data isolation per user
- 🎨 **Modern UI** - Built with Next.js 15, React 19, Tailwind CSS, shadcn/ui, and smoothui
- 🚀 **Type-Safe** - Full TypeScript support
- 📦 **Fast Runtime** - Powered by Bun

## Quick Start

### Prerequisites

- Bun >= 1.2.23
- Supabase account
- Unkey account

### Installation

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your credentials
```

### Database Setup

1. Go to your Supabase project SQL Editor
2. Run the SQL from `supabase/schema.sql`

### Configuration

Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
UNKEY_ROOT_KEY=your-unkey-root-key
UNKEY_API_ID=your-unkey-api-id
```

See [SETUP.md](./SETUP.md) for detailed instructions.

### Development

```bash
bun dev
```

Visit http://localhost:3000

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── auth/         # Authentication pages
│   ├── dashboard/    # Protected dashboard
│   └── page.tsx      # Root page
├── components/       # React components
├── lib/              # Utilities and clients
└── types/            # TypeScript definitions
```

## API Usage

### Authentication

Include your API key in requests:

```bash
curl -X GET "https://api.al-jadwal.com/v1/books/333?provider=shamela.ws" \
  -H "Authorization: Bearer aj_your_api_key"
```

### Supported Providers

- `shamela.ws` - Shamela Library
- `ketabonline.com` - Ketab Online
- `turath.io` - Turath Heritage

### Example Response

```json
{
  "book": {
    "id": "333",
    "title": "Book Title",
    "author": "Author Name",
    "content": "...",
    "metadata": {}
  }
}
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Runtime**: Bun
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **API Keys**: Unkey
- **UI**: Tailwind CSS, shadcn/ui, smoothui, Motion
- **Icons**: Lucide React

## Architecture

### Flow

1. User signs up/logs in via Supabase
2. Creates an app and selects libraries
3. Generates API key via Unkey
4. Makes requests to `/api/v1/books/:id?provider=X`
5. Backend verifies key and proxies request to provider

### Security

- Row Level Security on all tables
- API key verification with Unkey
- Scope-based library access control
- Server-side auth checks on all routes

## Future Extensions

- Social media integrations (Twitter, Telegram)
- Scheduled Islamic content posting
- Analytics dashboard
- Webhook support
- Usage tracking and rate limiting

## Scripts

```bash
bun dev        # Start development server
bun build      # Build for production
bun start      # Start production server
bun lint       # Run Biome linter
bun format     # Format code with Biome
```

## License

MIT

## Author

Ragaeeb Haq
