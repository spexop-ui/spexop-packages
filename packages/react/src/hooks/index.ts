/**
 * Responsive & Media Query Hooks
 */

export {
  BreakpointContext,
  type BreakpointName,
  useBreakpoint,
} from "./useBreakpoint.js";
export { useMediaQuery } from "./useMediaQuery.js";
export {
  disablePerformanceWarnings,
  enablePerformanceWarnings,
  getResponsiveValuePerformance,
  type ResponsiveProp,
  type ResponsiveValue,
  useResponsiveValue,
} from "./useResponsiveValue.js";

/**
 * Scroll & Navigation Hooks
 */

export { type UseScrollSpyOptions, useScrollSpy } from "./useScrollSpy.js";

/**
 * Debug Hooks
 */

export { type DebugContextValue, useDebug } from "./useDebug.js";

/**
 * Overlay & Interaction Hooks
 */

export {
  type UseAccordionOptions,
  type UseAccordionReturn,
  useAccordion,
} from "./useAccordion.js";
export { useBodyScrollLock } from "./useBodyScrollLock.js";
export { useClickOutside } from "./useClickOutside.js";
export { useEscapeKey } from "./useEscapeKey.js";
export { useFocusTrap } from "./useFocusTrap.js";

/**
 * State Management Hooks
 */

export { useToggle } from "./useToggle.js";
export { usePrevious } from "./usePrevious.js";
export { useLocalStorage } from "./useLocalStorage.js";
export { useSessionStorage } from "./useSessionStorage.js";

/**
 * Performance Hooks
 */

export { useDebounce } from "./useDebounce.js";
export { useThrottle } from "./useThrottle.js";

/**
 * Layout & Measurement Hooks
 */

export { type WindowSize, useWindowSize } from "./useWindowSize.js";
export { type Size, useResizeObserver } from "./useResizeObserver.js";
export { type ScrollState, useScroll } from "./useScroll.js";
export { useIntersectionObserver } from "./useIntersectionObserver.js";

/**
 * Accessibility Hooks
 */

export { useReducedMotion } from "./useReducedMotion.js";

/**
 * Browser & Network Hooks
 */

export { useOnline } from "./useOnline.js";
export { usePageVisibility } from "./usePageVisibility.js";
export {
  type GeolocationState,
  type UseGeolocationOptions,
  useGeolocation,
} from "./useGeolocation.js";
export {
  type PermissionName,
  type PermissionState,
  type UsePermissionReturn,
  usePermission,
} from "./usePermission.js";

/**
 * Navigation & URL Hooks
 */

export { useHash } from "./useHash.js";
export { useQueryParams } from "./useQueryParams.js";
export { useDarkMode } from "./useDarkMode.js";

/**
 * Interaction Hooks
 */

export { useHover } from "./useHover.js";
export { useKeyPress } from "./useKeyPress.js";
export { useIdle } from "./useIdle.js";
export {
  type UseLongPressOptions,
  useLongPress,
} from "./useLongPress.js";
export { useCopyToClipboard } from "./useCopyToClipboard.js";

/**
 * Animation Hooks
 */

export { useMotionValue } from "./useMotionValue.js";
export { useSpring } from "./useSpring.js";
