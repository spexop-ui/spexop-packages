# Accordion Usage Guide

Complete guide for using the Accordion component from @spexop/react

## Table of Contents

- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [Configuration Options](#configuration-options)
- [Expansion Modes](#expansion-modes)
- [Keyboard Navigation](#keyboard-navigation)
- [Styling Patterns](#styling-patterns)
- [Accessibility Features](#accessibility-features)
- [Common Patterns](#common-patterns)
- [Integration Examples](#integration-examples)
- [Performance Tips](#performance-tips)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)

## Quick Start

### Installation

```bash
npm install @spexop/react @spexop/theme
```

### Basic Accordion

```tsx
import { Accordion } from '@spexop/react';

function BasicAccordion() {
  const items = [
    {
      id: '1',
      title: 'Section 1',
      content: <div>Content for section 1</div>,
    },
    {
      id: '2',
      title: 'Section 2',
      content: <div>Content for section 2</div>,
    },
    {
      id: '3',
      title: 'Section 3',
      content: <div>Content for section 3</div>,
    },
  ];

  return <Accordion items={items} />;
}
```

## Core Concepts

### Accordion Items

Each accordion item requires three properties:

```tsx
interface AccordionItem {
  id: string;              // Unique identifier
  title: React.ReactNode;  // Title displayed in header
  content: React.ReactNode; // Content revealed when expanded
  disabled?: boolean;      // Optional disabled state
}
```

### Controlled vs Uncontrolled

**Uncontrolled** (manages its own state):

```tsx
<Accordion 
  items={items}
  defaultExpandedItems={['1', '2']}
/>
```

**Controlled** (you manage state):

```tsx
const [expandedItems, setExpandedItems] = useState(['1']);

<Accordion
  items={items}
  expandedItems={expandedItems}
  onExpandedChange={setExpandedItems}
/>
```

## Configuration Options

### Size Variants

Control the overall size and spacing:

```tsx
// Small - compact spacing
<Accordion items={items} size="sm" />

// Medium - default balanced spacing
<Accordion items={items} size="md" />

// Large - generous spacing
<Accordion items={items} size="lg" />
```

### Visual Variants

Different visual styles:

```tsx
// Default - clean minimal style
<Accordion items={items} variant="default" />

// Bordered - with borders around items
<Accordion items={items} variant="bordered" />

// Separated - with spacing between items
<Accordion items={items} variant="separated" />
```

### Expansion Modes

```tsx
// Single - only one item can be expanded at a time
<Accordion items={items} allowMultiple={false} />

// Multiple - multiple items can be expanded
<Accordion items={items} allowMultiple={true} />
```

## Expansion Modes of Accessibility

### Single Expansion Mode

```tsx
function SingleExpansion() {
  const items = [
    { id: '1', title: 'Only one', content: <div>Can be open</div> },
    { id: '2', title: 'At a time', content: <div>At once</div> },
  ];

  return (
    <Accordion 
      items={items}
      allowMultiple={false} // Default behavior
    />
  );
}
```

### Multiple Expansion Mode

```tsx
function MultipleExpansion() {
  const items = [
    { id: '1', title: 'Multiple items', content: <div>Can be</div> },
    { id: '2', title: 'Can be open', content: <div>Simultaneously</div> },
  ];

  return (
    <Accordion 
      items={items}
      allowMultiple={true}
    />
  );
}
```

### Default Expanded Items

```tsx
function DefaultExpanded() {
  return (
    <Accordion
      items={items}
      defaultExpandedItems={['1', '3']} // Items 1 and 3 open by default
      allowMultiple={true}
    />
  );
}
```

## Keyboard Navigation

### Navigation Keys

- **Arrow Down** - Move focus to next item
- **Arrow Up** - Move focus to previous item
- **Home** - Move focus to first item
- **End** - Move focus to last item
- **Space/Enter** - Toggle current item
- **Tab** - Move to next focusable element

### Example

```tsx
function KeyboardAccessible() {
  const items = [
    { id: '1', title: 'Navigate with', content: <div>Arrow keys</div> },
    { id: '2', title: 'Use Home/End', content: <div>For first/last</div> },
    { id: '3', title: 'Space or Enter', content: <div>To toggle</div> },
  ];

  return <Accordion items={items} />;
}
```

## Styling Patterns

### Custom Styling

```tsx
import styles from './MyAccordion.module.css';

function StyledAccordion() {
  return (
    <Accordion
      items={items}
      className={styles.customAccordion}
      variant="bordered"
      size="lg"
    />
  );
}
```

### Size Combinations

```tsx
// Compact FAQ section
<Accordion items={faqItems} size="sm" variant="separated" />

// Standard content section
<Accordion items={contentItems} size="md" variant="bordered" />

// Prominent feature section
<Accordion items={featureItems} size="lg" variant="separated" />
```

## Accessibility Features

### Built-in ARIA Support

The Accordion component includes comprehensive ARIA attributes:

- `aria-expanded` - Indicates expansion state
- `aria-controls` - Links header to panel
- `aria-labelledby` - Links panel to header
- `role="region"` - Identifies content region
- `hidden` - Hides collapsed panels

### Screen Reader Friendly

```tsx
function AccessibleAccordion() {
  const items = [
    {
      id: '1',
      title: 'Accessible Title',
      content: (
        <div>
          <p>Screen readers will announce this content correctly</p>
        </div>
      ),
    },
  ];

  return <Accordion items={items} />;
}
```

### Disabled Items

```tsx
function DisabledItems() {
  const items = [
    { id: '1', title: 'Active Item', content: <div>Can interact</div> },
    { id: '2', title: 'Disabled Item', content: <div>Cannot interact</div>, disabled: true },
    { id: '3', title: 'Active Item', content: <div>Can interact</div> },
  ];

  return <Accordion items={items} />;
}
```

## Common Patterns

### FAQ Section

```tsx
function FAQ() {
  const faqItems = [
    {
      id: 'q1',
      title: 'What is @spexop/react?',
      content: (
        <p>
          @spexop/react is a primitives-first design system with 60+ components,
          full theme support, and modern UI/UX standards.
        </p>
      ),
    },
    {
      id: 'q2',
      title: 'How do I install it?',
      content: (
        <div>
          <p>Install using npm or pnpm:</p>
          <code>npm install @spexop/react @spexop/theme</code>
        </div>
      ),
    },
    {
      id: 'q3',
      title: 'Is it accessible?',
      content: (
        <p>
          Yes! All components are WCAG AA+ compliant with full keyboard
          navigation and screen reader support.
        </p>
      ),
    },
  ];

  return (
    <section>
      <h2>Frequently Asked Questions</h2>
      <Accordion 
        items={faqItems}
        variant="bordered"
        size="md"
      />
    </section>
  );
}
```

### Documentation Sections

```tsx
function Documentation() {
  const docSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      content: (
        <div>
          <h3>Installation</h3>
          <p>Install the required packages...</p>
        </div>
      ),
    },
    {
      id: 'configuration',
      title: 'Configuration',
      content: (
        <div>
          <h3>Theme Setup</h3>
          <p>Configure your theme...</p>
        </div>
      ),
    },
    {
      id: 'examples',
      title: 'Examples',
      content: (
        <div>
          <h3>Code Examples</h3>
          <p>See common use cases...</p>
        </div>
      ),
    },
  ];

  return (
    <Accordion
      items={docSections}
      variant="separated"
      size="lg"
      allowMultiple={true}
    />
  );
}
```

### Settings Panel

```tsx
function SettingsPanel() {
  const settingSections = [
    {
      id: 'account',
      title: 'Account Settings',
      content: (
        <div>
          <label>
            Email: <input type="email" />
          </label>
          <label>
            Username: <input type="text" />
          </label>
        </div>
      ),
    },
    {
      id: 'privacy',
      title: 'Privacy Settings',
      content: (
        <div>
          <label>
            <input type="checkbox" /> Make profile public
          </label>
          <label>
            <input type="checkbox" /> Show email address
          </label>
        </div>
      ),
    },
    {
      id: 'notifications',
      title: 'Notification Settings',
      content: (
        <div>
          <label>
            <input type="checkbox" /> Email notifications
          </label>
          <label>
            <input type="checkbox" /> Push notifications
          </label>
        </div>
      ),
    },
  ];

  return (
    <Accordion
      items={settingSections}
      variant="bordered"
      size="md"
      defaultExpandedItems={['account']}
    />
  );
}
```

## Integration Examples

### With State Management

```tsx
function StatefulAccordion() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [items, setItems] = useState(initialItems);

  const handleExpandedChange = (newExpanded: string[]) => {
    setExpandedItems(newExpanded);
    console.log('Expanded items:', newExpanded);
  };

  return (
    <div>
      <button onClick={() => setExpandedItems(['1', '2', '3'])}>
        Expand All
      </button>
      <button onClick={() => setExpandedItems([])}>
        Collapse All
      </button>
      
      <Accordion
        items={items}
        expandedItems={expandedItems}
        onExpandedChange={handleExpandedChange}
        allowMultiple={true}
      />
    </div>
  );
}
```

### With Dynamic Content

```tsx
function DynamicAccordion() {
  const [items, setItems] = useState<AccordionItem[]>([
    { id: '1', title: 'Item 1', content: <div>Content 1</div> },
  ]);

  const addItem = () => {
    const newId = String(items.length + 1);
    setItems([
      ...items,
      {
        id: newId,
        title: `Item ${newId}`,
        content: <div>Content {newId}</div>,
      },
    ]);
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <Accordion items={items} allowMultiple={true} />
    </div>
  );
}
```

### With Form Integration

```tsx
function AccordionForm() {
  const [formData, setFormData] = useState({});

  const formSections = [
    {
      id: 'personal',
      title: 'Personal Information',
      content: (
        <div>
          <input
            placeholder="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      ),
    },
    {
      id: 'address',
      title: 'Address Information',
      content: (
        <div>
          <input
            placeholder="Street"
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          />
          <input
            placeholder="City"
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
      ),
    },
  ];

  return (
    <form>
      <Accordion
        items={formSections}
        defaultExpandedItems={['personal']}
        allowMultiple={false}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Performance Tips

### Lazy Loading Content

```tsx
function LazyAccordion() {
  const items = [
    {
      id: '1',
      title: 'Heavy Content',
      content: <HeavyComponent />, // Only renders when expanded
    },
  ];

  return <Accordion items={items} />;
}
```

### Memoization

```tsx
import { useMemo } from 'react';

function OptimizedAccordion({ data }) {
  const items = useMemo(
    () =>
      data.map((item) => ({
        id: item.id,
        title: item.title,
        content: <div>{item.content}</div>,
      })),
    [data],
  );

  return <Accordion items={items} />;
}
```

### Virtual Scrolling for Many Items

```tsx
import { useState } from 'react';

function ManyItemsAccordion() {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  
  const allItems = generateManyItems(1000);
  const visibleItems = allItems.slice(visibleRange.start, visibleRange.end);

  return <Accordion items={visibleItems} />;
}
```

## Best Practices

### Do's

✅ Use unique, stable IDs for items

```tsx
const items = data.map(item => ({
  id: item.id, // Use stable ID from data
  title: item.title,
  content: <div>{item.content}</div>,
}));
```

✅ Provide meaningful titles

```tsx
const items = [
  { id: '1', title: 'Account Settings', content: <Settings /> },
  { id: '2', title: 'Privacy Settings', content: <Privacy /> },
];
```

✅ Use appropriate variants for context

```tsx
// FAQ section - bordered for clarity
<Accordion items={faqItems} variant="bordered" />

// Content sections - separated for breathing room
<Accordion items={contentItems} variant="separated" />
```

✅ Consider expansion mode based on use case

```tsx
// FAQ - single expansion to focus attention
<Accordion items={faqItems} allowMultiple={false} />

// Settings - multiple expansion for comparison
<Accordion items={settings} allowMultiple={true} />
```

### Don'ts

❌ Don't use array indices as IDs

```tsx
// Bad - indices can change
const items = data.map((item, index) => ({
  id: String(index), // Avoid this
  title: item.title,
  content: <div>{item.content}</div>,
}));
```

❌ Don't nest accordions

```tsx
// Bad - confusing UX
<Accordion items={[
  {
    id: '1',
    title: 'Parent',
    content: <Accordion items={childItems} />, // Avoid nested accordions
  },
]} />
```

❌ Don't put critical actions in collapsed content

```tsx
// Bad - users might miss important action
const items = [
  {
    id: '1',
    title: 'Hidden Action',
    content: <button>Delete Account</button>, // Should be visible
  },
];
```

❌ Don't use for navigation

```tsx
// Bad - use navigation components instead
<Accordion items={[
  { id: 'home', title: 'Home', content: <HomePage /> },
  { id: 'about', title: 'About', content: <AboutPage /> },
]} />
```

## Real-World Examples

### Help Center

```tsx
function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const helpTopics = [
    {
      id: 'getting-started',
      title: 'Getting Started with Spexop',
      content: (
        <div>
          <p>Welcome to Spexop! Here's how to get started...</p>
          <ol>
            <li>Install the packages</li>
            <li>Set up your theme</li>
            <li>Import components</li>
          </ol>
        </div>
      ),
    },
    {
      id: 'theming',
      title: 'Customizing Your Theme',
      content: (
        <div>
          <p>Learn how to customize colors, spacing, and more...</p>
          <a href="/docs/theming">View theming guide</a>
        </div>
      ),
    },
    {
      id: 'components',
      title: 'Component Documentation',
      content: (
        <div>
          <p>Explore our 60+ components...</p>
          <ul>
            <li><a href="/docs/buttons">Buttons</a></li>
            <li><a href="/docs/forms">Forms</a></li>
            <li><a href="/docs/navigation">Navigation</a></li>
          </ul>
        </div>
      ),
    },
  ];

  const filteredTopics = helpTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Help Center</h1>
      <input
        type="search"
        placeholder="Search help topics..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Accordion
        items={filteredTopics}
        variant="bordered"
        size="md"
      />
    </div>
  );
}
```

### Product Features

```tsx
function ProductFeatures() {
  const features = [
    {
      id: 'primitives',
      title: '🎨 Primitives-First Design',
      content: (
        <div>
          <p>Master foundational layout components before building complex interfaces.</p>
          <ul>
            <li>Grid system for flexible layouts</li>
            <li>Stack for spacing control</li>
            <li>Container for width constraints</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'accessibility',
      title: '♿ Accessibility First',
      content: (
        <div>
          <p>WCAG AA+ compliant with full keyboard and screen reader support.</p>
          <ul>
            <li>Comprehensive ARIA attributes</li>
            <li>Keyboard navigation</li>
            <li>Screen reader tested</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'themes',
      title: '🎭 Powerful Theming',
      content: (
        <div>
          <p>13 pre-built themes with 29+ export formats.</p>
          <ul>
            <li>CSS variables</li>
            <li>TypeScript types</li>
            <li>Runtime switching</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section>
      <h2>Why Choose Spexop?</h2>
      <Accordion
        items={features}
        variant="separated"
        size="lg"
        allowMultiple={true}
        defaultExpandedItems={['primitives']}
      />
    </section>
  );
}
```

### Account Settings

```tsx
function AccountSettings() {
  const [settings, setSettings] = useState({
    email: 'user@example.com',
    notifications: true,
    theme: 'light',
  });

  const settingSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      content: (
        <div>
          <label>
            Email
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
          </label>
          <button>Update Email</button>
        </div>
      ),
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
            />
            Enable email notifications
          </label>
          <label>
            <input type="checkbox" /> Enable push notifications
          </label>
        </div>
      ),
    },
    {
      id: 'appearance',
      title: 'Appearance',
      content: (
        <div>
          <label>
            Theme
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </label>
        </div>
      ),
    },
    {
      id: 'danger',
      title: '⚠️ Danger Zone',
      content: (
        <div>
          <p>These actions cannot be undone.</p>
          <button style={{ color: 'red' }}>Delete Account</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Account Settings</h1>
      <Accordion
        items={settingSections}
        variant="bordered"
        size="md"
        defaultExpandedItems={['profile']}
        allowMultiple={false}
      />
    </div>
  );
}
```

## Summary

The Accordion component provides:

- ✅ Flexible expansion modes (single/multiple)
- ✅ Full keyboard navigation
- ✅ WCAG AA+ accessibility
- ✅ Three size variants
- ✅ Three visual variants
- ✅ Controlled and uncontrolled modes
- ✅ Disabled items support
- ✅ Smooth animations
- ✅ Screen reader support

Perfect for FAQ sections, documentation, settings panels, and any content that benefits from progressive disclosure.
