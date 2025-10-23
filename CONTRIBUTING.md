# Contributing to Spexop Design System

Thank you for your interest in contributing!

## Development Setup

```bash
# Clone repository
git clone https://github.com/spexop-ui/design-system.git
cd design-system

# Install dependencies
pnpm install

# Build packages
pnpm build

# Run tests
pnpm test
```

## Package Development

### Theme Package

```bash
cd packages/theme
pnpm dev  # Watch mode
pnpm test # Run tests
pnpm build # Build for production
```

### React Package

```bash
cd packages/react
pnpm dev  # Watch mode
pnpm test # Run tests
pnpm build # Build for production
```

## Running Examples

```bash
cd examples/basic-theme
pnpm install
pnpm dev
```

## Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests: `pnpm test`
5. Run linting: `pnpm lint`
6. Commit: `git commit -m "feat: add new feature"`
7. Push: `git push origin feature/my-feature`
8. Open a Pull Request

## Code Standards

- TypeScript strict mode
- Biome for linting and formatting
- Test coverage for new features
- Update documentation for changes
- Follow conventional commits

## Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc)
- `refactor:` Code refactoring
- `test:` Test additions or updates
- `chore:` Maintenance tasks

## Questions?

Open an issue or contact us at <contact@spexop.com>
