# Al-Jadwal API Documentation

## Base URL

```
Production: https://api.al-jadwal.com
Development: http://localhost:3000
```

## Authentication

All API requests require authentication via Bearer token in the Authorization header:

```
Authorization: Bearer aj_your_api_key_here
```

## Rate Limits

- 100 requests per minute per API key
- 10,000 requests per day per API key

## Endpoints

### Books API

#### Get Book

Retrieve a book from a specific Islamic library provider.

**Endpoint:** `GET /api/v1/books/:id`

**Parameters:**
- `id` (path, required): Book identifier
- `provider` (query, required): Library provider (`shamela.ws`, `ketabonline.com`, `turath.io`)

**Headers:**
- `Authorization`: Bearer token (required)
- `Content-Type`: application/json

**Example Request:**

```bash
curl -X GET "https://api.al-jadwal.com/api/v1/books/333?provider=shamela.ws" \
  -H "Authorization: Bearer aj_live_abc123xyz" \
  -H "Content-Type: application/json"
```

**Example Response (200 OK):**

```json
{
  "book": {
    "id": "333",
    "title": "Sahih Al-Bukhari",
    "author": "Muhammad ibn Ismail al-Bukhari",
    "content": "Full book content...",
    "metadata": {
      "publisher": "Dar Ibn Kathir",
      "year": "1423",
      "pages": 1200
    }
  }
}
```

**Error Responses:**

```json
// 401 Unauthorized - Missing or invalid API key
{
  "error": "Invalid API key"
}

// 403 Forbidden - No access to provider
{
  "error": "No access to shamela.ws"
}

// 404 Not Found - Book not found
{
  "error": "Book not found"
}

// 429 Too Many Requests
{
  "error": "Rate limit exceeded. Please try again later"
}

// 500 Internal Server Error
{
  "error": "Internal server error"
}
```

## Supported Providers

### Shamela (shamela.ws)

Comprehensive Islamic library with thousands of classical and contemporary texts.

**Features:**
- 10,000+ books
- Full-text search
- Multiple formats
- Regular updates

**Book ID Format:** Numeric (e.g., `333`, `1234`)

### Ketab Online (ketabonline.com)

Islamic books and resources with modern interface.

**Features:**
- 5,000+ books
- Categorized content
- Multi-language support
- Modern interface

**Book ID Format:** Alphanumeric (e.g., `book-123`, `islam-001`)

### Turath (turath.io)

Heritage Islamic texts and manuscripts.

**Features:**
- Historical manuscripts
- Rare texts
- Scholarly editions
- High-quality scans

**Book ID Format:** UUID (e.g., `550e8400-e29b-41d4-a716-446655440000`)

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | No access to requested resource |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Service temporarily unavailable |

## SDK Examples

### JavaScript/TypeScript

```typescript
const AL_JADWAL_API_KEY = 'aj_your_api_key';
const BASE_URL = 'https://api.al-jadwal.com';

async function getBook(bookId: string, provider: string) {
  const response = await fetch(
    `${BASE_URL}/api/v1/books/${bookId}?provider=${provider}`,
    {
      headers: {
        'Authorization': `Bearer ${AL_JADWAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}

// Usage
const book = await getBook('333', 'shamela.ws');
console.log(book.title);
```

### Python

```python
import requests

AL_JADWAL_API_KEY = 'aj_your_api_key'
BASE_URL = 'https://api.al-jadwal.com'

def get_book(book_id: str, provider: str):
    response = requests.get(
        f'{BASE_URL}/api/v1/books/{book_id}',
        params={'provider': provider},
        headers={
            'Authorization': f'Bearer {AL_JADWAL_API_KEY}',
            'Content-Type': 'application/json',
        }
    )
    response.raise_for_status()
    return response.json()

# Usage
book = get_book('333', 'shamela.ws')
print(book['book']['title'])
```

### Go

```go
package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

const (
    alJadwalAPIKey = "aj_your_api_key"
    baseURL        = "https://api.al-jadwal.com"
)

type Book struct {
    ID       string                 `json:"id"`
    Title    string                 `json:"title"`
    Author   string                 `json:"author"`
    Content  string                 `json:"content"`
    Metadata map[string]interface{} `json:"metadata"`
}

type BookResponse struct {
    Book Book `json:"book"`
}

func getBook(bookID, provider string) (*Book, error) {
    url := fmt.Sprintf("%s/api/v1/books/%s?provider=%s", 
        baseURL, bookID, provider)
    
    req, err := http.NewRequest("GET", url, nil)
    if err != nil {
        return nil, err
    }
    
    req.Header.Set("Authorization", "Bearer "+alJadwalAPIKey)
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }
    
    var bookResp BookResponse
    err = json.Unmarshal(body, &bookResp)
    if err != nil {
        return nil, err
    }
    
    return &bookResp.Book, nil
}

func main() {
    book, err := getBook("333", "shamela.ws")
    if err != nil {
        panic(err)
    }
    fmt.Println(book.Title)
}
```

### PHP

```php
<?php

class AlJadwalClient {
    private $apiKey;
    private $baseUrl;

    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
        $this->baseUrl = 'https://api.al-jadwal.com';
    }

    public function getBook($bookId, $provider) {
        $url = sprintf(
            '%s/api/v1/books/%s?provider=%s',
            $this->baseUrl,
            $bookId,
            $provider
        );

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->apiKey,
            'Content-Type: application/json',
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200) {
            throw new Exception("API request failed: " . $httpCode);
        }

        return json_decode($response, true);
    }
}

// Usage
$client = new AlJadwalClient('aj_your_api_key');
$book = $client->getBook('333', 'shamela.ws');
echo $book['book']['title'];
```

## Best Practices

### 1. Error Handling

Always implement proper error handling:

```typescript
try {
  const book = await getBook('333', 'shamela.ws');
  console.log(book);
} catch (error) {
  if (error.status === 429) {
    // Implement exponential backoff
    await sleep(1000);
    retry();
  } else if (error.status === 401) {
    // Check API key
    console.error('Invalid API key');
  } else {
    // Handle other errors
    console.error('Request failed:', error);
  }
}
```

### 2. Caching

Cache responses to reduce API calls:

```typescript
const cache = new Map();

async function getCachedBook(bookId: string, provider: string) {
  const cacheKey = `${provider}:${bookId}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const book = await getBook(bookId, provider);
  cache.set(cacheKey, book);
  
  return book;
}
```

### 3. Rate Limiting

Implement client-side rate limiting:

```typescript
import pLimit from 'p-limit';

const limit = pLimit(10); // Max 10 concurrent requests

const promises = bookIds.map(id =>
  limit(() => getBook(id, 'shamela.ws'))
);

const books = await Promise.all(promises);
```

### 4. Retry Logic

Implement exponential backoff for failed requests:

```typescript
async function getBookWithRetry(
  bookId: string, 
  provider: string, 
  maxRetries = 3
) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await getBook(bookId, provider);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000);
    }
  }
}
```

## Webhooks (Coming Soon)

Receive notifications for events:
- Book updates
- New books added
- API key usage alerts

## Changelog

### v1.0.0 (2025-01-01)
- Initial release
- Support for Shamela, Ketab Online, and Turath
- Basic book retrieval endpoint
