/**
 * Avatar - Accessible avatar component
 *
 * An avatar component for displaying user profile images,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - clear borders
 * - Principle 3: Typography before decoration - clear initials
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - proper alt text
 *
 * Features:
 * - Multiple size variants
 * - Circle or square shapes
 * - Image with fallback to initials
 * - Status indicators
 * - Keyboard accessible (if clickable)
 * - Proper alt text for accessibility
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <Avatar name="John Doe" src="/avatar.jpg" />
 * <Avatar name="Jane Smith" status="online" showStatus />
 * ```
 */

import { User } from "@spexop/icons";
import { useState } from "react";
import { cn } from "../../../utils/index.js";
import styles from "./Avatar.module.css";
import type { AvatarProps } from "./Avatar.types.js";

const defaultFallbackIcon = <User size={24} strokeWidth={2} />;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  name,
  src,
  alt,
  size = "md",
  shape = "circle",
  status,
  showStatus = false,
  fallbackIcon = defaultFallbackIcon,
  className,
  onClick,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = src && !imageError;
  // Trim name to handle whitespace-only strings
  const trimmedName = name?.trim();
  const showInitials = !showImage && trimmedName;
  const showFallback = !showImage && !trimmedName;

  const avatarClassName = cn(
    styles.avatar,
    styles[`size-${size}`],
    styles[`shape-${shape}`],
    onClick && styles.clickable,
    className,
  );

  const statusClassName = cn(
    styles.status,
    status && styles[`status-${status}`],
  );

  const content = (
    <>
      {showImage && (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          className={styles.image}
          onError={() => setImageError(true)}
        />
      )}
      {showInitials && trimmedName && (
        <span className={styles.initials} aria-label={trimmedName}>
          {getInitials(trimmedName)}
        </span>
      )}
      {showFallback && (
        <span className={styles.fallback} aria-label="User avatar">
          {fallbackIcon}
        </span>
      )}
      {showStatus && status && (
        <span className={statusClassName} aria-label={`Status: ${status}`} />
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={avatarClassName}
        aria-label={name ? `${name}'s avatar` : "User avatar"}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      className={avatarClassName}
      aria-label={name ? `${name}'s avatar` : "User avatar"}
    >
      {content}
    </div>
  );
}
