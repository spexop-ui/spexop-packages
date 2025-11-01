# Migration Guide: v0.3 to v0.4

**Breaking Changes**: Component Structure Reorganization

This guide helps you migrate from Spexop React v0.3 to v0.4, which includes a major reorganization of the component structure to improve discoverability and align with "Primitives before patterns" principles.

## Migration Checklist

### Pre-Migration

- [ ] **Backup your project** - Create a git commit or backup
- [ ] **Review breaking changes** - Understand what will change
- [ ] **Check dependencies** - Ensure compatibility with v0.4.0
- [ ] **Run tests** - Ensure current tests pass

### Migration Steps

- [ ] **Update package version** - Install @spexop/react@^0.4.0
- [ ] **Update imports** - Replace category-specific imports
- [ ] **Replace specialized cards** - Use composition patterns
- [ ] **Update TypeScript types** - Create your own type definitions
- [ ] **Test components** - Verify all components work correctly
- [ ] **Update CSS** - Fix any custom CSS targeting removed components
- [ ] **Test mobile** - Verify mobile optimizations work
- [ ] **Test accessibility** - Verify accessibility improvements

### Post-Migration

- [ ] **Run full test suite** - Ensure all tests pass
- [ ] **Check bundle size** - Verify bundle size improvements
- [ ] **Test on mobile devices** - Verify mobile optimizations
- [ ] **Test with screen readers** - Verify accessibility improvements
- [ ] **Update documentation** - Update any internal documentation
- [ ] **Deploy to staging** - Test in staging environment
- [ ] **Monitor for issues** - Watch for any runtime issues

### Rollback Plan

- [ ] **Keep v0.3.x backup** - Don't delete old version immediately
- [ ] **Document rollback steps** - Know how to revert if needed
- [ ] **Test rollback process** - Ensure you can revert if necessary

## Overview of Changes

### What Changed

1. **Eliminated "advanced" category** - Components moved to semantically correct categories
2. **Removed specialized card components** - Replaced with composition patterns
3. **Consolidated navigation components** - All navigation components now in `navigation/`
4. **Moved animation hooks** - All hooks now in `hooks/` directory
5. **Reorganized display components** - Renamed to `indicators/` for clarity
6. **Enhanced accessibility** - WCAG AAA compliance improvements
7. **Mobile optimization** - Better touch targets and responsive behavior
8. **UI/UX improvements** - Visual polish and performance enhancements

### What Stayed the Same

- All component APIs remain unchanged
- All props and functionality preserved
- Design tokens and theme system unchanged
- CSS classes and styling unchanged (with enhancements)

## Breaking Changes

### 1. Specialized Card Components Removed

**Before (v0.3)**:

```tsx
import { BlogCard, ProductCard, PricingCard } from '@spexop/react';

<BlogCard 
  title="Getting Started"
  author="Jane Doe"
  date="2025-10-22"
  tags={["Tutorial", "React"]}
/>
```

**After (v0.4)**:

```tsx
import { Card, CardHeader, CardBody, Avatar, Badge } from '@spexop/react';

<Card variant="basic">
  <CardHeader>
    <h3>Getting Started</h3>
  </CardHeader>
  <CardBody>
    <div className="blog-meta">
      <Avatar name="Jane Doe" />
      <span>Jane Doe</span>
      <time>2025-10-22</time>
    </div>
    <div className="blog-tags">
      <Badge>Tutorial</Badge>
      <Badge>React</Badge>
    </div>
  </CardBody>
</Card>
```

**Migration Steps**:

1. Find the equivalent pattern in `src/patterns/cards/`
2. Copy the composition code
3. Update your imports
4. Customize as needed

### 2. Component Location Changes

#### Navigation Components

**Before (v0.3)**:

```tsx
import { Navigation } from '@spexop/react/advanced';
import { ContextNav } from '@spexop/react/layout';
```

**After (v0.4)**:

```tsx
import { Navigation, ContextNav } from '@spexop/react';
// or
import { Navigation, ContextNav } from '@spexop/react/navigation';
```

#### Button Components

**Before (v0.3)**:

```tsx
import { IconButton } from '@spexop/react/display';
import { SegmentedControl } from '@spexop/react/advanced';
```

**After (v0.4)**:

```tsx
import { IconButton, SegmentedControl } from '@spexop/react';
// or
import { IconButton, SegmentedControl } from '@spexop/react/buttons';
```

#### Display/Indicators Components

**Before (v0.3)**:

```tsx
import { Accordion, EmptyState, Skeleton } from '@spexop/react/display';
```

**After (v0.4)**:

```tsx
import { Accordion } from '@spexop/react/layout';
import { EmptyState, Skeleton } from '@spexop/react/feedback';
// or import all from main package
import { Accordion, EmptyState, Skeleton } from '@spexop/react';
```

### 3. Animation Hooks Location

**Before (v0.3)**:

```tsx
import { useIntersectionObserver } from '@spexop/react/animations';
```

**After (v0.4)**:

```tsx
import { useIntersectionObserver } from '@spexop/react';
// or
import { useIntersectionObserver } from '@spexop/react/hooks';
```

### 4. Settings Components

**Before (v0.3)**:

```tsx
import { SettingItem, SettingsPanel } from '@spexop/react/settings';
```

**After (v0.4)**:

```tsx
import { SettingItem } from '@spexop/react/forms';
import { SettingsPanel } from '@spexop/react/layout';
// or import all from main package
import { SettingItem, SettingsPanel } from '@spexop/react';
```

## UI/UX Improvements (Non-Breaking)

### Accessibility Enhancements

All components now meet WCAG AAA compliance standards:

- **Touch Targets**: All interactive elements are minimum 44x44px
- **Focus Indicators**: Enhanced 2px solid outline with 2px offset
- **Color Contrast**: Improved contrast ratios for better readability
- **Screen Reader Support**: Better ARIA labels and live regions
- **Keyboard Navigation**: Complete keyboard accessibility

### Mobile Optimization

Significant improvements for mobile devices:

- **Safe Area Insets**: Respects notch and home indicator on mobile devices
- **Dynamic Viewport Height**: Uses `100dvh` for proper mobile height calculations
- **Touch Feedback**: Better touch interactions with active state scaling
- **Responsive Layouts**: Improved mobile layouts for all components
- **Mobile Typography**: 16px minimum font size to prevent iOS zoom

### Visual Polish

Enhanced visual consistency and performance:

- **Animation Performance**: 60fps animations using CSS transforms
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference
- **High Contrast Mode**: Enhanced support for high contrast displays
- **Loading States**: Better loading indicators for async components
- **Error States**: Improved error messaging and visual feedback

### Performance Improvements

- **Bundle Size**: 10-15% reduction in bundle size
- **Tree Shaking**: Better tree-shaking with improved exports
- **Animation Performance**: Hardware-accelerated animations
- **Touch Scrolling**: Smooth scrolling with momentum on mobile

## Migration Tools

### 1. Find and Replace

Use these patterns to update your imports:

```bash
# Update specialized card imports
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/import { BlogCard, ProductCard, PricingCard } from/\/\/ TODO: Replace with Card composition patterns/g'

# Update advanced/ imports
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/from "@spexop\/react\/advanced"/from "@spexop\/react"/g'

# Update display/ imports
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/from "@spexop\/react\/display"/from "@spexop\/react"/g'

# Update animation hook imports
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/from "@spexop\/react\/animations"/from "@spexop\/react"/g'
```

### 2. TypeScript Codemod

Create a codemod to automatically update imports:

```typescript
// codemod.ts
import { transform } from '@codemod/core';

const codemod = {
  name: 'spexop-v0.4-migration',
  transform: ({ source, path }) => {
    // Update import statements
    let newSource = source
      .replace(
        /import\s*{\s*([^}]+)\s*}\s*from\s*['"]@spexop\/react\/advanced['"]/g,
        'import { $1 } from \'@spexop/react\''
      )
      .replace(
        /import\s*{\s*([^}]+)\s*}\s*from\s*['"]@spexop\/react\/display['"]/g,
        'import { $1 } from \'@spexop/react\''
      );
    
    return { source: newSource };
  }
};
```

## Step-by-Step Migration

### Step 1: Update Package Version

```bash
npm install @spexop/react@^0.4.0
# or
pnpm add @spexop/react@^0.4.0
```

### Step 2: Update Imports

Replace all specific category imports with main package imports:

```tsx
// Before
import { Button } from '@spexop/react/buttons';
import { Card } from '@spexop/react/cards';
import { Navigation } from '@spexop/react/advanced';

// After
import { Button, Card, Navigation } from '@spexop/react';
```

### Step 3: Replace Specialized Cards

For each specialized card component:

1. **Find the pattern**: Look in `src/patterns/cards/` for the equivalent
2. **Copy the code**: Copy the composition example
3. **Update imports**: Import the primitives you need
4. **Customize**: Adjust for your specific needs

Example migration:

```tsx
// Before: BlogCard component
<BlogCard
  title="Getting Started"
  author="Jane Doe"
  date="2025-10-22"
  tags={["Tutorial", "React"]}
/>

// After: Card composition
<Card variant="basic">
  <CardHeader>
    <h3>Getting Started</h3>
  </CardHeader>
  <CardBody>
    <div className="blog-meta">
      <Avatar name="Jane Doe" />
      <span>Jane Doe</span>
      <time>2025-10-22</time>
    </div>
    <div className="blog-tags">
      <Badge>Tutorial</Badge>
      <Badge>React</Badge>
    </div>
  </CardBody>
</Card>
```

### Step 4: Update CSS

If you have custom CSS targeting the old components:

```css
/* Before */
.blog-card { /* styles */ }
.product-card { /* styles */ }

/* After - use your own classes */
.my-blog-card { /* styles */ }
.my-product-card { /* styles */ }
```

### Step 5: Test Your Application

1. **Build verification**: Ensure TypeScript compiles
2. **Import verification**: Check all imports resolve correctly
3. **Visual verification**: Ensure UI looks the same
4. **Functionality verification**: Test all interactions work

## Common Issues and Solutions

### Issue: "Module not found" errors

**Solution**: Update import paths to use main package:

```tsx
// ❌ This will fail
import { Navigation } from '@spexop/react/advanced';

// ✅ Use this instead
import { Navigation } from '@spexop/react';
```

### Issue: Specialized card components missing

**Solution**: Use composition patterns from `src/patterns/cards/`:

```tsx
// ❌ This will fail
import { BlogCard } from '@spexop/react';

// ✅ Use composition instead
import { Card, CardHeader, CardBody, Avatar, Badge } from '@spexop/react';
// Then compose your own BlogCard using the pattern
```

### Issue: Animation hooks not found

**Solution**: Import from main package or hooks directory:

```tsx
// ❌ This will fail
import { useIntersectionObserver } from '@spexop/react/animations';

// ✅ Use this instead
import { useIntersectionObserver } from '@spexop/react';
```

### Issue: TypeScript errors

**Solution**: Update type imports:

```tsx
// Before
import type { BlogCardProps } from '@spexop/react';

// After - create your own types
interface MyBlogCardProps {
  title: string;
  author: string;
  // ... other props
}
```

## Advanced Troubleshooting

### TypeScript Migration Issues

#### Issue: "Module has no exported member" errors

**Cause**: Import paths have changed or components were removed.

**Solution**:

```tsx
// ❌ This will fail
import { BlogCard, ProductCard } from '@spexop/react';

// ✅ Use composition patterns instead
import { Card, CardHeader, CardBody, Avatar, Badge } from '@spexop/react';
```

#### Issue: Type definitions not found

**Cause**: Type definitions moved with components.

**Solution**:

```tsx
// ❌ This will fail
import type { BlogCardProps } from '@spexop/react';

// ✅ Create your own types
interface BlogCardProps {
  title: string;
  author: string;
  date: string;
  tags: string[];
  excerpt?: string;
  imageUrl?: string;
  readTime?: string;
  href?: string;
}
```

#### Issue: CSS module classes not found

**Cause**: CSS classes may have changed or been removed.

**Solution**:

```css
/* Before - targeting specialized components */
.blog-card { /* styles */ }
.product-card { /* styles */ }

/* After - use your own classes */
.my-blog-card { /* styles */ }
.my-product-card { /* styles */ }
```

### Build and Bundle Issues

#### Issue: Bundle size increased

**Cause**: Importing entire package instead of specific components.

**Solution**:

```tsx
// ❌ This imports everything
import * as Spexop from '@spexop/react';

// ✅ Import only what you need
import { Card, CardHeader, CardBody, Button } from '@spexop/react';
```

#### Issue: Tree shaking not working

**Cause**: Incorrect import patterns.

**Solution**:

```tsx
// ❌ This prevents tree shaking
import { Card } from '@spexop/react/cards';

// ✅ This allows tree shaking
import { Card } from '@spexop/react';
```

### Runtime Issues

#### Issue: Components not rendering

**Cause**: Missing dependencies or incorrect imports.

**Solution**:

1. Check all imports are correct
2. Ensure all required components are imported
3. Verify TypeScript compilation passes
4. Check browser console for errors

#### Issue: Styling not applied

**Cause**: CSS modules not loading or theme not applied.

**Solution**:

1. Ensure theme is configured (use `useThemeUtil` or `generateCSS` instead of deprecated `ThemeProvider`)
2. Check CSS modules are being imported
3. Verify theme tokens are available
4. Check for CSS conflicts

### Mobile-Specific Issues

#### Issue: Touch targets too small

**Cause**: Custom CSS overriding component styles.

**Solution**:

```css
/* Ensure minimum touch target size */
.my-button {
  min-height: 44px;
  min-width: 44px;
}
```

#### Issue: Safe area insets not working

**Cause**: Missing CSS environment variables support.

**Solution**:

```css
/* Add safe area support */
.my-component {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

## TypeScript Migration Guide

### Updating Type Definitions

#### 1. Component Props

**Before (v0.3)**:

```tsx
import { BlogCard } from '@spexop/react';

interface MyComponentProps {
  blog: BlogCardProps;
}
```

**After (v0.4)**:

```tsx
import { Card, CardHeader, CardBody } from '@spexop/react';

interface BlogCardProps {
  title: string;
  author: string;
  date: string;
  tags: string[];
  excerpt?: string;
  imageUrl?: string;
  readTime?: string;
  href?: string;
}

interface MyComponentProps {
  blog: BlogCardProps;
}
```

#### 2. Event Handlers

**Before (v0.3)**:

```tsx
import { BlogCard } from '@spexop/react';

const handleBlogClick = (blog: BlogCardProps) => {
  // Handle click
};
```

**After (v0.4)**:

```tsx
import { Card, CardHeader, CardBody } from '@spexop/react';

interface BlogCardProps {
  title: string;
  author: string;
  date: string;
  tags: string[];
  excerpt?: string;
  imageUrl?: string;
  readTime?: string;
  href?: string;
}

const handleBlogClick = (blog: BlogCardProps) => {
  // Handle click
};
```

#### 3. Generic Components

**Before (v0.3)**:

```tsx
import { BlogCard, ProductCard } from '@spexop/react';

type CardType = 'blog' | 'product';
type CardProps = BlogCardProps | ProductCardProps;
```

**After (v0.4)**:

```tsx
import { Card, CardHeader, CardBody } from '@spexop/react';

interface BlogCardProps {
  title: string;
  author: string;
  date: string;
  tags: string[];
}

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  rating?: number;
}

type CardType = 'blog' | 'product';
type CardProps = BlogCardProps | ProductCardProps;
```

### TypeScript Configuration

#### tsconfig.json Updates

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "jsx": "react-jsx"
  }
}
```

#### Type Declaration Files

Create a `types/spexop.d.ts` file:

```typescript
declare module '@spexop/react' {
  export * from '@spexop/react/basic';
  export * from '@spexop/react/hooks';
  // Providers are deprecated in v0.6.0+
  // Use utilities instead: useToastUtil, useModalUtil, useThemeUtil, etc.
  // See: docs/migrations/from-providers-to-utilities.md
  export * from '@spexop/react/utils';
}

declare module '@spexop/react/basic' {
  // Re-export all basic components
  export * from './buttons';
  export * from './cards';
  export * from './data';
  export * from './feedback';
  export * from './forms';
  export * from './indicators';
  export * from './layout';
  export * from './navigation';
  export * from './overlays';
  export * from './primitives';
  export * from './typography';
  export * from './utils';
}
```

## Benefits of Migration

### 1. **Better Discoverability**

- Components are in logical categories
- No more confusing "advanced" folder
- Clear separation of concerns

### 2. **Improved Maintainability**

- Fewer components to maintain
- Clear composition patterns
- Easier to understand and modify

### 3. **Better Performance**

- Smaller bundle size (fewer specialized components)
- Better tree-shaking
- More efficient imports

### 4. **Enhanced Flexibility**

- Compose exactly what you need
- No opinionated constraints
- Easy to customize

## Getting Help

If you encounter issues during migration:

1. **Check the patterns**: Look in `src/patterns/cards/` for examples
2. **Review the documentation**: Each component has updated docs
3. **Open an issue**: Report problems on GitHub
4. **Join the community**: Get help in Discord/Slack

### Rollback Plan for v0.3.x

If you need to rollback:

1. **Downgrade package**: `npm install @spexop/react@^0.3.0`
2. **Revert changes**: Use git to revert your migration changes
3. **Test thoroughly**: Ensure everything works as before

## Timeline

- **v0.3.x**: Deprecation warnings added
- **v0.4.0**: Breaking changes released
- **v0.4.1+**: Bug fixes and improvements

## Support

- **Documentation**: [spexop.com/docs](https://spexop.com/docs)
- **GitHub**: [github.com/spexop-ui/spexop-design-system](https://github.com/spexop-ui/spexop-design-system)
- **Discord**: [discord.gg/spexop](https://discord.gg/spexop)

---

**Need help?** Open an issue or reach out to the community. We're here to help make your migration smooth!
