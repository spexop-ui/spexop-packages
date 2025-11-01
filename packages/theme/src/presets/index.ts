/**
 * Theme Presets
 * Collection of 12 professional preset themes for different industries
 */

import { agencyPreset } from "./agency.js";
import { corporatePreset } from "./corporate.js";
import { darkPreset } from "./dark.js";
import { documentationPreset } from "./documentation.js";
import { docsPreset } from "./docs.js";
import { ecommercePreset } from "./ecommerce.js";
import { educationPreset } from "./education.js";
import { financePreset } from "./finance.js";
import { healthcarePreset } from "./healthcare.js";
import { minimalPreset } from "./minimal.js";
import { pastelPreset } from "./pastel.js";
import { spexopPreset } from "./spexop.js";
import { startupPreset } from "./startup.js";
import { techPreset } from "./tech.js";
import { vibrantPreset } from "./vibrant.js";

// Export individual presets
export { agencyPreset } from "./agency.js";
export { corporatePreset } from "./corporate.js";
export { darkPreset } from "./dark.js";
export { ecommercePreset } from "./ecommerce.js";
export { educationPreset } from "./education.js";
export { financePreset } from "./finance.js";
export { documentationPreset } from "./documentation.js";
export { docsPreset } from "./docs.js";
export { healthcarePreset } from "./healthcare.js";
export { minimalPreset } from "./minimal.js";
export { pastelPreset } from "./pastel.js";
export { spexopPreset } from "./spexop.js";
export { startupPreset } from "./startup.js";
export { techPreset } from "./tech.js";
export { vibrantPreset } from "./vibrant.js";

/**
 * All available preset themes
 */
export const presets = {
  spexop: spexopPreset,
  tech: techPreset,
  agency: agencyPreset,
  finance: financePreset,
  healthcare: healthcarePreset,
  ecommerce: ecommercePreset,
  education: educationPreset,
  corporate: corporatePreset,
  docs: docsPreset,
  documentation: documentationPreset,
  minimal: minimalPreset,
  dark: darkPreset,
  vibrant: vibrantPreset,
  pastel: pastelPreset,
  startup: startupPreset,
} as const;

/**
 * Get preset by name
 */
export function getPreset(name: keyof typeof presets) {
  return presets[name];
}

/**
 * Get all preset names
 */
export function getPresetNames(): Array<keyof typeof presets> {
  return Object.keys(presets) as Array<keyof typeof presets>;
}

/**
 * Get presets by category/tag
 */
export function getPresetsByTag(tag: string) {
  return Object.entries(presets)
    .filter(([_, preset]) => preset.meta.tags?.includes(tag))
    .map(([name, preset]) => ({ name, preset }));
}

/**
 * Preset metadata for UI display
 */
export const presetMeta = {
  tech: {
    name: "Tech/SaaS",
    description: "Modern, professional theme with blue and purple accents",
    industry: "Technology",
    colors: ["#3b82f6", "#8b5cf6"],
  },
  agency: {
    name: "Agency",
    description: "Bold creative theme with vibrant colors",
    industry: "Creative",
    colors: ["#ec4899", "#f97316"],
  },
  finance: {
    name: "Finance",
    description: "Professional theme with green and gold",
    industry: "Financial Services",
    colors: ["#059669", "#d97706"],
  },
  healthcare: {
    name: "Healthcare",
    description: "Calming theme with blue and teal",
    industry: "Healthcare",
    colors: ["#0284c7", "#14b8a6"],
  },
  ecommerce: {
    name: "E-commerce",
    description: "Vibrant theme with orange and red",
    industry: "Retail",
    colors: ["#f97316", "#ef4444"],
  },
  education: {
    name: "Education",
    description: "Friendly theme with yellow and blue",
    industry: "Education",
    colors: ["#3b82f6", "#fbbf24"],
  },
  corporate: {
    name: "Corporate",
    description: "Conservative theme with navy and gray",
    industry: "Enterprise",
    colors: ["#1e40af", "#64748b"],
  },
  docs: {
    name: "Spexop Docs",
    description: "Compact documentation theme using Spexop brand colors",
    industry: "Developer Tools",
    colors: ["#06b6d4", "#11171b"],
  },
  documentation: {
    name: "Documentation",
    description: "Clean, readable theme optimized for docs and code",
    industry: "Developer Tools",
    colors: ["#2563eb", "#475569"],
  },
  minimal: {
    name: "Minimal",
    description: "Clean monochrome theme",
    industry: "Any",
    colors: ["#000000", "#404040"],
  },
  dark: {
    name: "Dark",
    description: "Dark-first theme for low-light usage",
    industry: "Developer Tools",
    colors: ["#06b6d4", "#a78bfa"],
  },
  vibrant: {
    name: "Vibrant",
    description: "High-energy theme with saturated colors",
    industry: "Entertainment",
    colors: ["#a855f7", "#ec4899"],
  },
  pastel: {
    name: "Pastel",
    description: "Soft gentle theme with muted colors",
    industry: "Lifestyle",
    colors: ["#c4b5fd", "#fbcfe8"],
  },
  startup: {
    name: "Startup",
    description: "Modern innovative theme with gradients",
    industry: "Startups",
    colors: ["#6366f1", "#fb7185"],
  },
  spexop: {
    name: "Spexop",
    description: "Custom Spexop brand theme matching logo colors",
    industry: "Design System",
    colors: ["#11171b", "#06b6d4"],
  },
} as const;
