/**
 * SplitButton Component
 * Button with primary action + dropdown menu
 *
 * @component SplitButton
 * @packageName @spexop/react
 * @description Split button with main action and dropdown options
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.2.0
 * @since 2025-10-13
 *
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../../utils/index.js";
import { Icon } from "../../indicators/Icon/Icon.js";
import styles from "./SplitButton.module.css";
import type {
  SplitButtonMenuDivider,
  SplitButtonMenuGroup,
  SplitButtonMenuItem,
  SplitButtonMenuOption,
  SplitButtonProps,
} from "./SplitButton.types.js";

/**
 * SplitButton component
 *
 * @example
 * ```tsx
 * <SplitButton
 *   label="Save Document"
 *   onClick={handleSave}
 *   menuItems={[
 *     { label: 'Save as Draft', value: 'draft', onClick: handleDraft },
 *     { label: 'Save as Template', value: 'template', onClick: handleTemplate }
 *   ]}
 * />
 * ```
 */
export function SplitButton({
  label,
  onClick,
  menuItems = [],
  variant = "primary",
  size = "md",
  compact,
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  icon,
  loadingIcon,
  "aria-label": ariaLabel,
  "aria-label-toggle": ariaLabelToggle = "Show more options",
  "aria-describedby": ariaDescribedBy,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
  "aria-live": ariaLive = "polite",
}: SplitButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useRef(
    `splitbutton-menu-${Math.random().toString(36).substr(2, 9)}`,
  );

  // Determine if component is disabled (either explicitly disabled or loading)
  const isDisabled = disabled || loading;

  // Handle main button click
  const handleMainClick = useCallback(() => {
    if (!isDisabled) {
      onClick();
    }
  }, [onClick, isDisabled]);

  // Handle dropdown toggle
  const handleToggle = useCallback(() => {
    if (!isDisabled) {
      setIsOpen((prev) => !prev);
    }
  }, [isDisabled]);

  // Handle menu item click
  const handleMenuItemClick = useCallback((item: SplitButtonMenuItem) => {
    if (!item.disabled) {
      item.onClick();
      setIsOpen(false);
    }
  }, []);

  // Check if menu item is a regular item (not divider or group)
  const isMenuItem = (
    item: SplitButtonMenuOption,
  ): item is SplitButtonMenuItem => {
    return !("type" in item) || item.type === undefined;
  };

  // Check if menu item is a divider
  const isMenuDivider = (
    item: SplitButtonMenuOption,
  ): item is SplitButtonMenuDivider => {
    return "type" in item && item.type === "divider";
  };

  // Check if menu item is a group
  const isMenuGroup = (
    item: SplitButtonMenuOption,
  ): item is SplitButtonMenuGroup => {
    return "type" in item && item.type === "group";
  };

  // Close menu on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Handle controlled aria-expanded
  useEffect(() => {
    if (ariaExpanded !== undefined) {
      setIsOpen(ariaExpanded);
    }
  }, [ariaExpanded]);

  // Focus menu when it opens
  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation in menu (Arrow Up/Down)
  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) return;

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const menuItems = menuRef.current?.querySelectorAll(
          'button[role="menuitem"]:not(:disabled)',
        );
        if (!menuItems || menuItems.length === 0) return;

        // Use findIndex to properly handle Element | null type from document.activeElement
        const currentIndex = Array.from(menuItems).findIndex(
          (item) => item === document.activeElement,
        );

        let nextIndex: number;
        if (event.key === "ArrowDown") {
          nextIndex =
            currentIndex === -1 ? 0 : (currentIndex + 1) % menuItems.length;
        } else {
          nextIndex =
            currentIndex === -1
              ? menuItems.length - 1
              : currentIndex === 0
                ? menuItems.length - 1
                : currentIndex - 1;
        }

        (menuItems[nextIndex] as HTMLElement).focus();
      }
    },
    [isOpen],
  );

  // Render menu item
  const renderMenuItem = (item: SplitButtonMenuItem, index: number) => (
    <button
      key={item.value}
      type="button"
      role="menuitem"
      className={cn(
        styles.menuItem,
        item.disabled && styles.menuItemDisabled,
        size && styles[`menuItem-${size}`],
      )}
      onClick={() => handleMenuItemClick(item)}
      disabled={item.disabled}
      aria-label={item["aria-label"] || item.label}
      tabIndex={-1}
    >
      {item.icon && <span className={styles.menuItemIcon}>{item.icon}</span>}
      <div className={styles.menuItemContent}>
        <span className={styles.menuItemLabel}>{item.label}</span>
        {item.description && (
          <span className={styles.menuItemDescription}>{item.description}</span>
        )}
      </div>
      {item.badge && <span className={styles.menuItemBadge}>{item.badge}</span>}
      {item.shortcut && (
        <span className={styles.menuItemShortcut}>{item.shortcut}</span>
      )}
    </button>
  );

  // Render menu divider
  const renderMenuDivider = (index: number) => (
    <div
      key={`divider-${index}`}
      className={styles.menuDivider}
      aria-hidden="true"
    />
  );

  // Render menu group
  const renderMenuGroup = (group: SplitButtonMenuGroup, index: number) => (
    <div key={`group-${index}`} className={styles.menuGroup}>
      <div className={styles.menuGroupLabel}>{group.label}</div>
      <div className={styles.menuGroupItems}>
        {group.items.map((item, itemIndex) => renderMenuItem(item, itemIndex))}
      </div>
    </div>
  );

  // Compose classNames
  const containerClassName = cn(
    styles.splitButton,
    styles[`variant-${variant}`],
    size && styles[`size-${size}`],
    compact && styles[`compact-${compact}`],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    className,
  );

  const mainButtonClassName = cn(
    styles.mainButton,
    size && styles[`mainButton-${size}`],
    compact && styles[`mainButton-compact-${compact}`],
    isDisabled && styles.buttonDisabled,
  );

  const toggleButtonClassName = cn(
    styles.toggleButton,
    size && styles[`toggleButton-${size}`],
    compact && styles[`toggleButton-compact-${compact}`],
    isDisabled && styles.buttonDisabled,
  );

  const menuClassName = cn(
    styles.menu,
    size && styles[`menu-${size}`],
    isOpen && styles.menuOpen,
  );

  return (
    <div ref={containerRef} className={containerClassName}>
      {/* Main Action Button */}
      <button
        type="button"
        className={mainButtonClassName}
        onClick={handleMainClick}
        disabled={isDisabled}
        aria-label={ariaLabel || label}
        aria-describedby={ariaDescribedBy}
        aria-live={ariaLive}
      >
        {loading
          ? loadingIcon || (
              <Icon name="loader" className={styles.loadingIcon} size="sm" />
            )
          : icon && <span className={styles.buttonIcon}>{icon}</span>}
        {!compact && <span className={styles.buttonLabel}>{label}</span>}
      </button>

      {/* Dropdown Toggle Button */}
      <button
        ref={toggleButtonRef}
        type="button"
        className={toggleButtonClassName}
        onClick={handleToggle}
        disabled={isDisabled}
        aria-label={ariaLabelToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={ariaControls || menuId.current}
      >
        <Icon
          name="chevronDown"
          className={cn(styles.toggleIcon, isOpen && styles.toggleIconOpen)}
          size={compact ? "sm" : "md"}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          id={menuId.current}
          className={menuClassName}
          role="menu"
          onKeyDown={handleMenuKeyDown}
          aria-live={ariaLive}
          data-testid="menu"
          tabIndex={-1}
        >
          {menuItems.map((item, index) => {
            if (isMenuItem(item)) {
              return renderMenuItem(item, index);
            }
            if (isMenuDivider(item)) {
              return renderMenuDivider(index);
            }
            if (isMenuGroup(item)) {
              return renderMenuGroup(item, index);
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
