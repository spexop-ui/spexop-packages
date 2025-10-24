# Spexop Design System

Professional React component library with a flexible theme system. Build modern web applications with primitives-first architecture.

## 🎉 What's New in v0.4.2

### Hero Component Major Enhancement in v0.4.2

- **9 layout variants** with modern UI/UX effects (glassmorphism, parallax, feature grids)
- **Universal background media** support for all variants
- **Dynamic title sizing** and overlay intensity control
- **1700+ lines** of comprehensive documentation

### RGB Transparency Support in v0.4.2

- Auto-generated RGB tokens (`--theme-primary-rgb`, `--theme-surface-rgb`)
- Enables modern transparency effects and glassmorphism
- All 13 pre-built themes updated

[View Full Changelog](./CHANGELOG.md)

## 📦 Packages

- **[@spexop/theme](./packages/theme)** `v0.4.2` - Theme system with 13 presets, 29+ export formats, and RGB transparency
- **[@spexop/react](./packages/react)** `v0.4.2` - 60+ React components with enhanced Hero and full theme support

## 🚀 Quick Start

```bash
npm install @spexop/react @spexop/theme
```

### With Pre-built Theme

```typescript
import { Button, Grid, Card } from '@spexop/react';
import '@spexop/theme/dist/css/tech.css';
import '@spexop/react/dist/index.css';

function App() {
  return (
    <Grid columns={12} gap={24}>
      <Card>
        <Button variant="primary">Get Started</Button>
      </Card>
    </Grid>
  );
}
```

### With Custom Theme

```typescript
import { ThemeProvider } from '@spexop/react';
import { techPreset } from '@spexop/theme';

function App() {
  return (
    <ThemeProvider theme={techPreset}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## 📚 Examples

See [examples/](./examples) directory for complete working examples:

- [Basic Theme Usage](./examples/basic-theme) - Using pre-built CSS themes
- [Custom Theme](./examples/custom-theme) - Creating your own theme
- [Runtime Theme Switching](./examples/runtime-switching) - Dynamic theme changes

## 📖 Documentation

- [Getting Started](./docs/getting-started.md)
- [Theme System Guide](./packages/theme/README.md)
- [Component Documentation](./packages/react/README.md)
- [Theme System Improvements](./docs/theme-system-improvements.md)

## 🔗 Links

- **Website**: <https://spexop.com>
- **Theme Builder**: <https://builder.spexop.com>
- **npm**: [@spexop/theme](https://www.npmjs.com/package/@spexop/theme), [@spexop/react](https://www.npmjs.com/package/@spexop/react)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## 📄 License

MIT © Spexop Team

---

**Spexop Design System** • Built with TypeScript & React

[GitHub](https://github.com/spexop-ui/design-system) • [npm](https://www.npmjs.com/org/spexop) • [Website](https://spexop.com)
