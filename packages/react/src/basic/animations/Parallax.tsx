import { useEffect, useRef, useState } from "react";
import type React from "react";

export interface ParallaxProps {
  speed?: number;
  direction?: "up" | "down";
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Parallax: React.FC<ParallaxProps> = ({
  speed = 0.5,
  direction = "up",
  disabled = false,
  className,
  style,
  children,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (disabled) return;

    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const distance = scrolled - elementTop;

      const parallaxOffset =
        direction === "up" ? distance * speed : -distance * speed;

      setOffset(parallaxOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, direction, disabled]);

  const parallaxStyle: React.CSSProperties = {
    ...style,
    transform: disabled ? undefined : `translateY(${offset}px)`,
    willChange: disabled ? undefined : "transform",
  };

  return (
    <div ref={elementRef} className={className} style={parallaxStyle}>
      {children}
    </div>
  );
};

Parallax.displayName = "Parallax";
