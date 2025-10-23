/**
 * Tabs - Accessible tabs component
 *
 * A tabs component for organizing content into sections,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - strong borders for active state
 * - Principle 3: Typography before decoration - bold for active tabs
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Screen reader accessible with ARIA attributes
 * - Multiple visual variants (default, pills, underline)
 * - Size variants
 * - Disabled tabs support
 * - Icons support
 * - Controlled and uncontrolled modes
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * const tabs = [
 *   { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
 *   { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
 * ];
 *
 * <Tabs tabs={tabs} />
 * ```
 */

import { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils/index.js";
import styles from "./Tabs.module.css";
import type { TabsProps } from "./Tabs.types.js";

export function Tabs({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  defaultActiveTab,
  variant = "default",
  size = "md",
  fullWidth = false,
  className,
  tabListClassName,
  tabPanelClassName,
}: TabsProps) {
  const isControlled = controlledActiveTab !== undefined;
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultActiveTab || tabs[0]?.id,
  );
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleTabClick = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab?.disabled) return;

    if (!isControlled) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  const handleKeyDown = (event: React.KeyboardEvent, currentIndex: number) => {
    const enabledTabs = tabs.filter((tab) => !tab.disabled);
    const currentEnabledIndex = enabledTabs.findIndex(
      (tab) => tab.id === tabs[currentIndex].id,
    );

    let nextIndex = -1;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        nextIndex =
          currentEnabledIndex > 0
            ? currentEnabledIndex - 1
            : enabledTabs.length - 1;
        break;
      case "ArrowRight":
        event.preventDefault();
        nextIndex =
          currentEnabledIndex < enabledTabs.length - 1
            ? currentEnabledIndex + 1
            : 0;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = enabledTabs.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== -1) {
      const nextTab = enabledTabs[nextIndex];
      tabRefs.current.get(nextTab.id)?.focus();
      handleTabClick(nextTab.id);
    }
  };

  const containerClassName = cn(
    styles.tabs,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    fullWidth && styles["full-width"],
    className,
  );

  const tabListClass = cn(styles["tab-list"], tabListClassName);

  return (
    <div className={containerClassName}>
      <div role="tablist" className={tabListClass}>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          const tabClassName = cn(
            styles.tab,
            isActive && styles.active,
            tab.disabled && styles.disabled,
          );

          return (
            <button
              type="button"
              key={tab.id}
              ref={(el) => {
                if (el) {
                  tabRefs.current.set(tab.id, el);
                }
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              aria-disabled={tab.disabled}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              className={tabClassName}
              onClick={() => handleTabClick(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onTouchStart={() => {}} // Enable touch events
            >
              {tab.icon && <span className={styles.icon}>{tab.icon}</span>}
              <span className={styles.label}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const panelClassName = cn(
          styles["tab-panel"],
          isActive && styles.active,
          tabPanelClassName,
        );

        return (
          <div
            key={tab.id}
            id={`${tab.id}-panel`}
            role="tabpanel"
            aria-labelledby={tab.id}
            hidden={!isActive}
            className={panelClassName}
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
}
