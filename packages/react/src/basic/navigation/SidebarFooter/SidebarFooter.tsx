/**
 * SidebarFooter Component
 * Simple wrapper component for sidebar footer content
 *
 * Use for:
 * - Version selectors
 * - Footer links
 * - Additional sidebar information
 * - Any content that should appear at the bottom of a sidebar
 * - User information and actions
 *
 * @component SidebarFooter
 * @packageName @spexop/react
 * @description Simple wrapper for sidebar footer content
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 */

import { Icon } from "../../indicators/Icon/Icon.js";
import { Stack } from "../../primitives/Stack/index.js";
import styles from "./SidebarFooter.module.css";
import type { SidebarFooterProps } from "./SidebarFooter.types.js";

export function SidebarFooter({
  children,
  user,
  actions,
  density = "normal",
  gap = 3,
  "aria-label": ariaLabel,
  className = "",
}: SidebarFooterProps) {
  // Render structured content if no children provided
  const renderStructuredContent = () => {
    if (!user && (!actions || actions.length === 0)) return null;

    return (
      <Stack gap={gap}>
        {user && (
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.avatarAlt || user.name}
                  className={styles.avatar}
                />
              )}
              <div className={styles.userDetails}>
                <div className={styles.userName}>{user.name}</div>
                {user.subtitle && (
                  <div className={styles.userSubtitle}>{user.subtitle}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {actions && actions.length > 0 && (
          <div
            className={styles.actions}
            role="group"
            aria-label="Footer actions"
          >
            {actions.map((action, index) => (
              <button
                key={action.label || `action-${index}`}
                onClick={action.onClick}
                className={styles.actionButton}
                type="button"
                disabled={action.disabled}
                aria-label={action.label}
              >
                {action.icon && <Icon name={action.icon} size="sm" />}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </Stack>
    );
  };

  const densityClass = density !== "normal" ? styles[`density-${density}`] : "";

  return (
    <footer
      className={`${styles.sidebarFooter} ${densityClass} ${className}`.trim()}
      aria-label={ariaLabel || (user || actions ? "Sidebar footer" : undefined)}
    >
      {children || renderStructuredContent()}
    </footer>
  );
}
