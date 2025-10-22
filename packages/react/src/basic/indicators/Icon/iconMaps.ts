/**
 * Centralized Icon Mappings
 *
 * Single source of truth for all icon name-to-component mappings.
 * Used by Icon component, Sidebar, and other components.
 *
 * Note: Icons are now React components from @spexop/icons (npm package).
 * Use strokeWidth prop to control stroke thickness: 1.5 (default) or 1 (thin).
 */

import {
  Box,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Download,
  Droplet,
  Edit,
  FileText,
  Github,
  Grid,
  Heart,
  Home,
  Info,
  Layout,
  Package,
  Plus,
  Save,
  Search,
  Settings,
  SquareStack,
  Star,
  Trash,
  Type,
  Upload,
  User,
  X,
} from "@spexop/icons";
import type { ComponentType } from "react";

/**
 * Icon component props interface
 * Defines the expected shape of icon components from @spexop/icons
 */
export interface IconProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
}

/**
 * Icon component type
 * Note: Using ComponentType to handle React 18/19 compatibility
 * @spexop/icons uses React 18, this project uses React 19
 */
type IconComponent = ComponentType<IconProps>;

/**
 * Standard icon mapping
 * Used by Icon component and general UI elements
 *
 * Icon mapping notes:
 * - components → Grid (grid layout represents components)
 * - dashboard → Home (home represents main dashboard)
 * - button → SquareStack (stacked squares represent UI elements)
 * - card → Layout (layout represents card structure)
 * - input → Type (text/type represents input fields)
 * - tokens → Droplet (droplet represents design tokens/colors)
 * - colors → Droplet (same as tokens)
 * - typography → Type (type represents typography)
 * - docs → FileText (file with text represents documentation)
 * - book → FileText (same as docs)
 * - delete → Trash (trash can for delete action)
 */
export const ICON_MAP: Record<string, IconComponent> = {
  // UI Icons
  components: Grid,
  dashboard: Home,
  home: Home, // Alias for dashboard
  button: SquareStack,
  card: Layout,
  input: Type,
  tokens: Droplet,
  colors: Droplet,
  typography: Type,
  search: Search,
  settings: Settings,
  user: User,
  heart: Heart,
  star: Star,
  plus: Plus,
  edit: Edit,
  delete: Trash,
  save: Save,
  download: Download,
  upload: Upload,
  copy: Copy,
  check: Check,
  x: X,
  info: Info,
  book: FileText,
  docs: FileText,
  foundations: Droplet,
  // Support both camelCase and kebab-case for chevrons
  chevronLeft: ChevronLeft,
  "chevron-left": ChevronLeft,
  chevronRight: ChevronRight,
  "chevron-right": ChevronRight,
  chevronDown: ChevronDown,
  "chevron-down": ChevronDown,
  chevronUp: ChevronUp,
  "chevron-up": ChevronUp,
};

/**
 * Sidebar icon mapping (same components, use strokeWidth={1} for thin stroke)
 * Used by Sidebar component
 */
export const SIDEBAR_ICON_MAP: Record<string, IconComponent> = {
  dashboard: Home,
  components: Grid,
  button: SquareStack,
  card: Layout,
  input: Type,
  tokens: Droplet,
  colors: Droplet,
  typography: Type,
  docs: FileText,
  check: Check,
  book: FileText,
  settings: Settings,
  foundations: Droplet,
  heart: Heart,
  star: Star,
  package: Package,
  box: Box,
  layout: Layout,
  filetext: FileText,
  grid: Grid,
  user: User,
  github: Github,
  playground: Grid,
  about: User,
};

/**
 * Type for icon names (union of all keys)
 */
export type IconName = keyof typeof ICON_MAP;

/**
 * Type for sidebar icon names
 */
export type SidebarIconName = keyof typeof SIDEBAR_ICON_MAP;
