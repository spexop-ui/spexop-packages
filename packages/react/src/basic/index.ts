/**
 * Spexop React Components - Basic Package
 *
 * Complete collection of production-ready React components.
 * 60+ components organized into logical categories.
 *
 * @packageName @spexop/react
 * @version 0.1.0
 * @license MIT
 */

// Animation Components (8 components)
export * from "./animations/index.js";
// Button Components (7 components)
export * from "./buttons/index.js";
// Card Components (1 base component + sub-components)
export * from "./cards/index.js";
// Data Components (2 components)
export * from "./data/index.js";
// Display Components (6 components) - exclude IconProps to avoid conflict
export {
  ActivityStream,
  Avatar,
  Badge,
  Carousel,
  CodeBlock,
  Divider,
  Icon,
  KeyboardShortcut,
  ThemeToggle,
  IconButton,
} from "./indicators/index.js";
// Feedback Components (7 components)
export * from "./feedback/index.js";
// Form Components (8 components)
export * from "./forms/index.js";
// Layout Components (7 components)
export * from "./layout/index.js";
// Navigation Components (12 components)
export * from "./navigation/index.js";
// Overlay Components (8 components)
export * from "./overlays/index.js";
// Grid Primitives (5 components)
export * from "./primitives/index.js";
// Typography Components (2 components)
export * from "./typography/index.js";
// Utility Components (1 component)
export * from "./utils/index.js";
