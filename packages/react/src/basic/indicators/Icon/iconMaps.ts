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
  BarChart,
  Book,
  Box,
  Bug,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Code,
  Columns,
  Command,
  Compass,
  Copy,
  Database,
  Design,
  Download,
  Droplet,
  Edit,
  ExternalLink,
  FileText,
  GitBranch,
  GitCommit,
  GitFork,
  GitMerge,
  GitPullRequest,
  Github,
  Globe,
  Grid,
  Heart,
  HelpCircle,
  Home,
  ImageIcon,
  Info,
  Install,
  Laptop,
  Layers,
  Layout,
  MapIcon,
  MessageCircle,
  Monitor,
  Package,
  Plus,
  Refresh,
  Save,
  Search,
  Settings,
  Share2,
  Shield,
  ShoppingCart,
  SquareStack,
  Star,
  Terminal,
  Trash,
  TrendingUp,
  Type,
  Upload,
  User,
  Users,
  X,
  XTwitter,
  Zap,
} from "@spexop/icons";
import type { ComponentType } from "react";

/**
 * Icon component props interface
 * Defines the expected shape of icon components from @spexop/icons
 */
export interface IconProps {
  size?: number | string;
  strokeWidth?: number | string;
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
  Settings: Settings, // PascalCase variant
  user: User,
  heart: Heart,
  Heart: Heart, // PascalCase variant
  star: Star,
  Star: Star, // PascalCase variant
  plus: Plus,
  Plus: Plus, // PascalCase variant
  edit: Edit,
  delete: Trash,
  save: Save,
  download: Download,
  upload: Upload,
  copy: Copy,
  check: Check,
  Check: Check, // PascalCase variant
  x: X,
  info: Info,
  book: Book,
  Book: Book, // PascalCase variant (overrides FileText mapping)
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
  // Additional icons used in website - support PascalCase
  Grid: Grid,
  grid: Grid,
  // Additional icons
  Github: Github,
  github: Github,
  XTwitter: XTwitter,
  xTwitter: XTwitter,
  Bug: Bug,
  bug: Bug,
  CheckCircle: CheckCircle,
  checkCircle: CheckCircle,
  Code: Code,
  code: Code,
  ExternalLink: ExternalLink,
  externalLink: ExternalLink,
  FileText: FileText,
  fileText: FileText,
  GitBranch: GitBranch,
  gitBranch: GitBranch,
  GitCommit: GitCommit,
  gitCommit: GitCommit,
  GitFork: GitFork,
  gitFork: GitFork,
  GitPullRequest: GitPullRequest,
  gitPullRequest: GitPullRequest,
  Install: Install,
  install: Install,
  MessageCircle: MessageCircle,
  messageCircle: MessageCircle,
  Design: Design,
  design: Design,
  Layers: Layers,
  layers: Layers,
  Package: Package,
  package: Package,
  Shield: Shield,
  shield: Shield,
  Terminal: Terminal,
  terminal: Terminal,
  Zap: Zap,
  zap: Zap,
  // Rocket doesn't exist - using Zap as fallback (rocket = fast/energy)
  Rocket: Zap,
  rocket: Zap,
  // Additional missing icons
  ImageIcon: ImageIcon,
  imageIcon: ImageIcon,
  Monitor: Monitor,
  monitor: Monitor,
  ShoppingCart: ShoppingCart,
  shoppingCart: ShoppingCart,
  Users: Users,
  users: Users,
  Box: Box,
  box: Box,
  // Missing icons - add mappings
  Refresh: Refresh,
  refresh: Refresh,
  Compass: Compass,
  compass: Compass,
  Database: Database,
  database: Database,
  Palette: Droplet, // Palette doesn't exist, use Droplet (color/token icon)
  palette: Droplet,
  Globe: Globe,
  globe: Globe,
  BarChart: BarChart,
  barChart: BarChart,
  Columns: Columns,
  columns: Columns,
  Share2: Share2,
  share2: Share2,
  Command: Command,
  command: Command,
  TrendingUp: TrendingUp,
  trendingUp: TrendingUp,
  HelpCircle: HelpCircle,
  helpCircle: HelpCircle,
  GitMerge: GitMerge,
  gitMerge: GitMerge,
  Map: MapIcon, // Map icon for location/roadmap
  map: MapIcon,
  // Icon name mappings for documentation
  Home: Home, // PascalCase variant
  Download: Download, // PascalCase variant
  Edit: Edit, // PascalCase variant
  Type: Type, // PascalCase variant
  Navigation: Grid, // Navigation doesn't exist, use Grid
  navigation: Grid,
  LayoutDashboard: Layout, // LayoutDashboard doesn't exist, use Layout
  layoutDashboard: Layout,
  Pointer: SquareStack, // Pointer doesn't exist, use SquareStack
  pointer: SquareStack,
  ShieldCheck: Shield, // ShieldCheck doesn't exist, use Shield
  shieldCheck: Shield,
  Brush: Design, // Brush doesn't exist, use Design (design tool)
  brush: Design,
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
