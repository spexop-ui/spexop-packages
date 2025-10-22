/**
 * Layout Components
 *
 * Essential structure for pages and sections.
 * Includes Hero, Section, Footer, accordions, and settings panels.
 */

export * from "./Accordion/index.js";
export * from "./Footer/index.js";
export * from "./Hero/index.js";
export * from "./PanelSection/index.js";
export * from "./ScrollHeader/index.js";
export * from "./Section/index.js";
export * from "./SettingsPanel/index.js";
export * from "./StickySection/index.js";

// Backwards compatibility re-exports
export { ContextNav } from "../navigation/ContextNav/index.js";
