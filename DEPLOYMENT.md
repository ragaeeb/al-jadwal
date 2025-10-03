# Deployment Guide

## Prerequisites

- Supabase project (production)
- Unkey account (production)
- Vercel account (recommended) or any Node.js host
- Custom domain (optional)

## Supabase Production Setup

### 1. Create Production Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose organization and region
4. Set strong database password
5. Wait for project to initialize

### 2. Run Database Migrations

1. Navigate to SQL Editor
2. Execute `supabase/schema.sql`
3. Verify tables and policies created:
   ```sql
   \dt  -- List tables
   SELECT * FROM pg_policies;  -- View policies
   ```

### 3. Configure Auth Settings

1. Go to Authentication → Settings
2. Set Site URL to your production domain
3. Add Redirect URLs:
   - `https://yourdomain.com/auth/callback`
   - `https://yourdomain.com`
4. Enable email confirmations (recommended)
5. Configure SMTP settings for emails

### 4. Get Production Credentials

1. Settings → API
2. Copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key (store securely)

## Unkey Production Setup

### 1. Create Production API

1. Go to https://unkey.dev/dashboard
2. Create new API
3. Name it "Al-Jadwal Production"

### 2. Generate Root Key

1. Navigate to Settings → Root Keys
2. Click "Create Root Key"
3. Select permissions:
   - `api.*.create_key`
   - `api.*.delete_key`
   - `api.*.read_key`
   - `api.*.update_key`
4. Save key securely (only shown once)

### 3. Configure Rate Limiting (Optional)

1. Go to API Settings
2. Set rate limits per key:
   - Requests per second
   - Daily request limit
3. Enable analytics

## Vercel Deployment

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Configure Environment Variables

Create `.env.production`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
UNKEY_ROOT_KEY=your-production-root-key
UNKEY_API_ID=your-production-api-id
```

### 3. Deploy to Vercel

```bash
# Login
vercel login

# Deploy
vercel --prod

# Or link to existing project
vercel link
vercel --prod
```

### 4. Set Environment Variables in Vercel

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add each variable:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `UNKEY_ROOT_KEY`
   - `UNKEY_API_ID`
3. Select "Production" environment
4. Redeploy: `vercel --prod`

### 5. Configure Custom Domain

1. Vercel Dashboard → Project → Settings → Domains
2. Add your domain
3. Configure DNS:
   ```
   A     @       76.76.21.21
   CNAME www     cname.vercel-dns.com
   ```
4. Wait for SSL certificate (automatic)

## Alternative Deployment Options

### Docker

Create `Dockerfile`:

```dockerfile
FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 3000

CMD ["bun", "start"]
```

Build and run:

```bash
docker build -t al-jadwal .
docker run -p 3000:3000 --env-file .env.production al-jadwal
```

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Add environment variables
railway variables set NEXT_PUBLIC_SUPABASE_URL=xxx
railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
railway variables set UNKEY_ROOT_KEY=xxx
railway variables set UNKEY_API_ID=xxx

# Deploy
railway up
```

### DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build command: `bun install && bun run build`
3. Configure run command: `bun start`
4. Add environment variables
5. Deploy

## Post-Deployment Checklist

### 1. Verify Deployment

- [ ] Site loads at production URL
- [ ] Authentication works
- [ ] Dashboard accessible
- [ ] Can create apps
- [ ] Can generate API keys
- [ ] API endpoints respond correctly

### 2. Test API

```bash
# Test book endpoint
curl -X GET "https://yourdomain.com/api/v1/books/333?provider=shamela.ws" \
  -H "Authorization: Bearer YOUR_PRODUCTION_KEY"
```

### 3. Security Checks

- [ ] HTTPS enabled
- [ ] Secure headers configured
- [ ] API keys work correctly
- [ ] RLS policies active
- [ ] No sensitive data in logs
- [ ] Rate limiting configured (if applicable)

### 4. Monitoring Setup

- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (Sentry)
- [ ] Configure uptime monitoring
- [ ] Set up database backups

### 5. DNS Configuration

- [ ] A records configured
- [ ] CNAME records configured
- [ ] SSL certificate active
- [ ] Redirects working (www → non-www)

## Environment Variables Reference

### Required
```env
NEXT_PUBLIC_SUPABASE_URL=       # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Supabase anon key
UNKEY_ROOT_KEY=                 # Unkey root key
UNKEY_API_ID=                   # Unkey API ID
```

### Optional
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Monitoring & Maintenance

### 1. Error Tracking

#### Sentry Setup

```bash
bun add @sentry/nextjs
```

Create `sentry.client.config.ts`:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### 2. Analytics

- Vercel Analytics (automatic)
- Unkey Analytics (built-in)
- Custom analytics via Supabase

### 3. Database Backups

Supabase automatic backups:
- Daily backups (retained 7 days)
- Point-in-time recovery
- Manual backups on demand

### 4. Logging

Monitor logs:
- Vercel deployment logs
- Supabase database logs
- Unkey API logs

## Performance Optimization

### 1. Caching

Add caching headers:

```typescript
// next.config.js
export default {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=60' }
        ],
      },
    ];
  },
};
```

### 2. CDN Configuration

Vercel automatically provides:
- Edge caching
- Global CDN
- Automatic image optimization

### 3. Database Optimization

```sql
-- Add indexes for performance
CREATE INDEX idx_apps_user_id ON apps(user_id);
CREATE INDEX idx_api_keys_app_id ON api_keys(app_id);
CREATE INDEX idx_api_keys_key_id ON api_keys(key_id);
```

## Rollback Procedure

### Vercel

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

### Database

```sql
-- Restore from backup
-- Via Supabase Dashboard → Database → Backups → Restore
```

## Troubleshooting

### Common Issues

**Issue: 500 errors**
- Check environment variables
- Review Vercel logs
- Verify database connection

**Issue: Authentication fails**
- Check Supabase auth settings
- Verify redirect URLs
- Check cookie domain settings

**Issue: API keys not working**
- Verify Unkey credentials
- Check API key scopes
- Review Unkey logs

**Issue: Database queries failing**
- Check RLS policies
- Verify user authentication
- Review query permissions

## Security Hardening

### 1. Headers Configuration

```typescript
// next.config.js
export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
        ],
      },
    ];
  },
};
```

### 2. API Rate Limiting

Implement with Unkey or Vercel Edge Config:

```typescript
// middleware.ts
import { Ratelimit } from '@unkey/ratelimit';

const ratelimit = new Ratelimit({
  rootKey: process.env.UNKEY_ROOT_KEY!,
  namespace: 'api',
  limit: 100,
  duration: '1m',
});
```

### 3. CORS Configuration

```typescript
// middleware.ts
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL!,
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
```

## Scaling Considerations

### Database
- Upgrade Supabase plan for more connections
- Add read replicas
- Implement connection pooling

### API
- Enable Vercel Edge Functions
- Add caching layer (Redis)
- Implement queue system for heavy operations

### Monitoring Thresholds
- Response time < 200ms
- Error rate < 1%
- Uptime > 99.9%
- Database connections < 80% capacity

## Cost Optimization

### Supabase
- Start with Free tier (500MB, 50GB bandwidth)
- Pro plan: $25/mo (8GB, 250GB bandwidth)
- Monitor usage via dashboard

### Unkey
- Free tier: 10k verifications/month
- Pro: $25/mo (100k verifications)
- Monitor usage via analytics

### Vercel
- Hobby: Free (100GB bandwidth)
- Pro: $20/mo/member (1TB bandwidth)
- Monitor via analytics dashboard

## Maintenance Schedule

### Daily
- [ ] Check error logs
- [ ] Review API usage
- [ ] Monitor uptime

### Weekly
- [ ] Review analytics
- [ ] Check database performance
- [ ] Update dependencies (security patches)

### Monthly
- [ ] Full system audit
- [ ] Backup verification
- [ ] Performance review
- [ ] Cost analysis

## Support Resources

- Supabase: https://supabase.com/docs
- Unkey: https://unkey.dev/docs
- Vercel: https://vercel.com/docs
- Next.js: https://nextjs.org/docs