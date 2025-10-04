# Testing Guide

## Manual Testing Flow

### 1. Authentication Flow

#### Sign Up
```bash
1. Navigate to http://localhost:3000
2. Should redirect to /auth/login
3. Click "Sign up" link
4. Enter email and password (min 6 chars)
5. Slide to sign up
6. Should redirect to /dashboard
```

#### Sign In
```
1. Navigate to http://localhost:3000/auth/login
2. Enter credentials
3. Slide to log in
4. Should redirect to /dashboard
```

#### Sign Out
```
1. From dashboard, click "Sign Out" in sidebar
2. Should redirect to /auth/login
```

### 2. App Management Flow

#### Create App
```
1. From dashboard, click "Create App"
2. Enter app name (required)
3. Enter description (optional)
4. Select at least one library (Shamela, Ketab, or Turath)
5. Click "Create App"
6. Should redirect to /dashboard/apps
7. New app should appear in list
```

#### View Apps
```
1. Navigate to /dashboard/apps
2. Should see list of all apps
3. Each card shows: name, description, libraries, created date
```

#### View App Details
```
1. Click on any app card
2. Should navigate to /dashboard/apps/[id]
3. Should see: app details, libraries, API keys section, usage example
```

#### Delete App
```
1. From app details page, click trash icon
2. Confirm deletion in dialog
3. Should redirect to /dashboard/apps
4. App should be removed from list
```

### 3. API Key Management Flow

#### Create API Key
```
1. Navigate to /dashboard/api-keys
2. Click "Create API Key"
3. Select an app from dropdown
4. Enter key name
5. Click "Create"
6. Should see new key in list with full key value (only shown once)
7. Copy key immediately (can't see again)
```

#### View API Keys
```
1. Navigate to /dashboard/api-keys
2. Should see all keys grouped by app
3. Each key shows: name, prefix, created date, last used date
```

#### Delete API Key
```
1. From API keys page, click trash icon on any key
2. Confirm deletion
3. Key should be removed from list
4. Key should be revoked in Unkey
```

### 4. API Usage Flow

#### Make Book Request
```bash
# Get book from Shamela
curl -X GET "http://localhost:3000/api/v1/books/333?provider=shamela.ws" \
  -H "Authorization: Bearer aj_your_actual_key" \
  -H "Content-Type: application/json"

# Expected response:
{
  "book": {
    "id": "333",
    "title": "Book Title",
    "author": "Author Name",
    "content": "...",
    "metadata": {}
  }
}

# Test without API key (should fail)
curl -X GET "http://localhost:3000/api/v1/books/333?provider=shamela.ws"

# Expected response:
{
  "error": "Missing API key"
}

# Test with invalid key (should fail)
curl -X GET "http://localhost:3000/api/v1/books/333?provider=shamela.ws" \
  -H "Authorization: Bearer invalid_key"

# Expected response:
{
  "error": "Invalid API key"
}

# Test without library access (should fail)
curl -X GET "http://localhost:3000/api/v1/books/333?provider=ketabonline.com" \
  -H "Authorization: Bearer aj_key_without_ketab_access"

# Expected response:
{
  "error": "No access to ketabonline.com"
}
```

## Test Scenarios

### Edge Cases

1. **Empty States**
   - Dashboard with no apps
   - Apps page with no apps
   - API keys page with no keys
   - App details with no API keys

2. **Validation**
   - Create app without name (should fail)
   - Create app without libraries (should fail)
   - Create API key without app selection (should fail)
   - Create API key without name (should fail)

3. **Authorization**
   - Access dashboard without login (should redirect)
   - Access another user's app (should fail)
   - Access another user's API key (should fail)
   - Use API key for unauthorized library (should fail)

4. **Error Handling**
   - Network errors
   - Database errors
   - Unkey API errors
   - Provider API errors

## Database Verification

### Check Tables
```sql
-- View all apps
SELECT * FROM apps;

-- View all API keys
SELECT * FROM api_keys;

-- View apps with key counts
SELECT 
    apps.id,
    apps.name,
    apps.libraries,
    COUNT(api_keys.id) as key_count
FROM apps
LEFT JOIN api_keys ON apps.id = api_keys.app_id
GROUP BY apps.id;
```

### Check RLS Policies
```sql
-- Test as different user (should only see own data)
SELECT * FROM apps WHERE user_id = 'user_id_here';
```

## API Testing with Postman/Insomnia

### Collection Setup

#### Environment Variables
```json
{
  "base_url": "http://localhost:3000",
  "api_key": "aj_your_key_here"
}
```

#### Requests

#### 1. List Apps**

```http
GET {{base_url}}/api/apps
```

**2. Create App**
```
POST {{base_url}}/api/apps
Content-Type: application/json

{
  "name": "Test App",
  "description": "Test description",
  "libraries": ["shamela.ws", "turath.io"]
}
```

**3. Get App**
```
GET {{base_url}}/api/apps/{{app_id}}
```

**4. Update App**
```
PATCH {{base_url}}/api/apps/{{app_id}}
Content-Type: application/json

{
  "name": "Updated Name",
  "libraries": ["shamela.ws", "ketabonline.com", "turath.io"]
}
```

**5. Delete App**
```
DELETE {{base_url}}/api/apps/{{app_id}}
```

**6. List API Keys**
```
GET {{base_url}}/api/api-keys
```

**7. Create API Key**
```
POST {{base_url}}/api/api-keys
Content-Type: application/json

{
  "app_id": "{{app_id}}",
  "name": "Production Key"
}
```

**8. Delete API Key**
```
DELETE {{base_url}}/api/api-keys/{{key_id}}
```

**9. Get Book**
```
GET {{base_url}}/api/v1/books/333?provider=shamela.ws
Authorization: Bearer {{api_key}}
```

## Performance Testing

### Load Testing (Artillery/k6)
```yaml
# artillery.yml
config:
  target: http://localhost:3000
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "API Request Flow"
    flow:
      - get:
          url: "/api/v1/books/333?provider=shamela.ws"
          headers:
            Authorization: "Bearer aj_test_key"
```

## Monitoring

### Check Logs
```bash
# Development logs
bun dev

# Check for errors
grep -i error logs/*.log

# Check API response times
grep -i "GET /api" logs/*.log
```

### Database Monitoring
```sql
-- Check query performance
SELECT * FROM pg_stat_statements 
ORDER BY total_exec_time DESC 
LIMIT 10;

-- Check connection count
SELECT count(*) FROM pg_stat_activity;
```

## Common Issues

### Issue: API key not working
- Check if key exists in database
- Verify key in Unkey dashboard
- Check app has correct library scopes
- Verify Authorization header format

### Issue: RLS policies blocking access
- Verify user is authenticated
- Check user_id matches in database
- Review policy definitions

### Issue: Provider requests failing
- Verify provider API is accessible
- Check provider response format
- Review error logs

### Issue: Redirect loops
- Clear cookies
- Check middleware logic
- Verify Supabase session

## Security Testing

### Test Cases
1. SQL injection attempts
2. XSS in form inputs
3. CSRF protection
4. Rate limiting (if implemented)
5. API key exposure in logs
6. Unauthorized access attempts
7. Session hijacking
8. Cookie security
