# Image Usage Guide

Comprehensive guide for the Image component.

## Performance Optimization

### Lazy Loading

Images outside viewport are loaded only when scrolled into view:

```tsx
<Image
  src="/image.jpg"
  alt="Lazy loaded"
  lazy
  placeholder="shimmer"
/>
```

### Priority Loading

Disable lazy loading for above-the-fold images:

```tsx
<Image
  src="/hero.jpg"
  alt="Hero image"
  priority
  width={1600}
  height={900}
/>
```

### Responsive Images

Serve appropriate image sizes based on viewport:

```tsx
<Image
  src="/image-1200.jpg"
  alt="Responsive image"
  sources={[
    { src: '/image-480.jpg', width: 480 },
    { src: '/image-800.jpg', width: 800 },
    { src: '/image-1200.jpg', width: 1200 },
    { src: '/image-1600.jpg', width: 1600 }
  ]}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
/>
```

### Modern Formats

Browser automatically selects best format:

```tsx
<Image
  src="/image.jpg"
  alt="Modern formats"
  formats={['avif', 'webp', 'jpeg']}
  sources={[
    { src: '/image-800.jpg', width: 800 },
    { src: '/image-1200.jpg', width: 1200 }
  ]}
/>
```

## Placeholders

### Blur Placeholder

Low-quality image placeholder with blur effect:

```tsx
<Image
  src="/full-quality.jpg"
  alt="Blur placeholder"
  placeholder="blur"
  blurDataURL="/tiny-placeholder.jpg"
  width={1200}
  height={800}
/>
```

### Shimmer Skeleton

Animated loading skeleton:

```tsx
<Image
  src="/image.jpg"
  alt="Shimmer skeleton"
  placeholder="shimmer"
  showSkeleton
  aspectRatio="16/9"
/>
```

## Layout Control

### Aspect Ratio

Maintain consistent aspect ratio:

```tsx
// 16:9 aspect ratio
<Image
  src="/video-thumbnail.jpg"
  alt="Video thumbnail"
  aspectRatio="16/9"
  objectFit="cover"
/>

// 4:3 aspect ratio
<Image
  src="/photo.jpg"
  alt="Photo"
  aspectRatio="4/3"
  objectFit="cover"
/>

// Square (1:1)
<Image
  src="/avatar.jpg"
  alt="Avatar"
  aspectRatio="1/1"
  objectFit="cover"
/>
```

### Object Fit

Control how image fills container:

```tsx
// Cover (default) - fills container, may crop
<Image
  src="/image.jpg"
  alt="Cover"
  objectFit="cover"
/>

// Contain - fits within container, no cropping
<Image
  src="/image.jpg"
  alt="Contain"
  objectFit="contain"
/>

// Fill - stretches to fill container
<Image
  src="/image.jpg"
  alt="Fill"
  objectFit="fill"
/>
```

### Object Position

Control image positioning:

```tsx
<Image
  src="/portrait.jpg"
  alt="Portrait"
  objectFit="cover"
  objectPosition="top center"
  aspectRatio="1/1"
/>
```

## Error Handling

### Fallback Image

Show fallback image on load error:

```tsx
<Image
  src="/might-fail.jpg"
  alt="With fallback"
  fallbackSrc="/placeholder.jpg"
/>
```

### Error Callback

Handle errors programmatically:

```tsx
<Image
  src="/image.jpg"
  alt="Error handling"
  onError={() => {
    console.error('Image failed to load');
    // Track error, show notification, etc.
  }}
/>
```

## Common Patterns

### Hero Image

```tsx
<Image
  src="/hero.jpg"
  alt="Welcome to our site"
  width={1920}
  height={1080}
  priority
  objectFit="cover"
  aspectRatio="16/9"
/>
```

### Gallery Thumbnail

```tsx
<Image
  src="/gallery/photo-1.jpg"
  alt="Gallery photo 1"
  width={300}
  height={300}
  lazy
  placeholder="blur"
  blurDataURL="/gallery/photo-1-blur.jpg"
  aspectRatio="1/1"
  objectFit="cover"
/>
```

### Product Image

```tsx
<Image
  src="/products/item-1.jpg"
  alt="Product name"
  sources={[
    { src: '/products/item-1-300.jpg', width: 300 },
    { src: '/products/item-1-600.jpg', width: 600 },
    { src: '/products/item-1-900.jpg', width: 900 }
  ]}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
  aspectRatio="1/1"
  placeholder="shimmer"
/>
```

### Avatar

```tsx
<Image
  src="/avatars/user-123.jpg"
  alt="User name"
  width={100}
  height={100}
  aspectRatio="1/1"
  objectFit="cover"
  fallbackSrc="/avatars/default.jpg"
/>
```

### Blog Post Cover

```tsx
<Image
  src="/blog/post-cover.jpg"
  alt="Blog post title"
  width={1200}
  height={630}
  aspectRatio="1.91/1"
  placeholder="blur"
  blurDataURL="/blog/post-cover-blur.jpg"
  formats={['avif', 'webp', 'jpeg']}
/>
```

## Best Practices

### 1. Always Provide Alt Text

```tsx
// Good
<Image src="/image.jpg" alt="Descriptive text" />

// Bad
<Image src="/image.jpg" alt="" />
```

### 2. Use Priority for Above-the-Fold

```tsx
// Hero image - above the fold
<Image src="/hero.jpg" alt="Hero" priority />

// Content below fold
<Image src="/content.jpg" alt="Content" lazy />
```

### 3. Optimize Image Sizes

```tsx
// Provide multiple sizes for responsiveness
<Image
  src="/image.jpg"
  alt="Optimized"
  sources={[
    { src: '/image-sm.jpg', width: 640 },
    { src: '/image-md.jpg', width: 1024 },
    { src: '/image-lg.jpg', width: 1920 }
  ]}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### 4. Use Modern Formats

```tsx
<Image
  src="/image.jpg"
  alt="Modern formats"
  formats={['avif', 'webp', 'jpeg']}
  sources={[...]}
/>
```

### 5. Maintain Aspect Ratios

```tsx
// Prevents layout shift during loading
<Image
  src="/image.jpg"
  alt="Fixed aspect ratio"
  aspectRatio="16/9"
/>
```

## Performance Tips

1. Use appropriate image sizes
2. Enable lazy loading for below-fold images
3. Use modern formats (AVIF, WebP)
4. Implement responsive images
5. Add blur placeholders for better UX
6. Set explicit dimensions to prevent layout shift
7. Use CDN for image delivery
8. Compress images before upload
