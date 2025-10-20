# Spexop Design System

Professional React component library with a flexible theme system. Build modern web applications with primitives-first architecture.

## 📦 Packages

- **[@spexop/theme](./packages/theme)** - Theme system with 13 presets and 29+ export formats
- **[@spexop/react](./packages/react)** - 60+ React components with full theme support
- **[@spexop/tokens](./packages/tokens)** - 379 design tokens for consistent styling

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
- [Design Tokens Reference](./packages/tokens/README.md)

## 🔗 Links

- **Website**: https://spexop.com
- **Theme Builder**: https://builder.spexop.com
- **npm**: [@spexop/theme](https://www.npmjs.com/package/@spexop/theme), [@spexop/react](https://www.npmjs.com/package/@spexop/react), [@spexop/tokens](https://www.npmjs.com/package/@spexop/tokens)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## 📄 License

MIT © Spexop Team

---

<div align="center">

**Spexop Design System** • Built with TypeScript & React

[GitHub](https://github.com/spexop-ui/design-system) • [npm](https://www.npmjs.com/org/spexop) • [Website](https://spexop.com)

</div>

