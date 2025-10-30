# Spexop Design System

Professional React component library with a flexible theme system. Build modern web applications with primitives-first architecture.

## 📦 Packages

- **[@spexop/react](./packages/react)** - 60+ React components with full theme support
- **[@spexop/theme](./packages/theme)** - Theme system with 13 presets and 29+ export formats
- **[@spexop/icons](./packages/icons)** - 269 icons with filled variants and brand icons
- **[@spexop/cli](./packages/cli)** - CLI tools for scaffolding and utilities

## 🚀 Quick Start

### For End Users (npm packages)

```bash
npm install @spexop/react @spexop/theme @spexop/icons
```

### For Contributors (workspace development)

See **[WORKSPACE.md](./WORKSPACE.md)** for complete workspace guide.

```bash
# Install dependencies
pnpm install

# Build packages
pnpm build:icons && pnpm build:theme && pnpm build:react
```

### With Pre-built Theme

```typescript
import { Button, Grid, Card, Icon } from '@spexop/react';
import { Home } from '@spexop/icons';
import '@spexop/theme/dist/css/tech.css';
import '@spexop/react/dist/index.css';

function App() {
  return (
    <Grid columns={12} gap={24}>
      <Card>
        <Icon name={Home} size={24} />
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

## ⚡ Quick Start with Helper Utilities

Reduce boilerplate by 87% with Spexop helper utilities:

### Before (145 lines)

```typescript
// Manual hash routing
const getPathFromHash = () => window.location.hash.slice(1) || "/";
const [currentPath, setCurrentPath] = useState(getPathFromHash);
useEffect(() => {
  const handleHashChange = () => setCurrentPath(getPathFromHash());
  window.addEventListener("hashchange", handleHashChange);
  return () => window.removeEventListener("hashchange", handleHashChange);
}, []);

// Manual command generation (50+ lines)
const commands = [
  {
    id: "home",
    label: "Go to Home",
    description: "Navigate to home page",
    category: "Navigation",
    onSelect: () => {
      window.location.hash = "/";
      window.scrollTo(0, 0);
    },
  },
  // ... repetitive
];

// Manual search data (40+ lines)
// Manual HMR setup (12+ lines)
// Manual provider nesting (10+ lines)
```

### After (30 lines)

```typescript
import { 
  useHashRouter, 
  createNavigationCommands, 
  createSearchResults,
  createSpexopRoot,
  SpexopProvider,
  AppLayout 
} from '@spexop/react';

// Define routes once
const routes = [
  { path: '/', label: 'Home', description: 'Home page', icon: 'Home' },
  { path: '/about', label: 'About', description: 'About us', icon: 'Info' },
];

// Generate everything automatically
const commands = createNavigationCommands(routes);
const searchData = createSearchResults(routes);

function App() {
  const { Component } = useHashRouter({
    '/': HomePage,
    '/about': AboutPage,
  });
  
  return (
    <SpexopProvider>
      <AppLayout topBar={<TopBar />} sidebar={<Sidebar />}>
        <CommandPalette commands={commands} />
        <SearchModal results={searchData} />
        {Component && <Component />}
      </AppLayout>
    </SpexopProvider>
  );
}

createSpexopRoot(document.getElementById('root')!).render(<App />);
```

**Result:** 87% less boilerplate, fully typed, accessible by default.

[Learn more about helper utilities →](./packages/react/src/utils/README.md)

## 📖 Documentation

For examples and usage guides, see the documentation site: [docs.spexop.com](https://docs.spexop.com)

### For Contributors

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines
- [Getting Started](./docs/getting-started.md) - Quick start for contributors

### For End Users

- [Theme System Guide](./packages/theme/README.md)
- [Component Documentation](./packages/react/README.md)
- [Icons Catalog](./packages/icons/ICONS.md) - All 269 icons
- [CLI Tools](./packages/cli/README.md)

## 🔗 Links

- **Website**: <https://spexop.com>
- **Theme Builder**: <https://builder.spexop.com>
- **Documentation**: <https://docs.spexop.com>
- **npm**: [@spexop/react](https://www.npmjs.com/package/@spexop/react), [@spexop/theme](https://www.npmjs.com/package/@spexop/theme), [@spexop/icons](https://www.npmjs.com/package/@spexop/icons)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## 📄 License

MIT © Spexop Team

---

**Spexop Design System** • Built with TypeScript & React

[GitHub](https://github.com/spexop-ui/spexop-packages) • [npm](https://www.npmjs.com/org/spexop) • [Website](https://spexop.com)
