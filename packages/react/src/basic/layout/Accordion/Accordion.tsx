/**
 * Accordion - Accessible accordion component
 *
 * An accordion component for collapsible content sections,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - strong borders for separation
 * - Principle 3: Typography before decoration - bold titles
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Keyboard accessible (Arrow keys, Home, End, Space, Enter)
 * - Screen reader accessible with ARIA
 * - Single or multiple expand modes
 * - Size variants
 * - Visual variants
 * - Disabled items
 * - Controlled and uncontrolled modes
 * - Smooth animations
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: '1', title: 'Section 1', content: <div>Content 1</div> },
 *   { id: '2', title: 'Section 2', content: <div>Content 2</div> },
 * ];
 *
 * <Accordion items={items} />
 * ```
 */

import { ChevronDown } from "@spexop/icons";
import { useState } from "react";
import { cn } from "../../../utils/index.js";
import styles from "./Accordion.module.css";
import type { AccordionProps } from "./Accordion.types.js";

export function Accordion({
  items,
  expandedItems: controlledExpandedItems,
  onExpandedChange,
  defaultExpandedItems = [],
  allowMultiple = false,
  size = "md",
  variant = "default",
  className,
}: AccordionProps) {
  const isControlled = controlledExpandedItems !== undefined;
  const [internalExpandedItems, setInternalExpandedItems] =
    useState<string[]>(defaultExpandedItems);
  const expandedItems = isControlled
    ? controlledExpandedItems
    : internalExpandedItems;

  const setExpandedItems = (items: string[]) => {
    if (!isControlled) {
      setInternalExpandedItems(items);
    }
    onExpandedChange?.(items);
  };

  const toggleItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (item?.disabled) return;

    const isExpanded = expandedItems.includes(itemId);

    if (allowMultiple) {
      if (isExpanded) {
        setExpandedItems(expandedItems.filter((id) => id !== itemId));
      } else {
        setExpandedItems([...expandedItems, itemId]);
      }
    } else {
      if (isExpanded) {
        setExpandedItems([]);
      } else {
        setExpandedItems([itemId]);
      }
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    itemId: string,
    index: number,
  ) => {
    const enabledItems = items.filter((item) => !item.disabled);
    const enabledIndex = enabledItems.findIndex((item) => item.id === itemId);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (enabledIndex < enabledItems.length - 1) {
          const nextItem = enabledItems[enabledIndex + 1];
          document.getElementById(`accordion-header-${nextItem.id}`)?.focus();
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (enabledIndex > 0) {
          const prevItem = enabledItems[enabledIndex - 1];
          document.getElementById(`accordion-header-${prevItem.id}`)?.focus();
        }
        break;
      case "Home":
        event.preventDefault();
        document
          .getElementById(`accordion-header-${enabledItems[0].id}`)
          ?.focus();
        break;
      case "End":
        event.preventDefault();
        document
          .getElementById(
            `accordion-header-${enabledItems[enabledItems.length - 1].id}`,
          )
          ?.focus();
        break;
    }
  };

  const accordionClassName = cn(
    styles.accordion,
    styles[`size-${size}`],
    styles[`variant-${variant}`],
    className,
  );

  return (
    <div className={accordionClassName}>
      {items.map((item, index) => {
        const isExpanded = expandedItems.includes(item.id);
        const itemClassName = cn(
          styles.item,
          isExpanded && styles.expanded,
          item.disabled && styles.disabled,
        );

        return (
          <div key={item.id} className={itemClassName}>
            <button
              id={`accordion-header-${item.id}`}
              type="button"
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id, index)}
              disabled={item.disabled}
              className={styles.header}
              aria-expanded={isExpanded}
              aria-controls={`accordion-panel-${item.id}`}
            >
              <span className={styles.title}>{item.title}</span>
              <span className={styles.icon} aria-hidden="true">
                <ChevronDown size={20} strokeWidth={2} />
              </span>
            </button>

            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-header-${item.id}`}
              className={styles.panel}
              hidden={!isExpanded}
            >
              <div className={styles.content}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
