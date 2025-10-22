/**
 * Hero Component Examples
 * Demonstrates all variants and features
 */

import { Badge } from "../../indicators/Badge/Badge.js";
import { Hero } from "./Hero.js";

// Example 1: Centered Hero (Default)
export function CenteredHeroExample() {
  return (
    <Hero
      variant="centered"
      title="Build Faster with Spexop"
      subtitle="Modern design system for React"
      description="Production-ready components with 245+ design tokens and sophisticated animations"
      primaryAction={{
        label: "Get Started",
        onClick: () => console.log("Get Started clicked"),
      }}
      secondaryAction={{
        label: "View Docs",
        onClick: () => console.log("View Docs clicked"),
        variant: "outlined",
      }}
      stats={[
        { value: "245+", label: "Design Tokens" },
        { value: "30+", label: "Components" },
        { value: "100%", label: "TypeScript" },
      ]}
    />
  );
}

// Example 2: Split Hero with Media
export function SplitHeroExample() {
  return (
    <Hero
      variant="split"
      align="left"
      title="Design System Excellence"
      description="30+ production-ready components with liquid glass aesthetic and comprehensive accessibility support"
      background="elevated"
      media={{
        type: "image",
        src: "https://placehold.co/600x400",
        alt: "Design system showcase",
      }}
      primaryAction={{
        label: "Explore Components",
        onClick: () => console.log("Explore clicked"),
      }}
    />
  );
}

// Example 3: Minimal Hero with Badge
export function MinimalHeroExample() {
  return (
    <Hero
      variant="minimal"
      eyebrow={<Badge variant="success">New Release</Badge>}
      title="Version 2.0 is Here"
      description="Introducing enhanced animations and 15 new components"
      primaryAction={{
        label: "Read Announcement",
        onClick: () => console.log("Read announcement clicked"),
        variant: "tonal",
      }}
    />
  );
}

// Example 4: Full-Bleed Hero with Video
export function FullBleedHeroExample() {
  return (
    <Hero
      variant="full-bleed"
      title="Immersive Experiences"
      subtitle="Build stunning landing pages with video backgrounds"
      background="transparent"
      media={{
        type: "video",
        src: "https://example.com/background-video.mp4",
        autoplay: true,
        overlay: true,
      }}
      primaryAction={{
        label: "Watch Demo",
        onClick: () => console.log("Watch demo clicked"),
        variant: "elevated",
      }}
      animation={{
        sequence: "sequential",
        staggerDelay: 150,
        entranceDelay: 300,
      }}
    />
  );
}

// Example 5: Hero with Custom Animation Config
export function AnimatedHeroExample() {
  return (
    <Hero
      variant="centered"
      title="Smooth Animations"
      subtitle="Built with performance in mind"
      description="All animations respect user preferences and run at 60fps"
      animation={{
        sequence: "sequential",
        staggerDelay: 100,
        entranceDelay: 0,
        disabled: false,
      }}
      primaryAction={{
        label: "See in Action",
        onClick: () => console.log("See in action clicked"),
      }}
      stats={[
        { value: "60fps", label: "Performance" },
        { value: "100%", label: "Accessible" },
      ]}
    />
  );
}

// Example 6: Hero with Gradient Background
export function GradientHeroExample() {
  return (
    <Hero
      variant="centered"
      background="gradient"
      title="Beautiful Gradients"
      subtitle="Liquid glass aesthetic"
      description="Experience the signature Spexop design language with smooth gradients and glass effects"
      primaryAction={{
        label: "Learn More",
        onClick: () => console.log("Learn more clicked"),
      }}
    />
  );
}

// Example 7: Contemporary Hero with Animated Background
export function ContemporaryHeroExample() {
  return (
    <Hero
      variant="centered"
      background="elevated"
      eyebrow={
        <Badge variant="default" pill>
          Contemporary Design
        </Badge>
      }
      title="Next-Generation UI"
      subtitle="Animated particles and glass morphism effects"
      description="Experience cutting-edge design with animated background particles, enhanced glass effects, and sophisticated micro-interactions"
      primaryAction={{
        label: "Explore Features",
        onClick: () => console.log("Explore clicked"),
        variant: "elevated",
      }}
      secondaryAction={{
        label: "View Examples",
        onClick: () => console.log("View examples clicked"),
        variant: "tonal",
      }}
      stats={[
        { value: "60fps", label: "Smooth Animations" },
        { value: "3", label: "Pattern Variants" },
        { value: "100%", label: "Accessible" },
      ]}
      backgroundPattern={{
        variant: "particles",
        intensity: "medium",
        colors: [
          "rgba(239, 68, 68, 0.4)",
          "rgba(239, 68, 68, 0.2)",
          "rgba(148, 163, 184, 0.3)",
          "rgba(148, 163, 184, 0.1)",
        ],
      }}
      animation={{
        sequence: "sequential",
        staggerDelay: 100,
        entranceDelay: 200,
      }}
    />
  );
}
