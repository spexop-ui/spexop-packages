# Migration Guide: v0.3 to v0.4

**Breaking Changes**: Component Structure Reorganization

This guide helps you migrate from Spexop React v0.3 to v0.4, which includes a major reorganization of the component structure to improve discoverability and align with "Primitives before patterns" principles.

## Overview of Changes

### What Changed

1. **Eliminated "advanced" category** - Components moved to semantically correct categories
2. **Removed specialized card components** - Replaced with composition patterns
3. **Consolidated navigation components** - All navigation components now in `navigation/`
4. **Moved animation hooks** - All hooks now in `hooks/` directory
5. **Reorganized display components** - Renamed to `indicators/` for clarity

### What Stayed the Same

- All component APIs remain unchanged
- All props and functionality preserved
- Design tokens and theme system unchanged
- CSS classes and styling unchanged

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

## Rollback Plan

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
