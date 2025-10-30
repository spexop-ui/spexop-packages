/**
 * Constants for Spexop CLI
 */

export const THEME_PRESETS = [
  {
    value: "tech",
    label: "Tech/SaaS - Modern blue & purple",
    hint: "Best for SaaS, tech startups",
  },
  {
    value: "minimal",
    label: "Minimal - Clean monochrome",
    hint: "Simple, elegant design",
  },
  {
    value: "dark",
    label: "Dark - Dark-first theme",
    hint: "Developer tools, dark UI",
  },
  {
    value: "finance",
    label: "Finance - Green & gold",
    hint: "Financial services",
  },
  {
    value: "healthcare",
    label: "Healthcare - Blue & teal",
    hint: "Medical, wellness apps",
  },
  {
    value: "ecommerce",
    label: "E-commerce - Orange & red",
    hint: "Online stores",
  },
  {
    value: "education",
    label: "Education - Yellow & blue",
    hint: "Learning platforms",
  },
  {
    value: "corporate",
    label: "Corporate - Navy & gray",
    hint: "Enterprise applications",
  },
  {
    value: "agency",
    label: "Agency - Vibrant creative",
    hint: "Creative agencies",
  },
  {
    value: "vibrant",
    label: "Vibrant - High-energy",
    hint: "Entertainment, gaming",
  },
  {
    value: "pastel",
    label: "Pastel - Soft gentle",
    hint: "Lifestyle, wellness",
  },
  {
    value: "startup",
    label: "Startup - Modern gradients",
    hint: "Modern startups",
  },
] as const;

export const ROUTER_OPTIONS = [
  {
    value: "hash",
    label: "Hash Router",
    hint: "Client-side routing, works without server config",
  },
  {
    value: "react-router",
    label: "React Router",
    hint: "Full-featured routing library",
  },
  {
    value: "none",
    label: "None",
    hint: "Single page, no routing",
  },
] as const;

export const TEMPLATE_OPTIONS = [
  {
    value: "full-app",
    label: "Full Application",
    hint: "Complete app with TopBar, Sidebar, Navigation, Command Palette",
  },
  {
    value: "minimal",
    label: "Minimal",
    hint: "Bare-bones setup with basic primitives",
  },
] as const;

export type ThemePreset = (typeof THEME_PRESETS)[number]["value"];
export type RouterOption = (typeof ROUTER_OPTIONS)[number]["value"];
export type TemplateOption = (typeof TEMPLATE_OPTIONS)[number]["value"];
