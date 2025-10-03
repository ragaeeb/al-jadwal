# Contributing to Al-Jadwal

Thank you for your interest in contributing to Al-Jadwal! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/al-jadwal.git
cd al-jadwal

# Add upstream remote
git remote add upstream https://github.com/ragaeeb/al-jadwal.git
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Set Up Environment

```bash
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

### 4. Run Development Server

```bash
bun dev
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

- Write clean, maintainable code
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run linter
bun lint

# Format code
bun format

# Test manually
bun dev
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

#### Commit Message Format

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add support for new Islamic library
fix: resolve authentication redirect loop
docs: update API documentation
refactor: extract validation logic into utils
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Code Style Guidelines

### TypeScript

- Use arrow functions for components and utilities
- Prefer `const` over `let`
- Use TypeScript strict mode
- Define types for all parameters and return values
- Avoid `any` type

```typescript
// Good
const fetchBook = async (id: string): Promise<Book> => {
  const response = await fetch(`/api/books/${id}`);
  return response.json();
};

// Avoid
function fetchBook(id) {
  return fetch(`/api/books/${id}`).then(r => r.json());
}
```

### React Components

- Use functional components with hooks
- Extract complex logic into custom hooks
- Keep components small and focused
- Use proper prop types

```typescript
// Good
interface BookCardProps {
  book: Book;
  onSelect: (id: string) => void;
}

const BookCard = ({ book, onSelect }: BookCardProps) => {
  return (
    <Card onClick={() => onSelect(book.id)}>
      <h3>{book.title}</h3>
    </Card>
  );
};

// Avoid large multi-purpose components
```

### File Organization

```
src/
├── app/              # Next.js app router
│   ├── api/         # API routes
│   ├── auth/        # Auth pages
│   └── dashboard/   # Dashboard pages
├── components/       # React components
│   ├── ui/          # shadcn components
│   └── features/    # Feature-specific components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and libraries
│   ├── api-client.ts
│   ├── utils.ts
│   └── validation.ts
└── types/           # TypeScript types
```

### Naming Conventions

- Components: PascalCase (`BookCard`, `ApiKeyList`)
- Files: kebab-case (`book-card.tsx`, `api-key-list.tsx`)
- Hooks: camelCase with `use` prefix (`useBooks`, `useApiKeys`)
- Utilities: camelCase (`formatDate`, `validateEmail`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRIES`)

## Project Structure Guidelines

### Components

- Place reusable UI components in `src/components/ui/`
- Place feature-specific components in `src/components/features/`
- Keep components under 200 lines
- Extract complex logic into hooks or utilities

### API Routes

- One endpoint per file
- Use proper HTTP methods
- Implement error handling
- Add request validation
- Return consistent response formats

```typescript
// Good structure
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const data = await fetchData(user.id);
    return NextResponse.json({ data });
  } catch (error) {
    return handleApiError(error);
  }
}
```

### Utilities

- Keep functions pure when possible
- Write small, testable functions
- Add JSDoc comments
- Export from index files

```typescript
/**
 * Formats a date string to a readable format
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};
```

## Adding New Features

### 1. Provider Integration

To add a new Islamic library provider:

1. Add type to `src/types/index.ts`:
```typescript
export type Library = 'shamela.ws' | 'ketabonline.com' | 'turath.io' | 'newprovider.com';
```

2. Add provider info to `src/lib/constants.ts`:
```typescript
export const LIBRARIES = {
  // ...
  'newprovider.com': {
    label: 'New Provider',
    description: 'Description',
    url: 'https://newprovider.com'
  }
};
```

3. Implement fetch function in `src/lib/providers.ts`:
```typescript
const fetchFromNewProvider = async (bookId: string): Promise<Book> => {
  // Implementation
};
```

4. Update switch statement:
```typescript
export const fetchBookFromProvider = async (provider: Library, bookId: string) => {
  switch (provider) {
    // ...
    case 'newprovider.com':
      return fetchFromNewProvider(bookId);
  }
};
```

### 2. New API Endpoint

1. Create route file in `src/app/api/`
2. Implement HTTP methods
3. Add authentication/authorization
4. Add validation
5. Document in API_DOCUMENTATION.md

### 3. New Dashboard Feature

1. Create page in `src/app/dashboard/`
2. Add to sidebar navigation
3. Implement with server components when possible
4. Add client components for interactivity
5. Update types as needed

## Testing

### Manual Testing

- Test all user flows
- Test edge cases
- Test error handling
- Test on multiple browsers
- Test authentication
- Test API endpoints

See TESTING.md for detailed testing guide.

## Documentation

### Update Documentation

When making changes, update:

- README.md - Project overview
- API_DOCUMENTATION.md - API changes
- SETUP.md - Setup instructions
- Code comments - Complex logic

### JSDoc Comments

Add JSDoc for exported functions:

```typescript
/**
 * Creates a new app with library access
 * @param data - App creation data
 * @param data.name - App name
 * @param data.libraries - Array of library providers
 * @returns Created app object
 * @throws {AppError} When validation fails
 */
export const createApp = async (data: CreateAppData): Promise<App> => {
  // Implementation
};
```

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Linter passes (`bun lint`)
- [ ] Code is formatted (`bun format`)
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] No console.logs or debug code

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes (or documented)
```

### Review Process

1. Maintainers will review your PR
2. Address feedback and requested changes
3. Once approved, PR will be merged
4. Delete your feature branch

## Issues

### Reporting Bugs

Include:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, browser, versions)
- Screenshots/logs if applicable

### Requesting Features

Include:
- Clear description
- Use case
- Proposed solution (optional)
- Alternatives considered (optional)

## Questions?

- Open an issue for questions
- Join discussions on GitHub
- Email: ragaeeb@gmail.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.