/**
 * NavLink Component
 * Navigation link for sidebar with active state support
 *
 * Follows "Refined Minimalism":
 * - Borders for active state (not shadows)
 * - High contrast text
 * - Token-based spacing
 * - Touch-optimized (48px min height)
 * - WCAG AA compliant
 *
 * @component NavLink
 * @packageName @spexop/react
 * @description Navigation link for sidebar with active state support
 * @author @spexop-ui | github.com/spexop-ui |  @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 */

import styles from "./NavLink.module.css";
import type { NavLinkProps } from "./NavLink.types.js";

export function NavLink({
  href,
  children,
  active = false,
  onClick,
  className = "",
  disabled = false,
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
      // For keyboard activation, we'll trigger the click programmatically
      // This avoids the type casting issue
      if (onClick) {
        // Create a minimal synthetic event that satisfies the onClick signature
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

  return (
    <a
      href={disabled ? undefined : href}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`${styles.navLink} ${active ? styles.active : ""} ${disabled ? styles.disabled : ""} ${className}`}
      aria-current={active ? "page" : undefined}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </a>
  );
}
