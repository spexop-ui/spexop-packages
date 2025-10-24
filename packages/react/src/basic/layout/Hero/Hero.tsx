import { useEffect, useRef, useState } from "react";
import { FadeIn, ScaleUp, Stagger } from "../../animations/index.js";
import { Button } from "../../buttons/Button/Button.js";
import { AnimatedBackground } from "./AnimatedBackground.js";
import styles from "./Hero.module.css";
import type { HeroProps } from "./Hero.types.js";

/**
 * Hero component - Animated hero section for landing pages
 *
 * @example
 * ```tsx
 * <Hero
 *   variant="centered-spacious"
 *   title="Build Faster with Spexop"
 *   subtitle="Modern design system for React"
 *   description="Production-ready components with 245+ design tokens"
 *   primaryAction={{
 *     label: "Get Started",
 *     onClick: () => navigate('/docs')
 *   }}
 * />
 * ```
 */
export function Hero({
  variant = "centered-spacious",
  eyebrow,
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  stats,
  media,
  backgroundMedia,
  background = "default",
  align = "center",
  animation,
  backgroundPattern,
  titleLevel = 1,
  titleSize = 1,
  overlayIntensity,
  contentPosition = "center",
  features,
  ariaLabel,
  className = "",
  style,
}: HeroProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Handle video autoplay with intersection observer for media prop
  useEffect(() => {
    if (media?.type === "video" && media.autoplay && videoRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              videoRef.current?.play();
            } else {
              videoRef.current?.pause();
            }
          }
        },
        { threshold: 0.5 },
      );

      observer.observe(videoRef.current);
      return () => observer.disconnect();
    }
  }, [media]);

  // Handle video autoplay with intersection observer for backgroundMedia prop
  useEffect(() => {
    if (
      backgroundMedia?.type === "video" &&
      backgroundMedia.autoplay &&
      backgroundVideoRef.current
    ) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              backgroundVideoRef.current?.play();
            } else {
              backgroundVideoRef.current?.pause();
            }
          }
        },
        { threshold: 0.5 },
      );

      observer.observe(backgroundVideoRef.current);
      return () => observer.disconnect();
    }
  }, [backgroundMedia]);

  // Animation config with defaults
  const animationConfig = {
    disabled: animation?.disabled || prefersReducedMotion,
    sequence: animation?.sequence || "sequential",
    staggerDelay: animation?.staggerDelay || 100,
    entranceDelay: animation?.entranceDelay || 0,
  };

  // Build CSS classes
  const heroClasses = [
    styles.hero,
    styles[`hero--${variant}`],
    styles[`hero--${background}`],
    styles[`hero--align-${align}`],
    contentPosition && styles[`hero--position-${contentPosition}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Heading component based on titleLevel
  const HeadingTag = `h${titleLevel}` as const as "h1" | "h2";

  // Render eyebrow
  const renderEyebrow = () => {
    if (!eyebrow) return null;

    if (animationConfig.disabled) {
      return <div className={styles.heroEyebrow}>{eyebrow}</div>;
    }

    return (
      <FadeIn direction="down" delay={animationConfig.entranceDelay}>
        <div className={styles.heroEyebrow}>{eyebrow}</div>
      </FadeIn>
    );
  };

  // Render title
  const renderTitle = () => {
    const titleStyle = {
      fontSize: `clamp(${2.5 * titleSize}rem, ${8 * titleSize}vw, ${5 * titleSize}rem)`,
    };

    if (animationConfig.disabled) {
      return (
        <HeadingTag className={styles.heroTitle} style={titleStyle}>
          {title}
        </HeadingTag>
      );
    }

    return (
      <FadeIn
        direction="up"
        delay={
          animationConfig.sequence === "sequential"
            ? animationConfig.entranceDelay + 100
            : animationConfig.entranceDelay
        }
        duration={600}
      >
        <HeadingTag className={styles.heroTitle} style={titleStyle}>
          {title}
        </HeadingTag>
      </FadeIn>
    );
  };

  // Render subtitle
  const renderSubtitle = () => {
    if (!subtitle) return null;

    if (animationConfig.disabled) {
      return <p className={styles.heroSubtitle}>{subtitle}</p>;
    }

    return (
      <FadeIn
        direction="up"
        delay={
          animationConfig.sequence === "sequential"
            ? animationConfig.entranceDelay + 200
            : animationConfig.entranceDelay
        }
        duration={600}
      >
        <p className={styles.heroSubtitle}>{subtitle}</p>
      </FadeIn>
    );
  };

  // Render description
  const renderDescription = () => {
    if (!description) return null;

    if (animationConfig.disabled) {
      return <p className={styles.heroDescription}>{description}</p>;
    }

    return (
      <FadeIn
        direction="up"
        delay={
          animationConfig.sequence === "sequential"
            ? animationConfig.entranceDelay + 300
            : animationConfig.entranceDelay + 100
        }
        duration={600}
      >
        <p className={styles.heroDescription}>{description}</p>
      </FadeIn>
    );
  };

  // Render action buttons
  const renderActions = () => {
    if (!primaryAction && !secondaryAction) return null;

    const buttons = (
      <>
        {primaryAction && (
          <Button
            onClick={primaryAction.onClick}
            variant={primaryAction.variant || "primary"}
            size="lg"
            aria-label={primaryAction.ariaLabel}
            className={styles.heroButton}
          >
            {primaryAction.iconLeft}
            {primaryAction.label}
            {primaryAction.iconRight}
          </Button>
        )}
        {secondaryAction && (
          <Button
            onClick={secondaryAction.onClick}
            variant={secondaryAction.variant || "outline"}
            size="lg"
            aria-label={secondaryAction.ariaLabel}
            className={styles.heroButton}
          >
            {secondaryAction.iconLeft}
            {secondaryAction.label}
            {secondaryAction.iconRight}
          </Button>
        )}
      </>
    );

    if (animationConfig.disabled) {
      return <div className={styles.heroActions}>{buttons}</div>;
    }

    // Use Stagger for sequential button animations
    if (animationConfig.sequence === "sequential") {
      return (
        <div className={styles.heroActions}>
          <Stagger
            delay={animationConfig.staggerDelay}
            variant="scaleUp"
            duration={400}
          >
            {buttons}
          </Stagger>
        </div>
      );
    }

    // Use ScaleUp for simultaneous
    return (
      <div className={styles.heroActions}>
        <ScaleUp delay={animationConfig.entranceDelay + 400} duration={400}>
          {buttons}
        </ScaleUp>
      </div>
    );
  };

  // Render stats
  const renderStats = () => {
    if (!stats || stats.length === 0) return null;

    const statsContent = (
      <div className={styles.heroStats}>
        {stats.map((stat) => (
          <div key={`${stat.value}-${stat.label}`} className={styles.heroStat}>
            <div className={styles.heroStatValue}>{stat.value}</div>
            <div className={styles.heroStatLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    );

    if (animationConfig.disabled) {
      return statsContent;
    }

    return (
      <div className={styles.heroStats}>
        <Stagger
          delay={animationConfig.staggerDelay}
          variant="zoomIn"
          duration={400}
        >
          {stats.map((stat) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className={styles.heroStat}
            >
              <div className={styles.heroStatValue}>{stat.value}</div>
              <div className={styles.heroStatLabel}>{stat.label}</div>
            </div>
          ))}
        </Stagger>
      </div>
    );
  };

  // Render media
  const renderMedia = () => {
    if (!media) return null;

    const mediaContent =
      media.type === "video" ? (
        <video
          ref={videoRef}
          className={styles.heroMedia}
          src={media.src}
          muted
          loop
          playsInline
          aria-label={media.alt || "Background video"}
        />
      ) : (
        <img
          className={styles.heroMedia}
          src={media.src}
          alt={media.alt || ""}
          loading="lazy"
        />
      );

    return (
      <div className={styles.heroMediaContainer}>
        {mediaContent}
        {media.overlay && (
          <div
            className={styles.heroMediaOverlay}
            style={
              overlayIntensity !== undefined
                ? { opacity: overlayIntensity }
                : undefined
            }
          />
        )}
      </div>
    );
  };

  // Render features for feature-showcase variant
  const renderFeatures = () => {
    if (!features || features.length === 0) return null;

    const featuresContent = (
      <div className={styles.heroFeatures}>
        {features.map((feature, index) => (
          <div key={`${feature.title}-${index}`} className={styles.heroFeature}>
            <div className={styles.heroFeatureIcon}>{feature.icon}</div>
            <h3 className={styles.heroFeatureTitle}>{feature.title}</h3>
            <p className={styles.heroFeatureDescription}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    );

    if (animationConfig.disabled) {
      return featuresContent;
    }

    return (
      <div className={styles.heroFeatures}>
        <Stagger
          delay={animationConfig.staggerDelay}
          variant="fadeIn"
          duration={400}
        >
          {features.map((feature, index) => (
            <div
              key={`${feature.title}-${index}`}
              className={styles.heroFeature}
            >
              <div className={styles.heroFeatureIcon}>{feature.icon}</div>
              <h3 className={styles.heroFeatureTitle}>{feature.title}</h3>
              <p className={styles.heroFeatureDescription}>
                {feature.description}
              </p>
            </div>
          ))}
        </Stagger>
      </div>
    );
  };

  // Render universal background media
  const renderBackgroundMedia = () => {
    if (!backgroundMedia) return null;

    const mediaContent =
      backgroundMedia.type === "video" ? (
        <video
          ref={backgroundVideoRef}
          className={styles.heroBackgroundMedia}
          src={backgroundMedia.src}
          muted
          loop
          autoPlay
          playsInline
          aria-label={backgroundMedia.alt || "Background video"}
        />
      ) : (
        <img
          className={styles.heroBackgroundMedia}
          src={backgroundMedia.src}
          alt={backgroundMedia.alt || ""}
          loading="lazy"
        />
      );

    return (
      <div className={styles.heroBackgroundMediaContainer}>
        {mediaContent}
        {backgroundMedia.overlay && (
          <div
            className={styles.heroBackgroundMediaOverlay}
            style={
              overlayIntensity !== undefined
                ? { opacity: overlayIntensity }
                : undefined
            }
          />
        )}
      </div>
    );
  };

  // Render content section
  const renderContent = () => (
    <div className={styles.heroContent}>
      {renderEyebrow()}
      {renderTitle()}
      {renderSubtitle()}
      {renderDescription()}
      {renderActions()}
      {renderStats()}
    </div>
  );

  return (
    <section
      className={heroClasses}
      style={style}
      aria-label={ariaLabel || "Hero section"}
    >
      {/* Universal Background Media */}
      {renderBackgroundMedia()}

      {/* Animated Background Pattern */}
      {backgroundPattern && (
        <AnimatedBackground
          variant={backgroundPattern.variant}
          intensity={backgroundPattern.intensity}
          colors={backgroundPattern.colors}
        />
      )}

      <div className={styles.heroInner}>
        {/* Feature Showcase Variant */}
        {variant === "feature-showcase" ? (
          <>
            <div className={styles.heroFeatureShowcaseHeader}>
              {renderEyebrow()}
              {renderTitle()}
              {renderSubtitle()}
              {renderDescription()}
            </div>
            {renderFeatures()}
            {renderActions()}
          </>
        ) : /* Split Variant with Content Overlay */ variant === "split" ? (
          <>
            {renderMedia()}
            <div className={styles.heroSplitContent}>{renderContent()}</div>
          </>
        ) : /* Full-Bleed Variant */ variant === "full-bleed" ? (
          <>
            {renderMedia()}
            <div className={styles.heroOverlay}>{renderContent()}</div>
          </>
        ) : (
          /* All Other Variants */ <>
            {renderContent()}
            {media && renderMedia()}
          </>
        )}
      </div>
    </section>
  );
}

Hero.displayName = "Hero";
