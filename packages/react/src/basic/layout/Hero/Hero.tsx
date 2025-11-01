import { useEffect, useRef, useState } from "react";
import { FadeIn, ScaleUp, Stagger } from "../../animations/index.js";
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
  titleColor,
  titleWeight,
  titleLetterSpacing,
  titleMaxWidth,
  titleOpacity,
  titleLineHeight,
  subtitleSize = 1,
  subtitleColor,
  subtitleWeight,
  subtitleLetterSpacing,
  subtitleMaxWidth,
  subtitleOpacity,
  subtitleLineHeight,
  descriptionSize = 1,
  descriptionColor,
  descriptionWeight,
  descriptionLetterSpacing,
  descriptionMaxWidth,
  descriptionOpacity,
  descriptionLineHeight,
  statsValueSize = 1,
  statsValueColor,
  statsValueWeight,
  statsValueLineHeight,
  statsValueLetterSpacing,
  statsLabelSize,
  statsLabelColor,
  statsLabelWeight,
  statsLabelTransform,
  statsLabelLineHeight,
  statsLabelLetterSpacing,
  overlayIntensity,
  contentTheme = "auto",
  contentPosition = "center",
  features,
  imagePosition = "right",
  ariaLabel,
  className = "",
  style,
}: HeroProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement>(null);
  const mediaImageRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);

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

  // Check for theme (dark/light)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTheme = () => {
      const html = document.documentElement;
      // Priority: data-theme attribute > dark class > system preference
      const dataTheme = html.getAttribute("data-theme");
      let isDark = false;

      if (dataTheme) {
        // Explicit theme setting takes priority
        isDark = dataTheme === "dark";
      } else {
        // Fallback to class or system preference
        isDark =
          html.classList.contains("dark") ||
          window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      setIsDarkTheme((prev) => {
        // Only update if changed to avoid unnecessary re-renders
        return prev !== isDark ? isDark : prev;
      });
    };

    // Initial check
    checkTheme();

    // Watch for theme changes on document element
    const observer = new MutationObserver(() => {
      // Small delay to ensure attribute is fully updated
      setTimeout(checkTheme, 0);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
      subtree: false,
    });

    // Listen to system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      setTimeout(checkTheme, 0);
    };
    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, []);

  // Update image src when theme changes
  useEffect(() => {
    if (media?.type === "image" && mediaImageRef.current) {
      const getImageSrc = (): string => {
        if (isDarkTheme && media.srcDark) {
          return media.srcDark;
        }
        if (!isDarkTheme && media.srcLight) {
          return media.srcLight;
        }
        return media.src;
      };
      const newSrc = getImageSrc();
      // Always update - browser will handle if it's the same
      mediaImageRef.current.src = newSrc;
    }
  }, [isDarkTheme, media]);

  // Update background image src when theme changes
  useEffect(() => {
    if (backgroundMedia?.type === "image" && backgroundImageRef.current) {
      const getBackgroundImageSrc = (): string => {
        if (isDarkTheme && backgroundMedia.srcDark) {
          return backgroundMedia.srcDark;
        }
        if (!isDarkTheme && backgroundMedia.srcLight) {
          return backgroundMedia.srcLight;
        }
        return backgroundMedia.src;
      };
      const newSrc = getBackgroundImageSrc();
      // Always update - browser will handle if it's the same
      backgroundImageRef.current.src = newSrc;
    }
  }, [isDarkTheme, backgroundMedia]);

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

  // Handle parallax effect for background images
  useEffect(() => {
    if (
      !backgroundMedia ||
      backgroundMedia.type !== "image" ||
      !backgroundMedia.parallax ||
      backgroundMedia.parallax === "none" ||
      prefersReducedMotion ||
      !backgroundImageRef.current ||
      !heroRef.current
    ) {
      return;
    }

    const image = backgroundImageRef.current;
    const hero = heroRef.current;
    const parallaxIntensity = backgroundMedia.parallax;

    // Parallax speed multipliers
    const speedMultipliers = {
      subtle: 0.2,
      medium: 0.4,
      strong: 0.6,
    };

    const speed = speedMultipliers[parallaxIntensity] || 0.2;

    const handleScroll = () => {
      const rect = hero.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const heroTop = rect.top + scrollTop;
      const heroHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Calculate how far through the hero section we've scrolled
      const scrolled = scrollTop + viewportHeight - heroTop;
      const progress = Math.max(
        0,
        Math.min(1, scrolled / (heroHeight + viewportHeight)),
      );

      // Apply parallax transform
      const translateY = (progress - 0.5) * heroHeight * speed;
      image.style.transform = `translate3d(0, ${translateY}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [backgroundMedia, prefersReducedMotion]);

  // Animation config with defaults
  const animationConfig = {
    disabled: animation?.disabled || prefersReducedMotion,
    sequence: animation?.sequence || "sequential",
    staggerDelay: animation?.staggerDelay || 100,
    entranceDelay: animation?.entranceDelay || 0,
  };

  // Build CSS classes
  // Map variant to CSS class name (handle renamed classes to avoid CSS module conflicts)
  const variantClass = variant === "title" ? "titleVariant" : variant;

  // Add image position class for split-image variant
  const imagePositionClass =
    variant === "split-image" ? styles[`hero--image-${imagePosition}`] : null;

  const heroClasses = [
    styles.hero,
    styles[`hero--${variantClass}`],
    styles[`hero--${background}`],
    styles[`hero--align-${align}`],
    contentPosition && styles[`hero--position-${contentPosition}`],
    imagePositionClass,
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

  // Determine content color scheme based on contentTheme prop
  const hasBackgroundMedia = Boolean(backgroundMedia);
  const shouldUseLightContent =
    contentTheme === "light" || (contentTheme === "auto" && hasBackgroundMedia);

  // Render title
  const renderTitle = () => {
    const titleStyle: React.CSSProperties = {
      fontSize: `clamp(${2.5 * titleSize}rem, ${8 * titleSize}vw, ${5 * titleSize}rem) !important`,
      ...(titleColor
        ? { color: titleColor }
        : shouldUseLightContent && { color: "#ffffff" }),
      ...(titleWeight && { fontWeight: titleWeight }),
      ...(titleLetterSpacing && { letterSpacing: titleLetterSpacing }),
      ...(titleLineHeight && { lineHeight: titleLineHeight }),
      ...(titleMaxWidth && {
        maxWidth: titleMaxWidth,
        ...(align === "center" && { marginInline: "auto" }),
        ...(align === "right" && { marginLeft: "auto" }),
      }),
      ...(titleOpacity !== undefined && { opacity: titleOpacity }),
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

    const subtitleStyle: React.CSSProperties = {
      fontSize: `clamp(${1.25 * subtitleSize}rem, ${3 * subtitleSize}vw, ${1.75 * subtitleSize}rem) !important`,
      ...(subtitleColor
        ? { color: subtitleColor }
        : shouldUseLightContent && { color: "rgba(255, 255, 255, 0.9)" }),
      ...(subtitleWeight && { fontWeight: subtitleWeight }),
      ...(subtitleLetterSpacing && { letterSpacing: subtitleLetterSpacing }),
      ...(subtitleLineHeight && { lineHeight: subtitleLineHeight }),
      ...(subtitleMaxWidth && {
        maxWidth: subtitleMaxWidth,
        ...(align === "center" && { marginInline: "auto" }),
        ...(align === "right" && { marginLeft: "auto" }),
      }),
      ...(subtitleOpacity !== undefined && { opacity: subtitleOpacity }),
    };

    if (animationConfig.disabled) {
      return (
        <p className={styles.heroSubtitle} style={subtitleStyle}>
          {subtitle}
        </p>
      );
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
        <p className={styles.heroSubtitle} style={subtitleStyle}>
          {subtitle}
        </p>
      </FadeIn>
    );
  };

  // Render description
  const renderDescription = () => {
    if (!description) return null;

    const descriptionStyle: React.CSSProperties = {
      fontSize: `clamp(${1 * descriptionSize}rem, ${2 * descriptionSize}vw, ${1.125 * descriptionSize}rem) !important`,
      ...(descriptionColor
        ? { color: descriptionColor }
        : shouldUseLightContent && { color: "rgba(255, 255, 255, 0.85)" }),
      ...(descriptionWeight && { fontWeight: descriptionWeight }),
      ...(descriptionLetterSpacing && {
        letterSpacing: descriptionLetterSpacing,
      }),
      ...(descriptionLineHeight && { lineHeight: descriptionLineHeight }),
      ...(descriptionMaxWidth && {
        maxWidth: descriptionMaxWidth,
        ...(align === "center" && { marginInline: "auto" }),
        ...(align === "right" && { marginLeft: "auto" }),
      }),
      ...(descriptionOpacity !== undefined && { opacity: descriptionOpacity }),
    };

    if (animationConfig.disabled) {
      return (
        <p className={styles.heroDescription} style={descriptionStyle}>
          {description}
        </p>
      );
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
        <p className={styles.heroDescription} style={descriptionStyle}>
          {description}
        </p>
      </FadeIn>
    );
  };

  // Render action buttons
  const renderActions = () => {
    if (!primaryAction && !secondaryAction) return null;

    // Custom button styles following Spexop principles (borders before shadows)
    const primaryButtonStyle: React.CSSProperties = shouldUseLightContent
      ? {
          padding: "var(--theme-spacing-4) var(--theme-spacing-8)",
          fontSize: "var(--theme-font-size-lg)",
          fontWeight: "var(--theme-font-weight-semibold)",
          color: "#ffffff",
          background: "transparent",
          border: "2px solid #ffffff",
          borderRadius: "var(--theme-radius-md)",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }
      : {
          padding: "var(--theme-spacing-4) var(--theme-spacing-8)",
          fontSize: "var(--theme-font-size-lg)",
          fontWeight: "var(--theme-font-weight-semibold)",
          color: "var(--theme-text)",
          background: "transparent",
          border: "2px solid var(--theme-border-strong)",
          borderRadius: "var(--theme-radius-md)",
          cursor: "pointer",
          transition: "all 0.2s ease",
        };

    const secondaryButtonStyle: React.CSSProperties = shouldUseLightContent
      ? {
          padding: "var(--theme-spacing-4) var(--theme-spacing-8)",
          fontSize: "var(--theme-font-size-lg)",
          fontWeight: "var(--theme-font-weight-semibold)",
          color: "#ffffff",
          background: "transparent",
          border: "2px solid rgba(255, 255, 255, 0.6)",
          borderRadius: "var(--theme-radius-md)",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }
      : {
          padding: "var(--theme-spacing-4) var(--theme-spacing-8)",
          fontSize: "var(--theme-font-size-lg)",
          fontWeight: "var(--theme-font-weight-semibold)",
          color: "var(--theme-text-secondary)",
          background: "transparent",
          border: "2px solid var(--theme-border)",
          borderRadius: "var(--theme-radius-md)",
          cursor: "pointer",
          transition: "all 0.2s ease",
        };

    const buttons = (
      <>
        {primaryAction && (
          <button
            type="button"
            onClick={primaryAction.onClick}
            aria-label={primaryAction.ariaLabel}
            className={styles.heroButton}
            style={primaryButtonStyle}
            onMouseEnter={(e) => {
              if (shouldUseLightContent) {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              } else {
                e.currentTarget.style.background = "var(--theme-surface-hover)";
                e.currentTarget.style.borderColor = "var(--theme-primary)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              if (!shouldUseLightContent) {
                e.currentTarget.style.borderColor =
                  "var(--theme-border-strong)";
              }
            }}
          >
            {primaryAction.iconLeft}
            {primaryAction.label}
            {primaryAction.iconRight}
          </button>
        )}
        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            aria-label={secondaryAction.ariaLabel}
            className={styles.heroButton}
            style={secondaryButtonStyle}
            onMouseEnter={(e) => {
              if (shouldUseLightContent) {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "#ffffff";
              } else {
                e.currentTarget.style.background = "var(--theme-surface-hover)";
                e.currentTarget.style.borderColor =
                  "var(--theme-border-strong)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              if (shouldUseLightContent) {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
              } else {
                e.currentTarget.style.borderColor = "var(--theme-border)";
              }
            }}
          >
            {secondaryAction.iconLeft}
            {secondaryAction.label}
            {secondaryAction.iconRight}
          </button>
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

    // Stats value styles
    const statsValueStyle: React.CSSProperties = {
      fontSize: `clamp(${2 * statsValueSize}rem, ${4 * statsValueSize}vw, ${3 * statsValueSize}rem) !important`,
      ...(statsValueColor
        ? { color: statsValueColor }
        : shouldUseLightContent && { color: "#ffffff" }),
      ...(statsValueWeight && { fontWeight: statsValueWeight }),
      ...(statsValueLineHeight && { lineHeight: statsValueLineHeight }),
      ...(statsValueLetterSpacing && {
        letterSpacing: statsValueLetterSpacing,
      }),
    };

    // Stats label styles
    const statsLabelStyle: React.CSSProperties = {
      ...(statsLabelSize && { fontSize: statsLabelSize }),
      ...(statsLabelColor
        ? { color: statsLabelColor }
        : shouldUseLightContent && { color: "rgba(255, 255, 255, 0.8)" }),
      ...(statsLabelWeight && { fontWeight: statsLabelWeight }),
      ...(statsLabelTransform && { textTransform: statsLabelTransform }),
      ...(statsLabelLineHeight && { lineHeight: statsLabelLineHeight }),
      ...(statsLabelLetterSpacing && {
        letterSpacing: statsLabelLetterSpacing,
      }),
    };

    return (
      <div className={styles.heroStats}>
        <Stagger
          delay={animationConfig.staggerDelay}
          variant="zoomIn"
          duration={400}
          disabled={animationConfig.disabled}
        >
          {stats.map((stat) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className={styles.heroStat}
            >
              <div className={styles.heroStatValue} style={statsValueStyle}>
                {stat.value}
              </div>
              <div className={styles.heroStatLabel} style={statsLabelStyle}>
                {stat.label}
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    );
  };

  // Render media
  const renderMedia = () => {
    if (!media) return null;

    // Size preset values
    const sizePresets = {
      compact: { width: "300px", maxWidth: "400px" },
      medium: { width: "500px", maxWidth: "600px" },
      large: { width: "700px", maxWidth: "800px" },
      full: {},
    };

    // Image-specific styles
    const imageStyle: React.CSSProperties =
      media.type === "image"
        ? {
            objectFit: media.imageFit || "cover",
            objectPosition: media.imagePosition || "center",
          }
        : {};

    // Build CSS filter string for images
    const buildFilterString = (): string => {
      if (media.type !== "image" || !media.filters) return "";
      const filters = media.filters;
      const filterParts: string[] = [];

      if (filters.blur !== undefined) {
        filterParts.push(`blur(${filters.blur})`);
      }
      if (filters.brightness !== undefined) {
        filterParts.push(
          `brightness(${typeof filters.brightness === "number" ? filters.brightness : filters.brightness})`,
        );
      }
      if (filters.contrast !== undefined) {
        filterParts.push(
          `contrast(${typeof filters.contrast === "number" ? filters.contrast : filters.contrast})`,
        );
      }
      if (filters.grayscale !== undefined) {
        filterParts.push(
          `grayscale(${typeof filters.grayscale === "number" ? filters.grayscale : filters.grayscale})`,
        );
      }
      if (filters.hueRotate !== undefined) {
        filterParts.push(`hue-rotate(${filters.hueRotate}deg)`);
      }
      if (filters.invert !== undefined) {
        filterParts.push(
          `invert(${typeof filters.invert === "number" ? filters.invert : filters.invert})`,
        );
      }
      if (filters.opacity !== undefined) {
        filterParts.push(`opacity(${filters.opacity})`);
      }
      if (filters.saturate !== undefined) {
        filterParts.push(
          `saturate(${typeof filters.saturate === "number" ? filters.saturate : filters.saturate})`,
        );
      }
      if (filters.sepia !== undefined) {
        filterParts.push(
          `sepia(${typeof filters.sepia === "number" ? filters.sepia : filters.sepia})`,
        );
      }

      return filterParts.join(" ");
    };

    const filterString = buildFilterString();
    if (filterString && media.type === "image") {
      imageStyle.filter = filterString;
    }

    // Animation classes and styles
    const animationConfig = media.animation;
    const animationClass =
      animationConfig?.type &&
      animationConfig.type !== "none" &&
      media.type === "image" &&
      !prefersReducedMotion
        ? styles[`heroMedia--animate-${animationConfig.type}`]
        : null;

    const animationStyle: React.CSSProperties =
      animationConfig &&
      animationConfig.type !== "none" &&
      media.type === "image" &&
      !prefersReducedMotion
        ? {
            animationDuration: `${animationConfig.duration || 600}ms`,
            animationDelay: `${animationConfig.delay || 0}ms`,
            animationTimingFunction: animationConfig.easing || "ease-out",
          }
        : {};

    // Container styles for sizing (only for images, not backgroundMedia)
    const containerStyle: React.CSSProperties = {};
    if (media.type === "image") {
      // Apply size preset if no custom dimensions provided
      if (media.imageSize && !media.imageWidth && !media.imageHeight) {
        const preset = sizePresets[media.imageSize];
        if (preset && "width" in preset && preset.width) {
          containerStyle.width = preset.width;
        }
        if (preset && "maxWidth" in preset && preset.maxWidth) {
          containerStyle.maxWidth = preset.maxWidth;
        }
      }

      // Custom dimensions override presets
      if (media.imageWidth) {
        containerStyle.width = media.imageWidth;
      }
      if (media.imageHeight) {
        containerStyle.height = media.imageHeight;
      }
      if (media.maxImageWidth) {
        containerStyle.maxWidth = media.maxImageWidth;
      }
      if (media.maxImageHeight) {
        containerStyle.maxHeight = media.maxImageHeight;
      }
      if (media.aspectRatio) {
        containerStyle.aspectRatio = media.aspectRatio;
      }
    }

    // Border styles (applies to all media types)
    const borderWidthMap = {
      none: "0",
      default: "2px",
      thick: "3px",
      thicker: "4px",
    };

    const borderSetting = media.border || "default";
    if (borderSetting !== "none") {
      // Apply border width
      if (media.borderWidth) {
        containerStyle.borderWidth = media.borderWidth;
        containerStyle.borderStyle = "solid";
      } else if (borderSetting !== "default") {
        containerStyle.borderWidth = borderWidthMap[borderSetting];
        containerStyle.borderStyle = "solid";
      } else {
        // Default border already in CSS, but ensure it's solid
        containerStyle.borderStyle = "solid";
      }

      // Apply border color if provided
      if (media.borderColor) {
        containerStyle.borderColor = media.borderColor;
      }
    } else {
      // Borderless
      containerStyle.border = "none";
    }

    // Border radius
    if (media.borderRadius !== undefined) {
      containerStyle.borderRadius = media.borderRadius;
    }

    // Container size class
    const sizeClass =
      media.type === "image" && media.imageSize
        ? styles[`heroMediaContainer--${media.imageSize}`]
        : null;

    // Border class
    const borderClass = media.border
      ? styles[`heroMediaContainer--border-${media.border}`]
      : null;

    // Determine image source based on theme
    const getImageSrc = (): string => {
      if (media.type === "image") {
        if (isDarkTheme && media.srcDark) {
          return media.srcDark;
        }
        if (!isDarkTheme && media.srcLight) {
          return media.srcLight;
        }
      }
      return media.src;
    };

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
          ref={mediaImageRef}
          key={`media-${isDarkTheme}`}
          className={`${styles.heroMedia} ${animationClass || ""}`.trim()}
          src={getImageSrc()}
          alt={media.alt || ""}
          loading="lazy"
          style={{ ...imageStyle, ...animationStyle }}
        />
      );

    // Overlay position class
    const overlayClass =
      media.overlay && media.overlayPosition
        ? styles[`heroMediaOverlay--${media.overlayPosition}`]
        : null;

    return (
      <div
        className={`${styles.heroMediaContainer} ${sizeClass || ""} ${borderClass || ""}`.trim()}
        style={
          Object.keys(containerStyle).length > 0 ? containerStyle : undefined
        }
      >
        {mediaContent}
        {media.overlay && (
          <div
            className={`${styles.heroMediaOverlay} ${overlayClass || ""}`.trim()}
            style={
              overlayIntensity !== undefined
                ? { opacity: overlayIntensity }
                : undefined
            }
          />
        )}
        {/* AI Generated Badge */}
        {media.aiGenerated && (
          <div className={styles.heroMediaAIBadge}>AI Generated</div>
        )}
        {/* Media Credits */}
        {media.credits && (
          <div
            className={styles.heroMediaCredits}
            style={{
              background:
                media.creditsBackgroundColor ||
                (shouldUseLightContent
                  ? "var(--theme-overlay)"
                  : "var(--theme-surface)"),
              color:
                media.creditsTextColor ||
                (shouldUseLightContent
                  ? "var(--theme-surface)"
                  : "var(--theme-text)"),
              borderColor:
                media.creditsBorderColor ||
                (shouldUseLightContent
                  ? "rgba(255, 255, 255, 0.2)"
                  : "var(--theme-border)"),
            }}
          >
            {typeof media.credits === "function"
              ? media.credits({ isDark: isDarkTheme })
              : media.credits}
          </div>
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

    // Image-specific styles
    const imageStyle: React.CSSProperties =
      backgroundMedia.type === "image"
        ? {
            objectFit: backgroundMedia.imageFit || "cover",
            objectPosition: backgroundMedia.imagePosition || "center",
          }
        : {};

    // Parallax data attribute
    const parallaxDataAttr =
      backgroundMedia.type === "image" && backgroundMedia.parallax
        ? backgroundMedia.parallax
        : null;

    // Determine image source based on theme for background media
    const getBackgroundImageSrc = (): string => {
      if (backgroundMedia.type === "image") {
        if (isDarkTheme && backgroundMedia.srcDark) {
          return backgroundMedia.srcDark;
        }
        if (!isDarkTheme && backgroundMedia.srcLight) {
          return backgroundMedia.srcLight;
        }
      }
      return backgroundMedia.src;
    };

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
          key={`background-${isDarkTheme}`}
          ref={backgroundImageRef}
          className={styles.heroBackgroundMedia}
          src={getBackgroundImageSrc()}
          alt={backgroundMedia.alt || ""}
          loading="lazy"
          style={imageStyle}
          data-parallax={parallaxDataAttr || undefined}
        />
      );

    // Overlay position class
    const overlayClass =
      backgroundMedia.overlay && backgroundMedia.overlayPosition
        ? styles[
            `heroBackgroundMediaOverlay--${backgroundMedia.overlayPosition}`
          ]
        : null;

    // Container class with parallax
    const containerClasses = [
      styles.heroBackgroundMediaContainer,
      parallaxDataAttr &&
        styles[`heroBackgroundMediaContainer--parallax-${parallaxDataAttr}`],
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses}>
        {mediaContent}
        {backgroundMedia.overlay && (
          <div
            className={`${styles.heroBackgroundMediaOverlay} ${overlayClass || ""}`.trim()}
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
      ref={heroRef}
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
        ) : /* Split-Image Variant with Image on Left/Right */ variant ===
          "split-image" ? (
          <>
            {imagePosition === "left" ? (
              <>
                {renderMedia()}
                <div className={styles.heroSplitContent}>{renderContent()}</div>
              </>
            ) : (
              <>
                <div className={styles.heroSplitContent}>{renderContent()}</div>
                {renderMedia()}
              </>
            )}
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
