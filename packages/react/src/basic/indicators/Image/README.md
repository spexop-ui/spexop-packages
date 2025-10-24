# Image

Optimized image component with lazy loading, responsive srcset, and modern format support.

## Features

- Lazy loading with IntersectionObserver
- Responsive srcset generation
- Modern format support (WebP, AVIF)
- Blur-up placeholder (LQIP)
- Shimmer loading skeleton
- Aspect ratio preservation
- Error fallback handling
- SEO-friendly alt text
- Priority loading support

## Installation

```bash
npm install @spexop/react
```

## Basic Usage

```tsx
import { Image } from '@spexop/react';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1600}
  height={900}
/>
```

## Lazy Loading

```tsx
<Image
  src="/image.jpg"
  alt="Lazy loaded image"
  lazy
  placeholder="shimmer"
/>
```

## Responsive Images

```tsx
<Image
  src="/image.jpg"
  alt="Responsive image"
  sources={[
    { src: '/image-480.jpg', width: 480 },
    { src: '/image-800.jpg', width: 800 },
    { src: '/image-1200.jpg', width: 1200 }
  ]}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## Blur Placeholder

```tsx
<Image
  src="/full-image.jpg"
  alt="Image with blur placeholder"
  placeholder="blur"
  blurDataURL="/blur-placeholder.jpg"
/>
```

## Modern Formats

```tsx
<Image
  src="/image.jpg"
  alt="Modern format support"
  formats={['avif', 'webp', 'jpeg']}
  sources={[
    { src: '/image-800.jpg', width: 800 },
    { src: '/image-1200.jpg', width: 1200 }
  ]}
/>
```

## Aspect Ratio

```tsx
<Image
  src="/image.jpg"
  alt="16:9 aspect ratio"
  aspectRatio="16/9"
  objectFit="cover"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | required | Image source URL |
| alt | string | required | Alternative text |
| width | number | - | Image width in pixels |
| height | number | - | Image height in pixels |
| lazy | boolean | true | Enable lazy loading |
| placeholder | 'blur' \| 'shimmer' \| 'none' | 'none' | Placeholder type |
| blurDataURL | string | - | Blur placeholder URL |
| sources | ImageSource[] | [] | Responsive sources |
| sizes | string | - | Sizes attribute |
| formats | ImageFormat[] | ['webp', 'jpeg'] | Image formats to try |
| objectFit | ObjectFit | 'cover' | CSS object-fit property |
| objectPosition | string | - | CSS object-position |
| showSkeleton | boolean | true | Show loading skeleton |
| fallbackSrc | string | - | Fallback image on error |
| priority | boolean | false | Priority loading |
| aspectRatio | string | - | Aspect ratio (e.g., "16/9") |
| className | string | - | Additional CSS class |
| onLoad | () => void | - | Load callback |
| onError | () => void | - | Error callback |

## Design Principles

Following "The Spexop Way":

- **Principle 4: Tokens before magic numbers** - Uses design tokens
- **Principle 6: Standards before frameworks** - Uses native picture element
- **Principle 7: Accessibility before aesthetics** - Proper alt text and ARIA

## Accessibility

- Required alt text
- ARIA labels for loading states
- Reduced motion support
- High contrast mode support
- Screen reader friendly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
