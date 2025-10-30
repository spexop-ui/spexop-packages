# Changelog

All notable changes to `@spexop/icons` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-10-03

### Initial Release

First public release of the Spexop Icons package - a lightweight, framework-agnostic SVG icon library.

### ✨ Features

- **Comprehensive Icon Set**: Multiple icon categories covering all common UI needs
- **Framework-Agnostic**: Works with React, Vue, Angular, Svelte, or vanilla JavaScript
- **Zero Dependencies**: No runtime dependencies, just pure SVG strings
- **TypeScript First**: Full TypeScript support with proper typing
- **Tree-Shakeable**: Import only the icons you need
- **Accessible**: All icons include proper ARIA labels and semantic markup
- **Performant**: Optimized SVG paths with minimal file sizes
- **Customizable**: Uses `currentColor` for easy styling

### 📦 Icon Categories

#### 🚀 Alert Icons
- Standard variants: Info, Success, Warning, Error
- Solid variants: InfoSolid, SuccessSolid, WarningSolid, ErrorSolid
- Dual-tone design for visual hierarchy
- Perfect for notifications and alerts

#### 🧭 Navigation Icons
- Directional: Arrow (Up, Down, Left, Right)
- Directional: Chevron (Up, Down, Left, Right)
- Menu controls: Menu, Close, Home
- Link indicators: ExternalLink

#### ⚡ Action Icons
- Common actions: Search, Plus, Edit, Delete
- Settings: Settings, Filter, Refresh
- Data: Copy, Download, Upload
- Menu: MoreHorizontal, MoreVertical

#### 🎨 UI Icons
- Status: Check, X
- Favorites: Heart, HeartFilled, Star, StarFilled
- Visibility: Eye, EyeOff
- Security: Lock, Unlock
- Profile: User, Users
- System: Bell, Calendar, Clock

#### 📁 File Icons
- Documents: File, FileText
- Folders: Folder, FolderOpen
- Media: Image, Code
- Storage: Database, Archive
- Bookmarks: Bookmark, BookmarkFilled

#### 💬 Communication Icons
- Messaging: Mail, MessageCircle, MessageSquare
- Calls: Phone, Video
- Sharing: Send, Share, Link
- Mentions: AtSign

#### 🌐 Social Icons
- Platforms: GitHub, Twitter, LinkedIn, Facebook
- Media: Instagram, YouTube
- Tools: Slack, Figma

### 🛠️ Technical Details

- **Export Formats**: ESM with TypeScript definitions
- **Icon Size**: Consistent viewBox for predictable scaling
- **Accessibility**: WCAG 2.2 compliant with proper ARIA labels
- **Optimization**: Minimal SVG paths, optimized for performance
- **Category Imports**: Support for importing entire categories
- **Type Safety**: Full TypeScript type definitions for all variants

### 📝 Usage

```typescript
// Import individual icons
import { SearchIcon, PlusIcon } from '@spexop/icons';

// Import from categories
import { AlertIcons } from '@spexop/icons/alert';
import { NavigationIcons } from '@spexop/icons/navigation';

// Use with any framework
document.getElementById('icon').innerHTML = SearchIcon;
```

### 🎯 Design Principles

- Consistent stroke width for visual harmony
- Standard viewBox for predictable scaling
- `currentColor` for flexible theming
- Proper ARIA labels for accessibility
- Framework-agnostic SVG strings
- Zero runtime overhead

### 🔗 Links

- **npm**: https://www.npmjs.com/package/@spexop/icons
- **Repository**: https://github.com/spexop-ui/design-system
- **Documentation**: https://www.spexop.com
- **Issues**: https://github.com/spexop-ui/design-system/issues

---

**Package**: `@spexop/icons`  
**License**: MIT  
**Compatibility**: All modern browsers and JavaScript environments

