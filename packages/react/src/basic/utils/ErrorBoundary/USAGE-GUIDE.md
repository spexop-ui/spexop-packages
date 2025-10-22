# ErrorBoundary - Usage Guide

**Component Version**: v1.0.0
**Last Updated**: October 20, 2025
**Compatibility**: Stable API

## Quick Start

### Installation

```bash
pnpm add @spexop/react
```

### Basic Example

```tsx
import { ErrorBoundary } from '@spexop/react';

function App() {
  return (
    <ErrorBoundary>
      <YourApplication />
    </ErrorBoundary>
  );
}
```

## Common Use Cases

### App-Level Error Boundary

Wrap your entire application to catch all errors:

```tsx
import { ErrorBoundary } from '@spexop/react';

function Root() {
  return (
    <ErrorBoundary
      variant="default"
      showDetails={process.env.NODE_ENV === 'development'}
      onError={(error, errorInfo) => {
        // Log to error tracking service
        console.error('Application error:', error);
        logErrorToService(error, errorInfo);
      }}
      onReset={() => {
        // Reset app state
        window.location.href = '/';
      }}
    >
      <App />
    </ErrorBoundary>
  );
}
```

### Route-Level Boundaries

Isolate errors to specific routes:

```tsx
import { ErrorBoundary } from '@spexop/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <ErrorBoundary variant="minimal">
              <Dashboard />
            </ErrorBoundary>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ErrorBoundary 
              variant="minimal"
              onReset={() => window.location.reload()}
            >
              <Users />
            </ErrorBoundary>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ErrorBoundary variant="minimal">
              <Settings />
            </ErrorBoundary>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
```

### Feature-Level Boundaries

Wrap individual features to prevent cascade failures:

```tsx
import { ErrorBoundary } from '@spexop/react';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Isolated error boundary for data table */}
      <ErrorBoundary 
        variant="inline"
        onReset={() => refetchData()}
        errorMessage="Failed to load table data"
      >
        <DataTable />
      </ErrorBoundary>
      
      {/* Isolated error boundary for charts */}
      <ErrorBoundary 
        variant="inline"
        errorMessage="Failed to load charts"
      >
        <Charts />
      </ErrorBoundary>
      
      {/* Isolated error boundary for recent activity */}
      <ErrorBoundary 
        variant="minimal"
        errorMessage="Failed to load activity feed"
      >
        <RecentActivity />
      </ErrorBoundary>
    </div>
  );
}
```

### Widget Error Boundaries

Protect individual widgets in a dashboard:

```tsx
import { ErrorBoundary } from '@spexop/react';

function WidgetContainer({ widget }) {
  return (
    <ErrorBoundary
      variant="inline"
      errorTitle={`${widget.name} Error`}
      errorMessage="This widget encountered an error"
      onReset={() => {
        // Reload widget data
        widget.reload();
      }}
    >
      <Widget config={widget} />
    </ErrorBoundary>
  );
}
```

### Nested Error Boundaries

Create layered error handling:

```tsx
import { ErrorBoundary } from '@spexop/react';

function App() {
  return (
    <ErrorBoundary variant="default">
      <Header />
      
      <main>
        <ErrorBoundary variant="minimal">
          <Sidebar />
        </ErrorBoundary>
        
        <ErrorBoundary variant="minimal">
          <Content>
            <ErrorBoundary variant="inline">
              <DataGrid />
            </ErrorBoundary>
          </Content>
        </ErrorBoundary>
      </main>
      
      <Footer />
    </ErrorBoundary>
  );
}
```

### Third-Party Component Wrapper

Wrap unreliable third-party components:

```tsx
import { ErrorBoundary } from '@spexop/react';

function ThirdPartyWidget() {
  return (
    <ErrorBoundary
      variant="minimal"
      errorTitle="Widget Unavailable"
      errorMessage="The widget failed to load. Try refreshing the page."
      fallback={
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Widget temporarily unavailable</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      }
    >
      <UnreliableThirdPartyComponent />
    </ErrorBoundary>
  );
}
```

## Features and Props

### Variants

#### Default Variant

Full-featured error display with all options:

```tsx
<ErrorBoundary
  variant="default"
  showDetails={true}
  enableReset={true}
>
  <YourComponent />
</ErrorBoundary>
```

Features:

- Large error icon
- Error title and message
- Error name display
- Reset button
- Optional details toggle
- Stack trace display

#### Minimal Variant

Compact error display for smaller spaces:

```tsx
<ErrorBoundary
  variant="minimal"
  errorTitle="Oops!"
  errorMessage="Something went wrong."
>
  <YourComponent />
</ErrorBoundary>
```

Features:

- Smaller error icon
- Simplified message
- No error name display
- No details section
- Reset button (optional)

#### Inline Variant

Horizontal layout for inline contexts:

```tsx
<ErrorBoundary
  variant="inline"
  errorMessage="Failed to load content"
>
  <InlineComponent />
</ErrorBoundary>
```

Features:

- Horizontal layout
- Compact size
- Left-aligned text
- Suitable for tight spaces

### Custom Fallback UI

#### Static Fallback

Provide a custom error UI component:

```tsx
<ErrorBoundary
  fallback={
    <div className="custom-error">
      <h2>Application Error</h2>
      <p>We're sorry, but something went wrong.</p>
      <button onClick={() => window.location.reload()}>
        Reload Application
      </button>
    </div>
  }
>
  <YourComponent />
</ErrorBoundary>
```

#### Function Fallback

Render fallback based on error details:

```tsx
<ErrorBoundary
  fallback={(error, errorInfo) => (
    <div className="custom-error">
      <h2>Error: {error.name}</h2>
      <p>{error.message}</p>
      
      {process.env.NODE_ENV === 'development' && (
        <details>
          <summary>Technical Details</summary>
          <pre>{errorInfo.componentStack}</pre>
        </details>
      )}
      
      <button onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  )}
>
  <YourComponent />
</ErrorBoundary>
```

### Error Logging

#### Basic Error Logging

```tsx
<ErrorBoundary
  onError={(error, errorInfo) => {
    console.error('Error caught:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

#### Sentry Integration

```tsx
import * as Sentry from '@sentry/react';

<ErrorBoundary
  onError={(error, errorInfo) => {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }}
>
  <YourComponent />
</ErrorBoundary>
```

#### LogRocket Integration

```tsx
import LogRocket from 'logrocket';

<ErrorBoundary
  onError={(error, errorInfo) => {
    LogRocket.captureException(error, {
      extra: {
        componentStack: errorInfo.componentStack,
      },
    });
  }}
>
  <YourComponent />
</ErrorBoundary>
```

#### Custom Analytics

```tsx
<ErrorBoundary
  onError={(error, errorInfo) => {
    // Track in analytics
    analytics.track('Application Error', {
      errorName: error.name,
      errorMessage: error.message,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
    
    // Log to custom service
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
        componentStack: errorInfo.componentStack,
      }),
    });
  }}
>
  <YourComponent />
</ErrorBoundary>
```

### Reset Handling

#### Basic Reset

```tsx
<ErrorBoundary
  enableReset={true}
  onReset={() => {
    console.log('Error boundary reset!');
  }}
>
  <YourComponent />
</ErrorBoundary>
```

#### Reset with State Management

```tsx
import { useDispatch } from 'react-redux';
import { resetState } from './store';

function AppWithReset() {
  const dispatch = useDispatch();
  
  return (
    <ErrorBoundary
      onReset={() => {
        // Reset Redux store
        dispatch(resetState());
        
        // Clear session storage
        sessionStorage.clear();
        
        // Reload page
        window.location.reload();
      }}
    >
      <App />
    </ErrorBoundary>
  );
}
```

#### Reset with Navigation

```tsx
import { useNavigate } from 'react-router-dom';

function AppWithNavigation() {
  const navigate = useNavigate();
  
  return (
    <ErrorBoundary
      onReset={() => {
        // Navigate to home
        navigate('/');
      }}
    >
      <YourComponent />
    </ErrorBoundary>
  );
}
```

#### Reset with Data Refetch

```tsx
import { useQueryClient } from '@tanstack/react-query';

function DataContainer() {
  const queryClient = useQueryClient();
  
  return (
    <ErrorBoundary
      onReset={() => {
        // Invalidate and refetch all queries
        queryClient.invalidateQueries();
      }}
    >
      <DataComponent />
    </ErrorBoundary>
  );
}
```

### Custom Labels

Customize all text in the error boundary:

```tsx
<ErrorBoundary
  errorTitle="Application Error"
  errorMessage="We're sorry, but something unexpected happened."
  resetLabel="Reload Application"
  toggleDetailsLabel="Technical Details"
  hideDetailsLabel="Hide Technical Details"
  aria-label="Application error alert"
>
  <YourComponent />
</ErrorBoundary>
```

### Show Error Details

Display technical details for debugging:

```tsx
<ErrorBoundary
  showDetails={process.env.NODE_ENV === 'development'}
  errorTitle="Development Error"
  errorMessage="Check the details below for debugging information."
>
  <YourComponent />
</ErrorBoundary>
```

## Accessibility

### Keyboard Navigation

The ErrorBoundary is fully keyboard accessible:

- **Tab**: Focus on interactive elements (reset button, details toggle)
- **Enter**: Activate focused button
- **Space**: Activate focused button
- **Shift + Tab**: Navigate backwards through interactive elements

### ARIA Support

The component includes comprehensive ARIA attributes:

```tsx
<ErrorBoundary
  aria-label="Error notification"
>
  <YourComponent />
</ErrorBoundary>
```

ARIA features:

- `role="alert"` for immediate screen reader announcement
- `aria-live="assertive"` for urgent error notifications
- `aria-label` for custom screen reader labels
- `aria-expanded` on details toggle button
- Proper button labels for all interactive elements

### Screen Reader Announcements

When an error occurs, screen readers will:

1. Announce "Error occurred" immediately
2. Read the error title
3. Read the error message
4. Announce available actions (reset button, details toggle)
5. Announce state changes (details shown/hidden)

### Touch Targets

All interactive elements meet WCAG requirements:

- Reset button: Minimum 44px touch target
- Details toggle button: Minimum 44px touch target
- Adequate spacing between buttons for easy touch interaction

### High Contrast Mode

The component maintains WCAG AAA contrast ratios:

- Error border: High visibility red color
- Text: Maximum contrast against background
- Icons: Clear and visible
- Focus indicators: 2px solid outline

## Best Practices

### DO

- Always provide meaningful error messages
- Wrap your application root with an error boundary
- Use multiple error boundaries to isolate failures
- Log errors to a monitoring service in production
- Test error boundaries with intentional errors
- Provide recovery options (reset button)
- Use appropriate variants for different contexts
- Customize error messages for user-friendly communication
- Show error details only in development
- Handle async errors separately (use try-catch)

### DON'T

- Don't rely on error boundaries for all error handling
- Don't show technical stack traces to end users
- Don't forget to implement onError for logging
- Don't use error boundaries for control flow
- Don't wrap every single component individually
- Don't ignore errors caught by boundaries
- Don't use error boundaries for event handler errors
- Don't forget to test error recovery
- Don't show confusing technical jargon to users
- Don't prevent users from recovering from errors

### Development vs Production

#### Development Configuration

```tsx
<ErrorBoundary
  variant="default"
  showDetails={true}
  enableReset={true}
  onError={(error, errorInfo) => {
    // Log to console for debugging
    console.error('Error:', error);
    console.error('Component Stack:', errorInfo.componentStack);
  }}
>
  <App />
</ErrorBoundary>
```

#### Production Configuration

```tsx
<ErrorBoundary
  variant="default"
  showDetails={false}
  enableReset={true}
  errorTitle="Something went wrong"
  errorMessage="We're working to fix the issue. Please try again."
  onError={(error, errorInfo) => {
    // Log to error tracking service
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }}
  onReset={() => {
    // Navigate to safe route
    window.location.href = '/';
  }}
>
  <App />
</ErrorBoundary>
```

### Multiple Error Boundaries

Use a layered approach for better error isolation:

```tsx
function App() {
  return (
    // Top-level: Catch critical application errors
    <ErrorBoundary 
      variant="default"
      errorTitle="Application Error"
      onError={logToSentry}
    >
      <Layout>
        <Header />
        
        {/* Mid-level: Catch route-specific errors */}
        <ErrorBoundary 
          variant="minimal"
          errorTitle="Page Error"
        >
          <Routes>
            <Route path="/" element={
              // Feature-level: Catch component errors
              <ErrorBoundary variant="inline">
                <Dashboard />
              </ErrorBoundary>
            } />
          </Routes>
        </ErrorBoundary>
        
        <Footer />
      </Layout>
    </ErrorBoundary>
  );
}
```

### State Management Integration

Reset application state when errors occur:

```tsx
// Redux
<ErrorBoundary
  onReset={() => {
    store.dispatch({ type: 'RESET_ALL' });
  }}
>
  <App />
</ErrorBoundary>

// Zustand
<ErrorBoundary
  onReset={() => {
    useStore.getState().reset();
  }}
>
  <App />
</ErrorBoundary>

// React Query
<ErrorBoundary
  onReset={() => {
    queryClient.clear();
    queryClient.invalidateQueries();
  }}
>
  <App />
</ErrorBoundary>
```

## Performance Tips

### Lazy Loading with Error Boundaries

Wrap lazy-loaded components:

```tsx
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from '@spexop/react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <ErrorBoundary
      variant="minimal"
      errorMessage="Failed to load component"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### Efficient Error Logging

Debounce error logging to prevent spam:

```tsx
import { debounce } from 'lodash';

const logError = debounce((error, errorInfo) => {
  Sentry.captureException(error, {
    contexts: { react: { componentStack: errorInfo.componentStack } },
  });
}, 1000);

<ErrorBoundary onError={logError}>
  <App />
</ErrorBoundary>
```

### Graceful Degradation

Provide fallback content that still offers value:

```tsx
<ErrorBoundary
  fallback={
    <div>
      <h2>Unable to load dashboard</h2>
      <p>You can still access:</p>
      <ul>
        <li><a href="/profile">Your Profile</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/help">Help Center</a></li>
      </ul>
    </div>
  }
>
  <Dashboard />
</ErrorBoundary>
```

## Troubleshooting

### Error Boundary Not Catching Errors

**Problem**: Errors are not being caught by the error boundary

**Causes**:

- Error occurred in event handler
- Error occurred in async code
- Error occurred in error boundary itself
- Error occurred in server-side rendering

**Solutions**:

```tsx
// For event handlers, use try-catch
function handleClick() {
  try {
    riskyOperation();
  } catch (error) {
    setError(error);
  }
}

// For async code, use try-catch
async function fetchData() {
  try {
    const data = await fetch('/api/data');
    return data;
  } catch (error) {
    setError(error);
  }
}

// Wrap error boundary in another error boundary
<ErrorBoundary variant="default">
  <ErrorBoundary variant="minimal">
    <YourComponent />
  </ErrorBoundary>
</ErrorBoundary>
```

### Reset Not Working

**Problem**: Reset button doesn't clear the error

**Cause**: Parent component not remounting child

**Solution**: Use key prop to force remount

```tsx
function Parent() {
  const [resetKey, setResetKey] = useState(0);
  
  return (
    <ErrorBoundary
      key={resetKey}
      onReset={() => setResetKey(prev => prev + 1)}
    >
      <YourComponent />
    </ErrorBoundary>
  );
}
```

### Fallback UI Not Showing

**Problem**: Error occurs but fallback UI doesn't display

**Causes**:

- Error boundary placed incorrectly
- Error occurring in error boundary itself
- Production build vs development build behavior

**Solutions**:

```tsx
// Ensure error boundary wraps the throwing component
<ErrorBoundary>
  <ComponentThatThrows />  {/* Correct */}
</ErrorBoundary>

// Not this
<ComponentThatThrows>
  <ErrorBoundary />  {/* Wrong - too late */}
</ComponentThatThrows>

// Test in production build
pnpm build
pnpm preview
```

### Stack Trace Not Showing

**Problem**: Error details section is empty

**Cause**: `showDetails` prop is false or variant is "minimal"

**Solution**:

```tsx
<ErrorBoundary
  variant="default"  // Not "minimal"
  showDetails={true}  // Must be true
>
  <YourComponent />
</ErrorBoundary>
```

### Multiple Error Boundaries Triggering

**Problem**: Error triggers multiple error boundaries

**Cause**: Nested error boundaries all catching the same error

**Solution**: This is expected behavior. The innermost boundary catches first.

```tsx
// Innermost catches first
<ErrorBoundary variant="default" onError={logToSentry}>
  <ErrorBoundary variant="minimal" onError={logToConsole}>
    <ComponentThatThrows />  {/* This boundary catches */}
  </ErrorBoundary>
</ErrorBoundary>
```

### Error Logging Not Working

**Problem**: onError callback not being called

**Causes**:

- Error occurring in development with React DevTools
- Error already handled by parent boundary
- Callback has syntax error

**Solutions**:

```tsx
// Ensure callback is valid
<ErrorBoundary
  onError={(error, errorInfo) => {
    console.log('Error caught:', error);  // Test with console first
    
    // Then add external logging
    try {
      Sentry.captureException(error);
    } catch (loggingError) {
      console.error('Failed to log error:', loggingError);
    }
  }}
>
  <YourComponent />
</ErrorBoundary>
```

## Advanced Patterns

### Error Recovery with Retry

Implement automatic retry logic:

```tsx
function ComponentWithRetry() {
  const [retryCount, setRetryCount] = useState(0);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    if (hasError && retryCount < 3) {
      const timer = setTimeout(() => {
        setHasError(false);
        setRetryCount(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasError, retryCount]);
  
  if (hasError && retryCount >= 3) {
    throw new Error('Failed after 3 retries');
  }
  
  return (
    <ErrorBoundary
      onError={() => setHasError(true)}
    >
      <DataComponent />
    </ErrorBoundary>
  );
}
```

### Conditional Error Boundaries

Enable/disable error boundaries based on feature flags:

```tsx
function ConditionalErrorBoundary({ children, enabled = true }) {
  if (!enabled) {
    return <>{children}</>;
  }
  
  return (
    <ErrorBoundary variant="minimal">
      {children}
    </ErrorBoundary>
  );
}

// Usage
<ConditionalErrorBoundary enabled={featureFlags.errorBoundaries}>
  <ExperimentalFeature />
</ConditionalErrorBoundary>
```

### Error Boundary Factory

Create error boundaries with preset configurations:

```tsx
function createErrorBoundary(config) {
  return function BoundaryWrapper({ children }) {
    return (
      <ErrorBoundary
        variant={config.variant}
        errorTitle={config.title}
        errorMessage={config.message}
        onError={config.onError}
        onReset={config.onReset}
      >
        {children}
      </ErrorBoundary>
    );
  };
}

// Create specific boundaries
const PageErrorBoundary = createErrorBoundary({
  variant: 'minimal',
  title: 'Page Error',
  message: 'This page encountered an error',
  onError: logToSentry,
});

const WidgetErrorBoundary = createErrorBoundary({
  variant: 'inline',
  message: 'Widget unavailable',
  onError: logToAnalytics,
});

// Usage
<PageErrorBoundary>
  <Dashboard />
</PageErrorBoundary>
```

### Error Context

Share error state across components:

```tsx
const ErrorContext = createContext();

function ErrorProvider({ children }) {
  const [errors, setErrors] = useState([]);
  
  const addError = (error, errorInfo) => {
    setErrors(prev => [...prev, { error, errorInfo, timestamp: Date.now() }]);
  };
  
  return (
    <ErrorContext.Provider value={{ errors, addError }}>
      <ErrorBoundary onError={addError}>
        {children}
      </ErrorBoundary>
    </ErrorContext.Provider>
  );
}

// Usage
<ErrorProvider>
  <App />
</ErrorProvider>
```

### Dynamic Error Messages

Customize error messages based on error type:

```tsx
function getErrorMessage(error) {
  if (error.message.includes('Network')) {
    return 'Network error. Please check your connection.';
  }
  if (error.message.includes('Permission')) {
    return 'Permission denied. Please check your access rights.';
  }
  if (error.message.includes('NotFound')) {
    return 'Resource not found.';
  }
  return 'An unexpected error occurred.';
}

<ErrorBoundary
  fallback={(error) => (
    <div>
      <h2>Error</h2>
      <p>{getErrorMessage(error)}</p>
    </div>
  )}
>
  <YourComponent />
</ErrorBoundary>
```

## Migration Notes

### From react-error-boundary

The Spexop ErrorBoundary is compatible with react-error-boundary patterns:

```tsx
// Before (react-error-boundary)
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={handleReset}
  onError={handleError}
>
  <App />
</ErrorBoundary>

// After (Spexop)
import { ErrorBoundary } from '@spexop/react';

<ErrorBoundary
  fallback={(error, errorInfo) => 
    <ErrorFallback error={error} />
  }
  onReset={handleReset}
  onError={handleError}
>
  <App />
</ErrorBoundary>
```

Key differences:

- `FallbackComponent` → `fallback` (function or element)
- Built-in UI variants (default, minimal, inline)
- Integrated design system styling
- Enhanced keyboard navigation

### From Custom Error Boundary

If you have a custom error boundary implementation:

```tsx
// Before (custom class component)
class MyErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// After (Spexop ErrorBoundary)
import { ErrorBoundary } from '@spexop/react';

<ErrorBoundary
  errorTitle="Something went wrong"
  onError={(error, errorInfo) => logError(error, errorInfo)}
>
  {children}
</ErrorBoundary>
```

Benefits:

- No need to maintain custom class component
- Built-in accessibility features
- Consistent design system styling
- Multiple variants for different contexts
- Reset functionality included

## Related Components

- **CodeBlock**: Display error stack traces with syntax highlighting
- **Modal**: Show error details in a modal dialog
- **Toast**: Show non-critical error notifications
- **Alert**: Display inline error messages

## Examples

See the [ErrorBoundary.example.tsx](./ErrorBoundary.example.tsx) for comprehensive examples including:

- Basic usage
- Custom error handlers
- Minimal variant
- Inline variant
- With details
- Custom fallback UI
- Custom fallback function
- Reset handler
- Nested error boundaries

## Summary

The ErrorBoundary component provides:

- React error boundary implementation
- Multiple display variants
- Custom fallback UI support
- Error logging integration
- Reset functionality
- Full accessibility support
- Keyboard navigation
- Design system integration
- TypeScript support

Perfect for:

- Application-level error handling
- Route-level error isolation
- Feature-level error boundaries
- Widget error protection
- Third-party component wrapping
- Development debugging
- Production error tracking

**Built with Spexop design principles for a refined, accessible error handling experience.**
