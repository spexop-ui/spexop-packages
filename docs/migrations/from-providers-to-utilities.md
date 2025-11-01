# Migration Guide: Providers to Utilities

**Status**: Available Now ✅  
**Version**: v0.6.0+  
**Breaking Changes**: None (providers still work, but are deprecated)

This guide helps you migrate from Spexop React Context Providers to the new utility-based approach. The utilities provide the same functionality without requiring provider wrappers.

## Why Migrate?

The utility-based approach offers several advantages:

- ✅ **No Provider Wrappers** - Use hooks directly without wrapping your app
- ✅ **Simpler Setup** - No need to nest multiple providers
- ✅ **Better Tree-Shaking** - Only import what you need
- ✅ **Smaller Bundle** - No provider overhead
- ✅ **More Flexible** - Use utilities in any component, anywhere

## Quick Migration Overview

| Provider | Utility Hook | Notes |
|----------|-------------|-------|
| `ToastProvider` | `useToastUtil` | No provider needed |
| `ModalProvider` | `useModalUtil` | No provider needed |
| `AccessibilityProvider` | `useAccessibilityUtil` | No provider needed |
| `DebugProvider` | `useDebugUtil` | No provider needed |
| `FormProvider` | `useFormUtil` | Standalone form management |
| `I18nProvider` | `useI18nUtil` | No provider needed |
| `PerformanceProvider` | `usePerformanceUtil` | No provider needed |
| `ThemeProvider` | `useThemeUtil` | For mode only; use provider for theme config injection |

## Migration Examples

### Toast Notifications

**Before (Provider)**:

```tsx
import { ToastProvider, useToast } from '@spexop/react';

function App() {
  return (
    <ToastProvider position="top-right" maxToasts={5}>
      <MyComponent />
    </ToastProvider>
  );
}

function MyComponent() {
  const { addToast } = useToast();
  
  const handleClick = () => {
    addToast({ message: 'Success!', variant: 'success' });
  };
  
  return <button onClick={handleClick}>Show Toast</button>;
}
```

**After (Utility)**:

```tsx
import { useToastUtil } from '@spexop/react';

function MyComponent() {
  const { toast, renderToasts } = useToastUtil({
    position: 'top-right',
    maxToasts: 5,
  });
  
  const handleClick = () => {
    toast({ message: 'Success!', variant: 'success' });
  };
  
  return (
    <>
      <button onClick={handleClick}>Show Toast</button>
      {renderToasts()}
    </>
  );
}
```

### Modals

**Before (Provider)**:

```tsx
import { ModalProvider, useModal } from '@spexop/react';

function App() {
  return (
    <ModalProvider>
      <MyComponent />
    </ModalProvider>
  );
}

function MyComponent() {
  const { openModal, closeModal } = useModal();
  
  const handleClick = () => {
    openModal({
      id: 'my-modal',
      content: <div>Modal Content</div>,
      size: 'md',
    });
  };
  
  return <button onClick={handleClick}>Open Modal</button>;
}
```

**After (Utility)**:

```tsx
import { useModalUtil } from '@spexop/react';

function MyComponent() {
  const { openModal, closeModal, renderModals } = useModalUtil();
  
  const handleClick = () => {
    openModal({
      id: 'my-modal',
      content: <div>Modal Content</div>,
      size: 'md',
    });
  };
  
  return (
    <>
      <button onClick={handleClick}>Open Modal</button>
      {renderModals()}
    </>
  );
}
```

### Theme Mode

**Before (Provider)**:

```tsx
import { ThemeProvider, useTheme } from '@spexop/react';

function App() {
  return (
    <ThemeProvider defaultMode="auto">
      <MyComponent />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { resolvedMode, setMode } = useTheme();
  
  return (
    <button onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

**After (Utility)**:

```tsx
import { useThemeUtil } from '@spexop/react';

function MyComponent() {
  const { resolvedMode, setMode } = useThemeUtil({
    defaultMode: 'auto',
  });
  
  return (
    <button onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

### Forms

**Before (Provider)**:

```tsx
import { FormProvider, useForm } from '@spexop/react';

function App() {
  return (
    <FormProvider initialValues={{ email: '', password: '' }}>
      <MyForm />
    </FormProvider>
  );
}

function MyForm() {
  const { values, errors, handleChange, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={values.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

**After (Utility)**:

```tsx
import { useFormUtil } from '@spexop/react';

function MyForm() {
  const { values, errors, handleChange, handleSubmit } = useFormUtil({
    initialValues: { email: '', password: '' },
  });
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={values.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Internationalization

**Before (Provider)**:

```tsx
import { I18nProvider, useTranslation } from '@spexop/react';

const translations = {
  en: { welcome: 'Welcome', greeting: 'Hello {{name}}' },
  es: { welcome: 'Bienvenido', greeting: 'Hola {{name}}' },
};

function App() {
  return (
    <I18nProvider locale="en" translations={translations}>
      <MyComponent />
    </I18nProvider>
  );
}

function MyComponent() {
  const { t, locale, setLocale } = useTranslation();
  
  return (
    <div>
      <p>{t('welcome')}</p>
      <p>{t('greeting', { name: 'World' })}</p>
      <button onClick={() => setLocale('es')}>Switch to Spanish</button>
    </div>
  );
}
```

**After (Utility)**:

```tsx
import { useI18nUtil } from '@spexop/react';

const translations = {
  en: { welcome: 'Welcome', greeting: 'Hello {{name}}' },
  es: { welcome: 'Bienvenido', greeting: 'Hola {{name}}' },
};

function MyComponent() {
  const { t, locale, setLocale } = useI18nUtil({
    locale: 'en',
    translations,
  });
  
  return (
    <div>
      <p>{t('welcome')}</p>
      <p>{t('greeting', { name: 'World' })}</p>
      <button onClick={() => setLocale('es')}>Switch to Spanish</button>
    </div>
  );
}
```

### Debug Mode

**Before (Provider)**:

```tsx
import { DebugProvider, useDebug } from '@spexop/react';

function App() {
  return (
    <DebugProvider initialEnabled={false}>
      <MyComponent />
    </DebugProvider>
  );
}

function MyComponent() {
  const { enabled, toggle } = useDebug();
  
  return (
    <button onClick={toggle}>
      Debug: {enabled ? 'On' : 'Off'}
    </button>
  );
}
```

**After (Utility)**:

```tsx
import { useDebugUtil } from '@spexop/react';

function MyComponent() {
  const { enabled, toggle } = useDebugUtil({
    initialEnabled: false,
  });
  
  return (
    <button onClick={toggle}>
      Debug: {enabled ? 'On' : 'Off'}
    </button>
  );
}
```

## Special Cases

### Theme Configuration Injection

If you need **full theme configuration injection** (CSS variables), you still need `ThemeProvider`:

```tsx
import { ThemeProvider } from '@spexop/react';
import { techPreset } from '@spexop/theme';

// Still needed for theme config injection
function App() {
  return (
    <ThemeProvider theme={techPreset} defaultMode="auto">
      <MyComponent />
    </ThemeProvider>
  );
}

// But use useThemeUtil for mode management
function MyComponent() {
  const { resolvedMode, setMode } = useThemeUtil();
  // ...
}
```

**Note**: `ThemeProvider` is deprecated but still functional. For theme mode only, use `useThemeUtil`. For theme config injection, keep using `ThemeProvider` until a utility alternative is available.

## Migration Checklist

### Pre-Migration

- [ ] **Backup project** - Create git commit or backup
- [ ] **Review utility APIs** - Understand the new API differences
- [ ] **Check dependencies** - Ensure compatibility with v0.6.0+
- [ ] **Run current tests** - Ensure all tests pass

### Migration Steps

- [ ] **Update package version** - Install `@spexop/react@^0.6.0`
- [ ] **Replace ToastProvider** - Use `useToastUtil` + `renderToasts()`
- [ ] **Replace ModalProvider** - Use `useModalUtil` + `renderModals()`
- [ ] **Replace AccessibilityProvider** - Use `useAccessibilityUtil`
- [ ] **Replace DebugProvider** - Use `useDebugUtil`
- [ ] **Replace FormProvider** - Use `useFormUtil`
- [ ] **Replace I18nProvider** - Use `useI18nUtil`
- [ ] **Replace PerformanceProvider** - Use `usePerformanceUtil`
- [ ] **Update ThemeProvider** - Use `useThemeUtil` for mode only
- [ ] **Remove provider wrappers** - Remove all provider imports and wrappers
- [ ] **Update imports** - Import utilities from `@spexop/react`
- [ ] **Add render functions** - Add `renderToasts()` and `renderModals()` where needed

### Post-Migration

- [ ] **Run full test suite** - Ensure all tests pass
- [ ] **Test functionality** - Verify all utilities work correctly
- [ ] **Check bundle size** - Verify bundle size improvements
- [ ] **Update documentation** - Update any internal documentation
- [ ] **Deploy to staging** - Test in staging environment
- [ ] **Monitor for issues** - Watch for any runtime issues

## API Differences

### Toast Utility

- `addToast()` → `toast()`
- Must call `renderToasts()` in component tree

### Modal Utility

- `openModal()` - Same
- `closeModal()` - Same
- Must call `renderModals()` in component tree

### Theme Utility

- `useTheme()` → `useThemeUtil()`
- `resolvedMode` - Same
- `setMode()` - Same
- No provider wrapper needed

### Form Utility

- `useForm()` → `useFormUtil()`
- API is mostly the same
- No provider wrapper needed

## Benefits After Migration

- ✅ **Simpler Setup** - No provider nesting required
- ✅ **Better Performance** - No context overhead
- ✅ **Smaller Bundle** - Tree-shakeable utilities
- ✅ **More Flexible** - Use utilities anywhere, anytime
- ✅ **Better Developer Experience** - Cleaner code

## Getting Help

### Documentation

- **Utility Hooks**: See individual utility files in `packages/react/src/utils/`
- **TypeScript Types**: All utilities are fully typed
- **Examples**: See updated apps in `apps/` directory

### Community Support

- **GitHub Issues**: [github.com/spexop-ui/spexop-packages/issues](https://github.com/spexop-ui/spexop-packages/issues)
- **Discussions**: [github.com/spexop-ui/spexop-packages/discussions](https://github.com/spexop-ui/spexop-packages/discussions)

## Rollback Plan

If you encounter issues:

1. Providers still work - you can keep using them
2. Providers are deprecated but not removed
3. Both approaches can coexist during migration
4. Gradually migrate component by component

## Next Steps

- **Migrate Toast usage** - Start with toast notifications
- **Migrate Modal usage** - Then modals
- **Migrate Form usage** - Forms next
- **Migrate Theme usage** - Theme mode management
- **Remove providers** - Once all migrated

---

**Version**: v0.6.0+  
**Last Updated**: 2025-01-31
