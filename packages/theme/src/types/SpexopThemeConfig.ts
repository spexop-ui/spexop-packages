/**
 * Spexop Theme Configuration
 * User-configurable aesthetic layer
 *
 * @packageDocumentation
 * @module @spexop/theme
 */

/**
 * Theme metadata
 */
export interface ThemeMeta {
  /** Theme name (e.g., "Acme Corp Design System") */
  name: string;
  /** Theme version (semantic versioning) */
  version: string;
  /** Theme author */
  author?: string;
  /** Theme description */
  description?: string;
  /** Theme tags for categorization */
  tags?: string[];
}

/**
 * Color system configuration
 */
export interface ThemeColors {
  // Primary brand colors
  /** Main brand color */
  primary: string;
  /** Primary hover state (auto-generated if not provided) */
  primaryHover?: string;
  /** Primary active state (auto-generated if not provided) */
  primaryActive?: string;
  /** Primary light variant (optional, for subtle backgrounds) */
  primaryLight?: string;
  /** Primary dark variant (optional, for text on light backgrounds) */
  primaryDark?: string;

  // Secondary colors
  /** Secondary brand color */
  secondary?: string;
  /** Secondary hover state */
  secondaryHover?: string;
  /** Secondary active state */
  secondaryActive?: string;
  /** Secondary light variant (optional, for subtle backgrounds) */
  secondaryLight?: string;
  /** Secondary dark variant (optional, for text on light backgrounds) */
  secondaryDark?: string;

  // Surface colors (backgrounds)
  /** Main background color */
  surface: string;
  /** Card/panel background color */
  surfaceSecondary: string;
  /** Hover state for interactive surfaces */
  surfaceHover: string;

  // Text colors
  /** Primary text color */
  text: string;
  /** Secondary text (subtitles, captions) */
  textSecondary: string;
  /** Muted text (disabled, placeholder) */
  textMuted: string;
  /** Tertiary text (least emphasis, optional) */
  textTertiary?: string;
  /** Inverted text color (for dark backgrounds, optional) */
  textInverted?: string;

  // Border colors
  /** Default border color */
  border: string;
  /** Strong emphasis borders */
  borderStrong: string;
  /** Subtle dividers */
  borderSubtle: string;

  // Semantic colors (optional)
  /** Success state color */
  success?: string;
  /** Success light variant (for backgrounds) */
  successLight?: string;
  /** Success dark variant (for text on light backgrounds) */
  successDark?: string;
  /** Warning state color */
  warning?: string;
  /** Warning light variant (for backgrounds) */
  warningLight?: string;
  /** Warning dark variant (for text on light backgrounds) */
  warningDark?: string;
  /** Error state color */
  error?: string;
  /** Error light variant (for backgrounds) */
  errorLight?: string;
  /** Error dark variant (for text on light backgrounds) */
  errorDark?: string;
  /** Info state color */
  info?: string;
  /** Info light variant (for backgrounds) */
  infoLight?: string;
  /** Info dark variant (for text on light backgrounds) */
  infoDark?: string;

  // Accent colors (for special highlights)
  /** Accent color for special emphasis */
  accent?: string;
  /** Accent hover state */
  accentHover?: string;
  /** Accent active state */
  accentActive?: string;

  // Link colors
  /** Hyperlink color */
  link?: string;
  /** Link hover state */
  linkHover?: string;
  /** Link active/visited state */
  linkActive?: string;

  // Interactive state colors
  /** Focus ring color (for keyboard navigation) */
  focus?: string;
  /** Generic hover overlay color */
  hover?: string;

  // Overlay/backdrop colors
  /** Overlay color for modals, tooltips */
  overlay?: string;
  /** Backdrop color for dimming background */
  backdrop?: string;

  // Neutral colors (additional gray scale control)
  /** Neutral color for balanced UI elements */
  neutral?: string;
  /** Neutral hover state */
  neutralHover?: string;
  /** Neutral active state */
  neutralActive?: string;
}

/**
 * Typography scale configuration
 */
export interface TypographySizes {
  xs2: number; // Extra small for breadcrumbs, captions
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
  "4xl": number;
  "5xl": number;
  "6xl": number;
}

/**
 * Font weight configuration
 */
export interface FontWeights {
  /** Regular weight (typically 400) */
  regular: number;
  /** Medium weight (typically 500) */
  medium: number;
  /** Semi-bold weight (typically 600) */
  semibold: number;
  /** Bold weight (typically 700) */
  bold: number;
}

/**
 * Line height configuration
 */
export interface LineHeights {
  /** Tight line height (typically 1.2) */
  tight: number;
  /** Snug line height (typically 1.375) */
  snug: number;
  /** Normal line height (typically 1.5) */
  normal: number;
  /** Relaxed line height (typically 1.75) */
  relaxed: number;
}

/**
 * Typography system configuration
 */
export interface ThemeTypography {
  // Font families
  /** Body font family */
  fontFamily: string;
  /** Heading font family (defaults to body font) */
  fontFamilyHeading?: string;
  /** Monospace font family for code */
  fontFamilyMono?: string;

  // Type scale
  /** Base font size in pixels */
  baseSize: number;
  /** Scale ratio (e.g., 1.25 for minor third) */
  scale: number;

  /** Custom size scale (overrides baseSize + scale) */
  sizes?: Partial<TypographySizes>;

  /** Font weights */
  weights: FontWeights;

  /** Line heights */
  lineHeights: LineHeights;
}

/**
 * Spacing scale values
 */
export interface SpacingValues {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  12: number;
}

/**
 * Spacing system configuration
 */
export interface ThemeSpacing {
  /** Base spacing unit in pixels */
  baseUnit: number;

  /** Auto-generated scale (multiples of baseUnit) */
  scale?: number[];

  /** Named scale values (overrides auto-generation) */
  values?: Partial<SpacingValues>;
}

/**
 * Border system configuration
 */
export interface ThemeBorders {
  // Border widths
  /** Thin border (typically 1px) */
  thin: number;
  /** Default border width (typically 2px) */
  default: number;
  /** Thick border (typically 4px) */
  thick: number;

  // Border radius
  /** Subtle radius (typically 4px) */
  radiusSubtle: number;
  /** Relaxed radius (typically 8px) */
  radiusRelaxed: number;
  /** Pill radius (9999px for fully rounded) */
  radiusPill: number;
  /** Liquid/squircle radius (optional, typically 16-24px for large elements) */
  radiusLiquid?: number;

  /** Default border style */
  defaultStyle: "solid" | "dashed" | "dotted";
}

/**
 * Extended radius system for additional sizing options
 */
export interface ThemeRadii {
  /** No radius (0) */
  none?: number;
  /** Small radius (typically 4px) */
  sm?: number;
  /** Medium radius (typically 8px) */
  md?: number;
  /** Large radius (typically 12px) */
  lg?: number;
  /** Extra large radius (typically 16px) */
  xl?: number;
  /** 2XL radius (typically 20px) */
  "2xl"?: number;
  /** Full/pill radius (9999px) */
  full?: number;
}

/**
 * Shadow system configuration
 */
export interface ThemeShadows {
  /** No shadow */
  none?: string;
  /** Small subtle shadow */
  sm?: string;
  /** Medium shadow (default for most elevated elements) */
  md?: string;
  /** Large shadow (for prominent overlays) */
  lg?: string;
  /** Extra large shadow (for modals and prominent panels) */
  xl?: string;
}

/**
 * Z-index layering system
 */
export interface ThemeZIndex {
  /** Base level (default page content) */
  base?: number;
  /** Dropdown menus */
  dropdown?: number;
  /** Sticky elements */
  sticky?: number;
  /** Fixed position elements */
  fixed?: number;
  /** Modal overlays */
  modal?: number;
  /** Popover menus */
  popover?: number;
  /** Tooltips */
  tooltip?: number;
  /** Toast notifications */
  toast?: number;
}

/**
 * Responsive breakpoints
 */
export interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

/**
 * Fluid typography configuration for responsive text sizing
 */
export interface FluidTypography {
  /** Enable fluid typography */
  enabled: boolean;
  /** Minimum viewport width (px) where fluid sizing starts */
  minViewport?: number;
  /** Maximum viewport width (px) where fluid sizing ends */
  maxViewport?: number;
  /** Minimum font size multiplier (default: 0.8) */
  minSizeMultiplier?: number;
  /** Maximum font size multiplier (default: 1.2) */
  maxSizeMultiplier?: number;
  /** Custom fluid size mappings */
  customSizes?: {
    [key: string]: {
      min: number;
      max: number;
    };
  };
}

/**
 * Animation duration tokens
 */
export interface ThemeAnimations {
  /** Animation durations in milliseconds */
  durations?: {
    /** Very fast animations (100-150ms) */
    fast?: number;
    /** Normal animations (200-300ms) */
    normal?: number;
    /** Slow animations (400-500ms) */
    slow?: number;
    /** Very slow animations (600-800ms) */
    slower?: number;
  };

  /** Easing functions */
  easings?: {
    /** Ease-in timing function */
    easeIn?: string;
    /** Ease-out timing function */
    easeOut?: string;
    /** Ease-in-out timing function */
    easeInOut?: string;
    /** Linear timing function */
    linear?: string;
    /** Custom cubic-bezier values */
    [key: string]: string | undefined;
  };

  /** Pre-configured transitions */
  transitions?: {
    /** Default transition */
    default?: string;
    /** Fast transition */
    fast?: string;
    /** Slow transition */
    slow?: string;
    /** Custom transitions */
    [key: string]: string | undefined;
  };
}

/**
 * Opacity tokens
 */
export interface ThemeOpacity {
  /** Disabled state opacity (0.4-0.5) */
  disabled?: number;
  /** Hover state opacity (0.8-0.9) */
  hover?: number;
  /** Overlay/modal backdrop opacity (0.4-0.6) */
  overlay?: number;
  /** Subtle emphasis opacity (0.6-0.7) */
  subtle?: number;
  /** Muted/secondary opacity (0.7-0.8) */
  muted?: number;
  /** Custom opacity values */
  [key: string]: number | undefined;
}

/**
 * Grid system tokens
 */
export interface ThemeGrid {
  /** Number of grid columns (typically 12) */
  columns?: number;
  /** Gutter width between columns in pixels */
  gutterWidth?: number;
  /** Maximum container width in pixels */
  containerMaxWidth?: number;
  /** Column gap (spacing between columns) */
  columnGap?: number;
  /** Row gap (spacing between rows) */
  rowGap?: number;
  /** Responsive breakpoint-specific grids */
  responsive?: {
    [breakpoint: string]: {
      columns?: number;
      gutterWidth?: number;
      containerMaxWidth?: number;
    };
  };
}

/**
 * Button variant styling
 */
export interface ButtonVariantStyle {
  /** Button background color */
  background: string;
  /** Button text color */
  text: string;
  /** Button border color */
  border: string;
  /** Hover state background */
  backgroundHover?: string;
  /** Hover state text color */
  textHover?: string;
  /** Hover state border color */
  borderHover?: string;
  /** Active state background */
  backgroundActive?: string;
  /** Active state text color */
  textActive?: string;
  /** Active state border color */
  borderActive?: string;
}

/**
 * Button styling configuration
 */
export interface ThemeButtons {
  /** Primary button styling */
  primary?: Partial<ButtonVariantStyle>;
  /** Secondary button styling */
  secondary?: Partial<ButtonVariantStyle>;
  /** Outline button styling */
  outline?: Partial<ButtonVariantStyle>;
  /** Ghost/transparent button styling */
  ghost?: Partial<ButtonVariantStyle>;
  /** Text-only button styling */
  text?: Partial<ButtonVariantStyle>;
  /** Pill button styling (rounded pill shape) */
  pill?: Partial<ButtonVariantStyle>;
  /** Border-emphasis button styling (bold 3px border) */
  "border-emphasis"?: Partial<ButtonVariantStyle>;
  /** Danger button styling (destructive actions) */
  danger?: Partial<ButtonVariantStyle>;
  /** Success button styling (positive actions) */
  success?: Partial<ButtonVariantStyle>;
  /** Warning button styling (caution actions) */
  warning?: Partial<ButtonVariantStyle>;
  /** Info button styling (informational actions) */
  info?: Partial<ButtonVariantStyle>;
  /** Neutral button styling (cancel/secondary actions) */
  neutral?: Partial<ButtonVariantStyle>;
}

/**
 * Card variant styling
 */
export interface CardVariantStyle {
  /** Card background color */
  background: string;
  /** Card border color */
  border: string;
  /** Hover state background */
  backgroundHover?: string;
  /** Hover state border color */
  borderHover?: string;
  /** Optional: border style override (solid, dashed, dotted) */
  borderStyle?: "solid" | "dashed" | "dotted";
  /** Optional: border width override (for outlined variant) */
  borderWidth?: string;
}

/**
 * Card variants configuration
 */
export interface ThemeCards {
  /** Basic card styling (default) */
  basic?: Partial<CardVariantStyle>;
  /** Highlighted card styling (primary border for emphasis) */
  highlighted?: Partial<CardVariantStyle>;
  /** Outlined card styling (bold border) */
  outlined?: Partial<CardVariantStyle>;
  /** Interactive card styling (clickable with hover states) */
  interactive?: Partial<CardVariantStyle>;
  /** Ghost card styling (dashed border for placeholders) */
  ghost?: Partial<CardVariantStyle>;
  /** Elevated card styling (background emphasis) */
  elevated?: Partial<CardVariantStyle>;
}

/**
 * Form component styling
 */
export interface ThemeForms {
  /** Input field styling */
  input?: {
    /** Input background color */
    background?: string;
    /** Input border color */
    border?: string;
    /** Input text color */
    text?: string;
    /** Input placeholder color */
    placeholder?: string;
    /** Focus state border color */
    focusBorder?: string;
    /** Focus state ring color */
    focusRing?: string;
    /** Error state border color */
    errorBorder?: string;
    /** Disabled state background */
    disabledBackground?: string;
  };
  /** Checkbox styling */
  checkbox?: {
    /** Checkbox background (unchecked) */
    background?: string;
    /** Checkbox border color */
    border?: string;
    /** Checked state background */
    checkedBackground?: string;
    /** Checked state checkmark color */
    checkmarkColor?: string;
    /** Focus state ring color */
    focusRing?: string;
  };
  /** Radio button styling */
  radio?: {
    /** Radio background (unchecked) */
    background?: string;
    /** Radio border color */
    border?: string;
    /** Checked state background */
    checkedBackground?: string;
    /** Checked state dot color */
    dotColor?: string;
    /** Focus state ring color */
    focusRing?: string;
  };
  /** Select/dropdown styling */
  select?: {
    /** Select background color */
    background?: string;
    /** Select border color */
    border?: string;
    /** Select text color */
    text?: string;
    /** Dropdown menu background */
    menuBackground?: string;
    /** Selected option background */
    optionSelectedBackground?: string;
    /** Hovered option background */
    optionHoverBackground?: string;
  };
  /** Textarea styling */
  textarea?: {
    /** Textarea background color */
    background?: string;
    /** Textarea border color */
    border?: string;
    /** Textarea text color */
    text?: string;
    /** Focus state border color */
    focusBorder?: string;
    /** Resize handle color */
    resizeColor?: string;
  };
  /** Label styling */
  label?: {
    /** Label text color */
    text?: string;
    /** Required indicator color */
    requiredColor?: string;
    /** Optional text color */
    optionalColor?: string;
  };
  /** Form validation styling */
  validation?: {
    /** Success message color */
    successColor?: string;
    /** Error message color */
    errorColor?: string;
    /** Warning message color */
    warningColor?: string;
    /** Info message color */
    infoColor?: string;
  };
}

/**
 * Modal/Dialog component styling
 */
export interface ThemeModals {
  /** Modal backdrop styling */
  backdrop?: {
    /** Backdrop color */
    background?: string;
    /** Backdrop opacity */
    opacity?: number;
    /** Backdrop blur amount */
    blur?: string;
  };
  /** Modal content styling */
  content?: {
    /** Modal background color */
    background?: string;
    /** Modal border color */
    border?: string;
    /** Modal shadow */
    shadow?: string;
    /** Modal border radius */
    borderRadius?: string;
  };
  /** Modal header styling */
  header?: {
    /** Header background color */
    background?: string;
    /** Header text color */
    text?: string;
    /** Header border color (bottom border) */
    borderColor?: string;
  };
  /** Modal footer styling */
  footer?: {
    /** Footer background color */
    background?: string;
    /** Footer border color (top border) */
    borderColor?: string;
  };
  /** Close button styling */
  closeButton?: {
    /** Close button color */
    color?: string;
    /** Close button hover color */
    hoverColor?: string;
    /** Close button background (optional) */
    background?: string;
    /** Close button hover background */
    hoverBackground?: string;
  };
}

/**
 * Navigation component styling
 */
export interface ThemeNavigation {
  /** Top navbar styling */
  navbar?: {
    /** Navbar background color */
    background?: string;
    /** Navbar border color (bottom border) */
    border?: string;
    /** Navbar text color */
    text?: string;
    /** Navbar shadow */
    shadow?: string;
  };
  /** Sidebar styling */
  sidebar?: {
    /** Sidebar background color */
    background?: string;
    /** Sidebar border color */
    border?: string;
    /** Sidebar text color */
    text?: string;
    /** Sidebar width */
    width?: string;
  };
  /** Menu item styling */
  menuItem?: {
    /** Menu item text color */
    text?: string;
    /** Menu item background color */
    background?: string;
    /** Hover state background */
    hoverBackground?: string;
    /** Hover state text color */
    hoverText?: string;
    /** Active/selected state background */
    activeBackground?: string;
    /** Active/selected state text color */
    activeText?: string;
    /** Active/selected state indicator color */
    activeIndicator?: string;
  };
  /** Breadcrumb styling */
  breadcrumb?: {
    /** Breadcrumb text color */
    text?: string;
    /** Active breadcrumb color */
    activeText?: string;
    /** Separator color */
    separatorColor?: string;
    /** Hover state color */
    hoverColor?: string;
  };
  /** Tab styling */
  tabs?: {
    /** Tab text color (inactive) */
    text?: string;
    /** Tab background color */
    background?: string;
    /** Active tab text color */
    activeText?: string;
    /** Active tab background color */
    activeBackground?: string;
    /** Active tab indicator color (underline) */
    activeIndicator?: string;
    /** Hover state background */
    hoverBackground?: string;
    /** Tab border color */
    borderColor?: string;
  };
  /** Pagination styling */
  pagination?: {
    /** Pagination button text color */
    text?: string;
    /** Pagination button background */
    background?: string;
    /** Active page background */
    activeBackground?: string;
    /** Active page text color */
    activeText?: string;
    /** Hover state background */
    hoverBackground?: string;
    /** Disabled state color */
    disabledColor?: string;
  };
}

/**
 * Dark mode configuration
 */
export interface DarkModeConfig {
  /** Enable dark mode */
  enabled: boolean;
  /** Dark mode color overrides */
  colors?: Partial<ThemeColors>;
  /** Dark mode button overrides */
  buttons?: ThemeButtons;
  /** Dark mode card overrides */
  cards?: ThemeCards;
}

/**
 * Complete Spexop Theme Configuration
 *
 * This interface defines the user-configurable aesthetic layer
 * for the Spexop Design System. The architecture (Grid, Stack, etc.)
 * remains fixed while colors, typography, and spacing can be customized.
 *
 * @example
 * ```typescript
 * const myTheme: SpexopThemeConfig = {
 *   meta: {
 *     name: "My Brand",
 *     version: "1.0.0"
 *   },
 *   colors: {
 *     primary: "#7C3AED",
 *     surface: "#FFFFFF",
 *     surfaceSecondary: "#F5F5F5",
 *     surfaceHover: "#E5E5E5",
 *     text: "#1A1A1A",
 *     textSecondary: "#525252",
 *     textMuted: "#737373",
 *     border: "#E5E5E5",
 *     borderStrong: "#D4D4D4",
 *     borderSubtle: "#F5F5F5"
 *   },
 *   typography: {
 *     fontFamily: "Inter, sans-serif",
 *     baseSize: 16,
 *     scale: 1.25,
 *     weights: { regular: 400, semibold: 600, bold: 700 },
 *     lineHeights: { tight: 1.2, normal: 1.5, relaxed: 1.75 }
 *   },
 *   spacing: {
 *     baseUnit: 4
 *   },
 *   borders: {
 *     thin: 1,
 *     default: 2,
 *     thick: 4,
 *     radiusSubtle: 8,
 *     radiusRelaxed: 12,
 *     radiusPill: 9999,
 *     defaultStyle: "solid"
 *   }
 * };
 * ```
 */
export interface SpexopThemeConfig {
  /** Theme metadata */
  meta: ThemeMeta;

  /** Color system */
  colors: ThemeColors;

  /** Typography system */
  typography: ThemeTypography;

  /** Fluid typography configuration (optional, enables responsive text sizing) */
  fluidTypography?: FluidTypography;

  /** Spacing system */
  spacing: ThemeSpacing;

  /** Border system */
  borders: ThemeBorders;

  /** Extended radius system (optional, provides sm/md/lg/xl sizing) */
  radii?: ThemeRadii;

  /** Shadow system (optional, provides consistent elevation) */
  shadows?: ThemeShadows;

  /** Z-index layering system (optional, provides consistent stacking) */
  zIndex?: ThemeZIndex;

  /** Button styling (optional customization) */
  buttons?: ThemeButtons;

  /** Card styling (optional customization) */
  cards?: ThemeCards;

  /** Responsive breakpoints (optional override) */
  breakpoints?: Partial<Breakpoints>;

  /** Animation and transition system (optional) */
  animations?: ThemeAnimations;

  /** Opacity system (optional) */
  opacity?: ThemeOpacity;

  /** Grid system (optional) */
  grid?: ThemeGrid;

  /** Form component tokens (optional) */
  forms?: ThemeForms;

  /** Modal/Dialog component tokens (optional) */
  modals?: ThemeModals;

  /** Navigation component tokens (optional) */
  navigation?: ThemeNavigation;

  /** Dark mode configuration */
  darkMode?: DarkModeConfig;
}
