# Contributing Guidelines

Thank you for your interest in contributing to this portfolio project! This document provides guidelines and best practices for development.

## Development Setup

### Prerequisites

- Node.js 20.9 or higher
- npm or pnpm package manager
- Git

### Getting Started

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/keshav1998/magic-portfolio.git
   cd magic-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Code Quality Standards

This project follows strict code quality standards to ensure maintainability and consistency.

### TypeScript

- **Always use TypeScript** - No `any` types
- **Define interfaces** for all component props
- **Use type inference** where appropriate
- **Strict mode enabled** - No implicit any

**Example:**
```typescript
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  )
}
```

### Immutability

**ALWAYS use spread operators** - Never mutate objects or arrays directly.

```typescript
// ✅ GOOD: Immutable updates
const updatedUser = { ...user, name: 'New Name' }
const updatedArray = [...items, newItem]

// ❌ BAD: Direct mutation
user.name = 'New Name'
items.push(newItem)
```

### Component Structure

- **Functional components only** - No class components
- **Custom hooks** for reusable logic
- **Props destructuring** in function signature
- **Default values** for optional props

### Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `BlogPost.tsx`)
- **Hooks**: camelCase with `use` prefix (`useDebounce.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase with descriptive names (`BlogPost`, `UserProfile`)

### File Organization

```
src/
├── app/              # Next.js pages and routes
├── components/       # Reusable components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
├── types/           # TypeScript type definitions
└── resources/       # Configuration and content
```

## Code Formatting

### Biome (Primary)

This project uses **Biome** for fast, consistent formatting.

```bash
# Format all files
npm run biome-write

# Check formatting
npx @biomejs/biome check .
```

### ESLint

ESLint enforces code quality rules.

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

## Testing

### Before Committing

Run these checks before committing:

```bash
# 1. Format code
npm run biome-write

# 2. Lint code
npm run lint

# 3. Type check
npx tsc --noEmit

# 4. Build project
npm run build
```

### Continuous Integration

All PRs automatically run:
- Code formatting checks
- Linting
- Type checking
- Build verification
- Bundle size analysis

## Commit Guidelines

### Conventional Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples:**
```bash
feat(blog): add code syntax highlighting
fix(nav): resolve mobile menu overflow issue
docs: update installation instructions
refactor: migrate to Biome v2 for formatting
perf(images): optimize avatar loading
```

### Commit Message Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep first line under 72 characters
- Reference issues/PRs when applicable (`fixes #123`)

## Pull Request Process

### Before Submitting

1. **Update from main**
   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   ```

2. **Run all checks**
   ```bash
   npm run biome-write
   npm run lint
   npx tsc --noEmit
   npm run build
   ```

3. **Test locally**
   - Verify changes in development mode
   - Test production build
   - Check responsive design

### PR Title

Use Conventional Commits format:
```
feat: add dark mode toggle to navigation
fix: resolve layout shift on blog pages
docs: improve README installation steps
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally in development
- [ ] Tested production build
- [ ] Verified responsive design
- [ ] Checked accessibility

## Screenshots (if applicable)
[Add screenshots]

## Related Issues
Fixes #[issue number]
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainer
3. **Approval** required before merge
4. **Squash and merge** to main

## Development Best Practices

### Performance

- Use Next.js Image component for all images
- Implement lazy loading for heavy components
- Minimize bundle size
- Optimize fonts and assets

### Accessibility

- Use semantic HTML
- Include ARIA labels where needed
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

### SEO

- Use proper heading hierarchy
- Include meta descriptions
- Generate Open Graph images
- Implement structured data

### Security

- Never commit secrets or API keys
- Use environment variables for sensitive data
- Validate all user inputs
- Keep dependencies updated

## Content Guidelines

### Blog Posts

Create MDX files in `src/app/blog/posts/`:

```mdx
---
title: "Your Post Title"
publishedAt: "2026-01-30"
summary: "Brief description"
image: "/images/blog/post-image.jpg"
---

# Your Content Here

Write your post content using Markdown and JSX components.
```

### Projects

Create MDX files in `src/app/work/projects/`:

```mdx
---
title: "Project Name"
publishedAt: "2026-01-30"
summary: "Project description"
image: "/images/projects/project-image.jpg"
team: ["Selene Yu"]
---

# Project Overview

Describe your project with rich content.
```

## Getting Help

- **Issues**: Open an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check [Next.js docs](https://nextjs.org/docs) and [Once UI docs](https://once-ui.com/docs)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on constructive feedback
- Prioritize project goals

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Unprofessional conduct

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (CC BY-NC 4.0 for template code).

---

Thank you for contributing to make this portfolio better! 🚀
