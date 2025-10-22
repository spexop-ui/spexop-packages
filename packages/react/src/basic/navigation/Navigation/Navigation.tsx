/**
 * Navigation Component
 * Generic, router-agnostic navigation bar with polished interactions
 * Refined Minimalism: Border-based, clean interactions, active state indication
 */

import { Menu, X } from "@spexop/icons";
import { useId, useState } from "react";
import styles from "./Navigation.module.css";
import type { NavigationProps } from "./Navigation.types.js";

export function Navigation({
  logo,
  links,
  currentPath,
  onNavigate,
  showCloseSidebar = false,
  onCloseSidebar,
  className,
  children,
  ariaLabel = "Main navigation",
}: NavigationProps) {
  const menuId = useId();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (link: (typeof links)[0]) => {
    closeMobileMenu();
    if (!link.external) {
      onNavigate(link.to);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMobileMenu();
    onNavigate(logo.href);
  };

  const handleCloseSidebar = () => {
    onCloseSidebar?.();
  };

  const isActivePath = (path: string) => {
    return currentPath === path;
  };

  const LogoIcon = logo.icon;

  return (
    <nav className={`${styles.nav} ${className || ""}`} aria-label={ariaLabel}>
      <div className={styles.container}>
        {/* Close Sidebar Button (Mobile only) */}
        {showCloseSidebar && onCloseSidebar && (
          <button
            type="button"
            className={styles.closeSidebarButton}
            onClick={handleCloseSidebar}
            aria-label="Close sidebar"
          >
            <X size={20} strokeWidth={2} />
          </button>
        )}

        {/* Logo */}
        <a
          href={logo.href}
          className={styles.logo}
          onClick={handleLogoClick}
          aria-label={logo.ariaLabel || `${logo.text} - Home`}
        >
          {LogoIcon && (
            <LogoIcon size={24} strokeWidth={2} className={styles.logoIcon} />
          )}
          <span className={styles.logoText}>{logo.text}</span>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className={styles.mobileToggle}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls={menuId}
        >
          <span className={styles.toggleIcon}>
            {isMobileMenuOpen ? (
              <X size={24} strokeWidth={2} />
            ) : (
              <Menu size={24} strokeWidth={2} />
            )}
          </span>
        </button>

        {/* Navigation Links */}
        <div
          id={menuId}
          className={`${styles.links} ${isMobileMenuOpen ? styles.linksOpen : ""}`}
        >
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = !link.external && isActivePath(link.to);
            const linkClasses = `${styles.link} ${isActive ? styles.linkActive : ""}`;

            if (link.external) {
              return (
                <a
                  key={link.id}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                  onClick={() => handleLinkClick(link)}
                  aria-label={link.ariaLabel}
                >
                  {Icon && (
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className={styles.linkIcon}
                    />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            }

            return (
              <a
                key={link.id}
                href={link.to}
                className={linkClasses}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link);
                }}
                aria-current={isActive ? "page" : undefined}
                aria-label={link.ariaLabel}
              >
                {Icon && (
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className={styles.linkIcon}
                  />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}

          {/* Optional children (e.g., theme toggle, search) */}
          {children}
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className={styles.backdrop}
          onClick={closeMobileMenu}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeMobileMenu();
            }
          }}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
