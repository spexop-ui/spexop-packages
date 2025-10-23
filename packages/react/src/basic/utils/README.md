# Utils

Utility components and helpers for the Spexop React library.

## Overview

This category contains utility components that provide common functionality across the application. These components are not UI primitives but rather helpful utilities that enhance the development experience.

## Components

### ErrorBoundary

Error boundary component for catching and handling React errors gracefully.

**Features:**
- Catches JavaScript errors anywhere in the component tree
- Displays fallback UI when errors occur
- Logs errors for debugging
- Customizable error messages
- TypeScript support

**Usage:**
```tsx
import { ErrorBoundary } from '@spexop/react';

<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <MyComponent />
</ErrorBoundary>
```

## Design Principles

All utility components follow these principles:

1. **Composition over inheritance** - Build from primitives
2. **Accessibility first** - WCAG AA+ compliance
3. **TypeScript support** - Full type safety
4. **Theme integration** - Use design tokens
5. **Performance optimized** - Minimal overhead

## Migration from v0.3.x

The ErrorBoundary component was moved from `src/basic/advanced/ErrorBoundary/` to `src/basic/utils/ErrorBoundary/` in v0.4.0.

**Before:**
```tsx
import { ErrorBoundary } from '@spexop/react/basic/advanced';
```

**After:**
```tsx
import { ErrorBoundary } from '@spexop/react/basic/utils';
// or
import { ErrorBoundary } from '@spexop/react';
```

## Related Documentation

- [Component Documentation](../../README.md)
- [Migration Guide](../../../docs/migrations/from-v0.3-to-v0.4.md)
- [The Spexop Way Principles](../../README.md#the-spexop-way)
