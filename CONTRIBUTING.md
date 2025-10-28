# Contributing to Spexop Design System

Thank you for your interest in contributing to Spexop! This guide will help you get started with development and ensure your contributions align with our design philosophy.

## Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [The Spexop Way](#the-spexop-way)
- [Package Development](#package-development)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 8+ (frozen lockfile enforced)
- Git

### Initial Setup

```bash
# Clone repository
git clone https://github.com/spexop-ui/spexop-packages.git
cd spexop-packages

# Install dependencies (uses frozen lockfile)
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run linting
pnpm lint
```

## Project Structure

This is a pnpm monorepo with the following structure:

```bash
spexop-packages/
├── packages/
│   ├── react/          # 60+ React components
│   ├── theme/          # Theme system with 13 presets
│   ├── cli/            # CLI tool for scaffolding
│   └── tsconfig/       # Shared TypeScript configs
├── apps/
│   └── spexop-docs/    # Documentation site
├── examples/           # Example projects
└── docs/               # Core documentation
```

## The Spexop Way

All contributions must follow our 7 fundamental principles:

1. **Primitives before patterns** - Master Grid, Stack, Container, Spacer first
2. **Borders before shadows** - Use strong 2-3px borders instead of heavy shadows
3. **Typography before decoration** - Font weight (600/700) for hierarchy, not lighter colors
4. **Tokens before magic numbers** - Always use design tokens from @spexop/theme
5. **Composition before complexity** - Build up from simple parts
6. **Standards before frameworks** - Web platform fundamentals
7. **Accessibility before aesthetics** - WCAG AA+ compliance by default

### Design Token Usage

Always use CSS custom properties from the theme system:

```css
/* Correct */
.button {
  padding: var(--theme-spacing-4) var(--theme-spacing-6);
  border: 2px solid var(--theme-border);
  color: var(--theme-text);
  font-weight: var(--theme-font-weight-semibold);
}

/* Wrong - magic numbers and hardcoded values */
.button {
  padding: 16px 24px;
  border: 2px solid #ddd;
  color: #333;
  font-weight: 600;
}
```

## Package Development

### React Package

```bash
cd packages/react

# Watch mode for development
pnpm dev

# Run tests with coverage
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build for production
pnpm build

# Type checking
pnpm type-check
```

**Creating a new component:**

1. Follow the component structure in existing components
2. Include TypeScript types with proper JSDoc comments
3. Use CSS Modules with design tokens
4. Add comprehensive README with examples
5. Include unit tests and accessibility tests
6. Ensure WCAG AA+ compliance

### Theme Package

```bash
cd packages/theme

# Watch mode for development
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Generate theme exports
pnpm generate
```

**Creating a new theme preset:**

1. Define theme in `src/presets/`
2. Follow existing preset structure
3. Ensure WCAG AA+ contrast ratios
4. Generate RGB tokens for transparency support
5. Test across all export formats

### CLI Package

```bash
cd packages/cli

# Watch mode for development
pnpm dev

# Build for production
pnpm build

# Test locally
pnpm link --global
spexop --help
```

## Code Standards

### TypeScript

- **Strict mode enabled** - No `any` types
- **Explicit return types** for exported functions
- **Interface over type** for object shapes
- **Proper JSDoc comments** for all public APIs

```typescript
/**
 * Button component following The Spexop Way
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * ```
 */
export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Visual variant */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Click handler */
  onClick?: () => void;
}
```

### Code Style (Biome)

- **2 spaces** indentation
- **80 character** line width
- **Double quotes** for strings
- **Semicolons** always required
- **Arrow parentheses** always required

Run `pnpm lint:fix` to automatically fix style issues.

### File Naming

- **PascalCase** for components: `Button.tsx`
- **camelCase** for utilities: `cn.ts`
- **kebab-case** for CSS: `Button.module.css`
- **README.md** for documentation

## Testing Guidelines

### Unit Tests

All components must have comprehensive tests:

```typescript
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("supports keyboard navigation", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("tabIndex", "0");
  });
});
```

### Accessibility Tests

Ensure WCAG AA+ compliance:

- Proper ARIA labels and roles
- Keyboard navigation support
- Color contrast ratios (7:1 for text, 3:1 for UI)
- Focus indicators
- Screen reader compatibility

## Documentation

### Component README

Every component must have a README.md with:

1. **Description** - What the component does
2. **Features** - Key capabilities with checkmarks
3. **Installation** - How to install
4. **Usage** - Basic examples
5. **Props API** - All props documented
6. **Design Principles** - Which Spexop principles apply
7. **Accessibility** - WCAG compliance notes
8. **Browser Support** - Compatibility information

### Code Comments

- Use JSDoc for public APIs
- Explain **why**, not **what**
- Keep comments concise and relevant

### Documentation Updates

- Update `/docs/` for major features
- Keep README files current
- Do NOT create status documents or summaries in `/docs-dev/` unless explicitly requested

## Submitting Changes

### Pull Request Process

1. **Fork** the repository
2. **Create branch**: `git checkout -b feat/my-feature`
3. **Make changes** following our standards
4. **Run checks**: Build, test, lint, and type-check
5. **Commit** with conventional commit format
6. **Push**: `git push origin feat/my-feature`
7. **Open PR** with clear description

**Pre-submission checklist:**

```bash
pnpm build        # Ensure builds succeed
pnpm test         # All tests pass
pnpm lint         # No linting errors
pnpm type-check   # No type errors
```

### Pull Request Template

**Description:**
- What does this PR do?
- Why is this change needed?

**Changes:**
- List specific changes made

**Testing:**
- How was this tested?
- Any edge cases considered?

**Documentation:**
- Updated relevant docs?
- Added examples if needed?

**Checklist:**
- [ ] Follows The Spexop Way
- [ ] Tests pass
- [ ] No linting errors
- [ ] TypeScript types included
- [ ] Documentation updated
- [ ] Accessibility verified

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

**Format:** `<type>(<scope>): <subject>`

**Types:**
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation only
- `style:` Code style (formatting, semicolons, etc)
- `refactor:` Code changes that neither fix bugs nor add features
- `test:` Adding or updating tests
- `chore:` Maintenance (dependencies, tooling, etc)
- `perf:` Performance improvements

**Examples:**

```bash
feat(react): add Carousel component with keyboard navigation
fix(theme): resolve dark mode contrast issues in techPreset
docs(readme): update installation instructions for pnpm
refactor(tokens): simplify color token structure
test(button): add accessibility tests for keyboard navigation
```

### Code Review

All PRs require review before merging. We check:

- Adherence to The Spexop Way
- Code quality and TypeScript usage
- Test coverage and accessibility
- Documentation completeness
- No breaking changes without migration guide

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/spexop-ui/spexop-packages/issues)
- **Discussions**: [GitHub Discussions](https://github.com/spexop-ui/spexop-packages/discussions)
- **Email**: <contact@spexop.com>

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
