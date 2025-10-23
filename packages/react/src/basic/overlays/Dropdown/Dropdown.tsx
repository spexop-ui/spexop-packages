/**
 * Dropdown - Accessible dropdown menu component
 *
 * A modern dropdown menu component for displaying a list of actions,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - strong borders with subtle shadow
 * - Principle 3: Typography before decoration - clear hierarchy
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Keyboard accessible (Arrow keys, Enter, Escape, Home, End)
 * - Screen reader accessible with ARIA
 * - Click outside to close
 * - Configurable placement
 * - Icons support
 * - Disabled items
 * - Danger variant for destructive actions
 * - Dividers between items
 * - Search functionality
 * - Item grouping
 * - Loading states
 * - Empty states
 * - Mobile optimized
 * - Controlled and uncontrolled modes
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: '1', label: 'Edit', onClick: handleEdit },
 *   { id: '2', label: 'Delete', variant: 'danger', onClick: handleDelete },
 * ];
 *
 * <Dropdown items={items} trigger={<button>Actions</button>} />
 * ```
 */

import {
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey.js";
import { cn } from "../../../utils/index.js";
import styles from "./Dropdown.module.css";
import type {
  DropdownGroup,
  DropdownMenuItem,
  DropdownProps,
} from "./Dropdown.types.js";

export function Dropdown({
  items,
  trigger,
  placement = "bottom-start",
  isOpen: controlledIsOpen,
  onOpenChange,
  className,
  triggerClassName,
  closeOnItemClick = true,
  searchable = false,
  searchPlaceholder = "Search...",
  onSearch,
  grouped = false,
  loading = false,
  emptyState,
  maxHeight = 400,
  showGroupDividers = true,
  renderItem,
  onSearchChange,
  highlightMatches = true,
}: DropdownProps) {
  const isControlled = controlledIsOpen !== undefined;
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const [searchQuery, setSearchQuery] = useState("");

  const triggerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const setIsOpen = (open: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(open);
    }
    onOpenChange?.(open);
  };

  const setIsOpenRef = useRef(setIsOpen);
  setIsOpenRef.current = setIsOpen;

  // Search functionality
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;

    if (onSearch) {
      return onSearch(searchQuery, items);
    }

    return items.filter((item) => {
      const searchText = searchQuery.toLowerCase();
      const labelText =
        typeof item.label === "string" ? item.label.toLowerCase() : "";
      const keywords = item.keywords?.join(" ").toLowerCase() || "";

      return labelText.includes(searchText) || keywords.includes(searchText);
    });
  }, [items, searchQuery, onSearch]);

  // Group items if needed
  const groupedItems = useMemo(() => {
    if (!grouped) return null;

    const groups: DropdownGroup[] = [];
    const groupMap = new Map<string, DropdownMenuItem[]>();

    for (const item of filteredItems) {
      const groupId = item.group || "default";
      if (!groupMap.has(groupId)) {
        groupMap.set(groupId, []);
      }
      const groupItems = groupMap.get(groupId);
      if (groupItems) {
        groupItems.push(item);
      }
    }

    groupMap.forEach((groupItems, groupId) => {
      groups.push({
        id: groupId,
        label: groupId === "default" ? "" : groupId,
        items: groupItems,
      });
    });

    return groups;
  }, [filteredItems, grouped]);

  // Get all enabled items for keyboard navigation
  const enabledItems = useMemo(() => {
    if (grouped && groupedItems) {
      return groupedItems.flatMap((group) =>
        group.items.filter((item) => !item.disabled),
      );
    }
    return filteredItems.filter((item) => !item.disabled);
  }, [filteredItems, grouped, groupedItems]);

  useEscapeKey(() => {
    if (isOpen) {
      setIsOpen(false);
      setSearchQuery("");
      triggerRef.current?.focus();
    }
  }, isOpen);

  // Click outside to close
  // biome-ignore lint/correctness/useExhaustiveDependencies: setIsOpen is a stable useState setter and doesn't need to be in dependencies
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = useCallback(
    (item: (typeof items)[0]) => {
      if (item.disabled) return;

      item.onClick?.();

      if (closeOnItemClick) {
        setIsOpenRef.current(false);
        triggerRef.current?.focus();
      }
    },
    [closeOnItemClick],
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchQuery(query);
      setFocusedIndex(-1);
      onSearchChange?.(query);
    },
    [onSearchChange],
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev < enabledItems.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev > 0 ? prev - 1 : enabledItems.length - 1,
        );
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (focusedIndex >= 0 && enabledItems[focusedIndex]) {
          handleItemClick(enabledItems[focusedIndex]);
        }
        break;
      case "Home":
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        event.preventDefault();
        setFocusedIndex(enabledItems.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setSearchQuery("");
        triggerRef.current?.focus();
        break;
    }
  };

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Highlight search matches
  const highlightText = useCallback(
    (text: string, query: string) => {
      if (!highlightMatches || !query.trim()) return text;

      const regex = new RegExp(
        `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi",
      );
      const parts = text.split(regex);

      return parts.map((part, partIndex) =>
        regex.test(part) ? (
          <mark
            key={`highlight-${partIndex}-${part.slice(0, 10)}`}
            className={styles.highlight}
          >
            {part}
          </mark>
        ) : (
          part
        ),
      );
    },
    [highlightMatches],
  );

  // Render individual item
  const renderDropdownItem = useCallback(
    (item: (typeof items)[0], index: number) => {
      const enabledIndex = enabledItems.indexOf(item);
      const isFocused = enabledIndex === focusedIndex;

      const itemClassName = cn(
        styles.item,
        item.disabled && styles.disabled,
        item.variant === "danger" && styles.danger,
        isFocused && styles.focused,
      );

      const labelContent =
        typeof item.label === "string" && searchQuery.trim() && highlightMatches
          ? highlightText(item.label, searchQuery)
          : item.label;

      if (renderItem) {
        return renderItem(item, index);
      }

      return (
        <div key={item.id}>
          <button
            type="button"
            role="menuitem"
            disabled={item.disabled}
            className={itemClassName}
            onClick={() => handleItemClick(item)}
            tabIndex={isFocused ? 0 : -1}
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span className={styles.label}>{labelContent}</span>
          </button>
          {item.divider && (
            // biome-ignore lint/a11y/useFocusableInteractive: Separators are non-interactive visual dividers per WAI-ARIA
            <div className={styles.divider} role="separator" />
          )}
        </div>
      );
    },
    [
      enabledItems,
      focusedIndex,
      searchQuery,
      highlightMatches,
      highlightText,
      renderItem,
      handleItemClick,
    ],
  );

  const triggerProps = trigger.props as {
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
  };

  const triggerElement = cloneElement(trigger, {
    ref: triggerRef,
    onClick: handleTriggerClick,
    "aria-expanded": isOpen,
    "aria-haspopup": "menu",
    className: cn(triggerProps.className, triggerClassName),
  } as React.HTMLAttributes<HTMLElement>);

  const dropdownClassName = cn(
    styles.dropdown,
    styles[`placement-${placement}`],
    isOpen && styles.open,
    className,
  );

  const dropdownStyle = {
    maxHeight: `${maxHeight}px`,
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles.loading}>
          <span className={styles.loadingSpinner} />
          Loading...
        </div>
      );
    }

    if (filteredItems.length === 0) {
      return (
        <div className={styles.emptyState}>
          {emptyState || (
            <>
              <div className={styles.emptyStateIcon}>🔍</div>
              <div>No items found</div>
            </>
          )}
        </div>
      );
    }

    if (grouped && groupedItems) {
      return groupedItems.map((group) => (
        <div key={group.id} className={styles.group}>
          {group.label && (
            <div className={styles.groupLabel}>{group.label}</div>
          )}
          <div className={styles.groupItems}>
            {group.items.map((item, index) => renderDropdownItem(item, index))}
          </div>
          {showGroupDividers &&
            group.id !== groupedItems[groupedItems.length - 1]?.id && (
              // biome-ignore lint/a11y/useFocusableInteractive: Separators are non-interactive visual dividers per WAI-ARIA
              <div className={styles.divider} role="separator" />
            )}
        </div>
      ));
    }

    return filteredItems.map((item, index) => renderDropdownItem(item, index));
  };

  return (
    <div className={styles.container}>
      {triggerElement}

      {isOpen && (
        <div
          ref={dropdownRef}
          role="menu"
          className={dropdownClassName}
          style={dropdownStyle}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {searchable && (
            <input
              ref={searchRef}
              type="text"
              className={styles.search}
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search items"
            />
          )}
          <div className={styles.menuContent}>{renderContent()}</div>
        </div>
      )}
    </div>
  );
}
