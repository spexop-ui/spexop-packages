/**
 * NavLink Component
 * Enhanced navigation link with extensive customization options
 *
 * Follows "Refined Minimalism":
 * - Borders for active state (not shadows)
 * - High contrast text
 * - Token-based spacing
 * - Touch-optimized (48px min height)
 * - WCAG AA compliant
 * - Full customization support
 *
 * @component NavLink
 * @packageName @spexop/react
 * @description Enhanced navigation link for sidebar with full customization
 * @author @spexop-ui | github.com/spexop-ui |  @olmstedian | github.com/olmstedian
 * @version 0.2.0
 * @since 2025-10-13
 */

import { cn } from "../../../utils/index.js";
import styles from "./NavLink.module.css";
import type { NavLinkProps } from "./NavLink.types.js";

export function NavLink({
  href,
  children,
  active = false,
  onClick,
  className = "",
  disabled = false,
  size = "md",
  variant = "default",
  hoverEffect = "background",
  height,
  fontSize = "sm",
  fontWeight = "medium",
  activeFontWeight,
  color,
  activeColor,
  hoverColor,
  disabledColor,
  backgroundColor,
  activeBackgroundColor,
  hoverBackgroundColor,
  borderColor,
  activeBorderColor,
  borderWidth = "3px",
  activeBorderWidth = "4px",
  borderPosition = "left",
  icon,
  iconRight,
  badge,
  badgePosition = "right",
  transitionDuration = 150,
  transitionEasing = "ease",
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
}: NavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (onClick) {
        const syntheticClickEvent = {
          preventDefault: () => e.preventDefault(),
          stopPropagation: () => e.stopPropagation(),
          currentTarget: e.currentTarget,
          target: e.target,
          type: "click",
          nativeEvent: e.nativeEvent,
          bubbles: true,
          cancelable: true,
          defaultPrevented: false,
          eventPhase: 2,
          isTrusted: false,
          timeStamp: e.timeStamp,
          button: 0,
          buttons: 1,
          clientX: 0,
          clientY: 0,
          screenX: 0,
          screenY: 0,
          movementX: 0,
          movementY: 0,
          ctrlKey: e.ctrlKey,
          shiftKey: e.shiftKey,
          altKey: e.altKey,
          metaKey: e.metaKey,
          getModifierState: e.getModifierState,
          detail: 1,
          view: e.view,
          which: 1,
          relatedTarget: null,
          isDefaultPrevented: () => e.defaultPrevented,
          isPropagationStopped: () => e.isPropagationStopped(),
          persist: () => {},
        } as unknown as React.MouseEvent<HTMLAnchorElement>;

        onClick(syntheticClickEvent);
      }
    }
  };

  // Build CSS classes
  const classNames = cn(
    styles.navLink,
    styles[`size-${size}`],
    styles[`variant-${variant}`],
    styles[`hover-${hoverEffect}`],
    active ? styles.active : null,
    disabled ? styles.disabled : null,
    icon ? styles.hasIcon : null,
    iconRight ? styles.hasIconRight : null,
    badge ? styles.hasBadge : null,
    className,
  );

  // Build inline styles for custom properties
  const inlineStyles: React.CSSProperties & Record<string, string> = {
    ...(height && { minHeight: typeof height === "number" ? `${height}px` : height }),
    ...(fontSize && { fontSize: `var(--theme-font-size-${fontSize})` }),
    ...(fontWeight && {
      fontWeight: `var(--theme-font-weight-${fontWeight === "semibold" ? "semibold" : fontWeight})`,
    }),
    ...(active && activeFontWeight && {
      fontWeight: `var(--theme-font-weight-${activeFontWeight === "semibold" ? "semibold" : activeFontWeight})`,
    }),
    ...(color && { color }),
    ...(active && activeColor && { color: activeColor }),
    ...(hoverColor && { "--hover-color": hoverColor }),
    ...(backgroundColor && { backgroundColor }),
    ...(active && activeBackgroundColor && { backgroundColor: activeBackgroundColor }),
    ...(hoverBackgroundColor && { "--hover-bg": hoverBackgroundColor }),
    ...(borderColor && { [`--border-color-${borderPosition}`]: borderColor }),
    ...(active && activeBorderColor && { [`--border-color-${borderPosition}-active`]: activeBorderColor }),
    ...(borderWidth && { [`--border-width-${borderPosition}`]: borderWidth }),
    ...(active && activeBorderWidth && { [`--border-width-${borderPosition}-active`]: activeBorderWidth }),
    ...(transitionDuration && {
      transitionDuration: `${transitionDuration}ms`,
    }),
    ...(transitionEasing && transitionEasing !== "cubic-bezier" && {
      transitionTimingFunction: transitionEasing,
    }),
    ...(padding && {
      padding: typeof padding === "number" ? `var(--theme-spacing-${padding})` : padding,
    }),
    ...(paddingTop && {
      paddingTop: typeof paddingTop === "number" ? `var(--theme-spacing-${paddingTop})` : paddingTop,
    }),
    ...(paddingBottom && {
      paddingBottom:
        typeof paddingBottom === "number"
          ? `var(--theme-spacing-${paddingBottom})`
          : paddingBottom,
    }),
    ...(paddingLeft && {
      paddingLeft:
        typeof paddingLeft === "number" ? `var(--theme-spacing-${paddingLeft})` : paddingLeft,
    }),
    ...(paddingRight && {
      paddingRight:
        typeof paddingRight === "number" ? `var(--theme-spacing-${paddingRight})` : paddingRight,
    }),
    ...(disabled && disabledColor && { color: disabledColor }),
  };

  // Determine aria-current
  const currentAria = ariaCurrent || (active ? "page" : undefined);

  return (
    <a
      href={disabled ? undefined : href}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={classNames}
      style={inlineStyles}
      aria-label={ariaLabel}
      aria-current={currentAria}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      data-border-position={borderPosition}
    >
      {badge && badgePosition === "left" && (
        <span className={styles.badge}>{badge}</span>
      )}
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.content}>{children}</span>}
      {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
      {badge && badgePosition === "right" && (
        <span className={styles.badge}>{badge}</span>
      )}
    </a>
  );
}
