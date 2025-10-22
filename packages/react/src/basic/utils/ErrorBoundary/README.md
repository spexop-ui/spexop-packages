# ErrorBoundary

**Version**: 1.0.0
**Package**: `@spexop/react`
**Status**: Production Ready
**Component Type**: Class Component

A refined React error boundary component that catches JavaScript errors anywhere in the child component tree, logs those errors, and displays a fallback UI following "The Spexop Way" design principles.

## Features

- **Error Catching** - Catches JavaScript errors in child components
- **Fallback UI** - Displays elegant error messages with recovery options
- **Custom Fallbacks** - Support for custom fallback components or render functions
- **Reset Functionality** - Allows users to attempt recovery from errors
- **Error Details** - Optional detailed error information for debugging
- **Multiple Variants** - Default, minimal, and inline display options
- **Accessibility First** - Full keyboard navigation and ARIA support
- **TypeScript Ready** - Comprehensive type definitions
- **Refined Minimalism** - Border-first design with high contrast
- **Token-Based** - Uses design tokens from @spexop/theme

## Installation

```bash
# Install the package
npm install @spexop/react

# Or with pnpm
pnpm add @spexop/react

# Or with yarn
yarn add @spexop/react
```

## Basic Usage

```tsx
import { ErrorBoundary } from '@spexop/react';

function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

## Variants

### Default (Full-Featured)

```tsx
<ErrorBoundary
  variant="default"
  showDetails={true}
  enableReset={true}
  onError={(error, errorInfo) => {
    console.error('Error caught:', error);
    logErrorToService(error, errorInfo);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

### Minimal

```tsx
<ErrorBoundary
  variant="minimal"
  errorTitle="Oops!"
  errorMessage="Something went wrong."
>
  <YourComponent />
</ErrorBoundary>
```

### Inline

```tsx
<ErrorBoundary variant="inline">
  <CompactComponent />
</ErrorBoundary>
```

## Custom Fallback

### Static Fallback

```tsx
<ErrorBoundary
  fallback={
    <div>
      <h2>Custom Error UI</h2>
      <p>Something went wrong!</p>
    </div>
  }
>
  <YourComponent />
</ErrorBoundary>
```

### Function Fallback

```tsx
<ErrorBoundary
  fallback={(error, errorInfo) => (
    <div>
      <h2>Error: {error.name}</h2>
      <p>{error.message}</p>
      <details>
        <summary>Stack Trace</summary>
        <pre>{errorInfo.componentStack}</pre>
      </details>
    </div>
  )}
>
  <YourComponent />
</ErrorBoundary>
```

## Error Logging

```tsx
<ErrorBoundary
  onError={(error, errorInfo) => {
    // Log to external service
    logErrorToSentry(error, {
      componentStack: errorInfo.componentStack,
      digest: errorInfo.digest,
    });
  }}
>
  <YourComponent />
</ErrorBoundary>
```

## Reset Handling

```tsx
<ErrorBoundary
  enableReset={true}
  onReset={() => {
    // Reset application state
    resetAppState();
    // Navigate to safe route
    navigate('/');
  }}
>
  <YourComponent />
</ErrorBoundary>
```

## Custom Labels

```tsx
<ErrorBoundary
  errorTitle="Application Error"
  errorMessage="We're sorry, but something unexpected happened."
  resetLabel="Reload Application"
  toggleDetailsLabel="Technical Details"
  hideDetailsLabel="Hide Details"
>
  <YourComponent />
</ErrorBoundary>
```

## Nested Error Boundaries

```tsx
<ErrorBoundary variant="default">
  <App>
    <ErrorBoundary variant="minimal">
      <Dashboard>
        <ErrorBoundary variant="inline">
          <Widget />
        </ErrorBoundary>
      </Dashboard>
    </ErrorBoundary>
  </App>
</ErrorBoundary>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components to render |
| `fallback` | `ReactNode \| Function` | - | Custom fallback UI |
| `variant` | `"default" \| "minimal" \| "inline"` | `"default"` | Display variant |
| `onError` | `(error, errorInfo) => void` | - | Error callback |
| `onReset` | `() => void` | - | Reset callback |
| `enableReset` | `boolean` | `true` | Enable reset button |
| `showDetails` | `boolean` | `false` | Show error details |
| `errorTitle` | `string` | `"Something went wrong"` | Error title |
| `errorMessage` | `string` | `"An unexpected error occurred..."` | Error message |
| `resetLabel` | `string` | `"Try Again"` | Reset button label |
| `toggleDetailsLabel` | `string` | `"Show Details"` | Show details label |
| `hideDetailsLabel` | `string` | `"Hide Details"` | Hide details label |
| `className` | `string` | - | Additional CSS class |
| `aria-label` | `string` | - | ARIA label |

## Design Principles Applied

Following "The Spexop Way":

1. **Borders before shadows** - Strong 2px borders for clear error indication
2. **Typography before decoration** - Font weight (700/600) for hierarchy
3. **High contrast colors** - Red color tokens for error state, WCAG AAA compliance
4. **Tokens before magic numbers** - All spacing, colors, and typography use design tokens
5. **Composition before complexity** - Simple, composable error boundary component
6. **Standards before frameworks** - Built with React standard error boundary pattern
7. **Accessibility before aesthetics** - Full ARIA support and keyboard navigation

## Accessibility

- **Role**: Uses `role="alert"` for error notifications
- **ARIA**: Includes `aria-live="assertive"` for immediate error announcements
- **Keyboard**: Full keyboard navigation support for all interactive elements
- **Focus**: Clear focus indicators on all interactive elements
- **Screen Readers**: Descriptive labels and ARIA attributes

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 16.8+ (requires error boundary support)

## Best Practices

### Development vs Production

```tsx
// Development
<ErrorBoundary
  showDetails={process.env.NODE_ENV === 'development'}
  onError={(error, errorInfo) => {
    if (process.env.NODE_ENV === 'production') {
      logToService(error, errorInfo);
    }
  }}
>
  <App />
</ErrorBoundary>
```

### Multiple Boundaries

Use multiple error boundaries to isolate errors:

```tsx
<ErrorBoundary variant="default">
  <Header />
  <ErrorBoundary variant="minimal">
    <MainContent />
  </ErrorBoundary>
  <Footer />
</ErrorBoundary>
```

### State Management

Reset global state when errors occur:

```tsx
<ErrorBoundary
  onReset={() => {
    // Clear Redux store
    store.dispatch(resetAction());
    // Clear React Query cache
    queryClient.clear();
  }}
>
  <App />
</ErrorBoundary>
```

## Performance

- **Minimal overhead when no errors** - Zero performance impact on normal rendering
- **Efficient error capture** - Uses React's built-in error boundary mechanism
- **No unnecessary re-renders** - Only re-renders when error state changes
- **Lightweight component** - Small bundle size impact
- **Fast fallback rendering** - Instant error UI display

## Comparison with Other Solutions

| Feature | Spexop ErrorBoundary | react-error-boundary | Custom Implementation |
|---------|---------------------|---------------------|---------------------|
| Built-in UI | ✅ Three variants | ❌ Requires custom | ❌ Requires custom |
| Multiple Variants | ✅ Default/Minimal/Inline | ❌ Single approach | ❌ Manual implementation |
| Keyboard Navigation | ✅ Full support | ⚠️ Basic | ❌ Manual implementation |
| Design System Integration | ✅ Spexop tokens | ❌ Custom styling | ❌ Custom styling |
| TypeScript Support | ✅ Full type definitions | ✅ Full type definitions | ⚠️ Manual typing |
| Accessibility | ✅ WCAG AAA compliant | ⚠️ Basic ARIA | ❌ Manual implementation |
| Error Details Toggle | ✅ Built-in | ❌ Custom | ❌ Custom |
| Reset Functionality | ✅ Built-in | ✅ Built-in | ⚠️ Manual implementation |
| Custom Fallback | ✅ Element or function | ✅ Component | ✅ Manual |
| Bundle Size | ~3KB gzipped | ~2KB gzipped | Varies |
| Maintenance | ✅ Maintained | ✅ Maintained | ❌ Self-maintained |

## Migration from Other Error Boundaries

### From react-error-boundary

```tsx
// Before
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={resetHandler}
  onError={errorHandler}
>
  <App />
</ErrorBoundary>

// After
import { ErrorBoundary } from '@spexop/react';

<ErrorBoundary
  fallback={(error, errorInfo) => <ErrorFallback error={error} />}
  onReset={resetHandler}
  onError={errorHandler}
>
  <App />
</ErrorBoundary>
```

## Documentation

For comprehensive usage information, see:

- [README.md](./README.md) - Component overview and API reference
- [USAGE-GUIDE.md](./USAGE-GUIDE.md) - Comprehensive usage guide with examples
- [ErrorBoundary.example.tsx](./ErrorBoundary.example.tsx) - Live code examples

## Related Components

- [CodeBlock](../CodeBlock) - For displaying error stack traces
- [Modal](../../overlays/Modal) - For error dialogs
- [Toast](../../feedback/Toast) - For non-critical error notifications
- [Alert](../../feedback/Alert) - For inline error messages

## License

MIT License - see LICENSE file for details

## Author

@olmstedian | [github.com/olmstedian](https://github.com/olmstedian) | @spexop | [github.com/spexop-ui](https://github.com/spexop-ui)
