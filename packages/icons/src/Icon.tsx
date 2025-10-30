import { forwardRef } from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * The size of the icon in pixels
   * @default 24
   */
  size?: number | string;
  /**
   * The color of the icon
   * @default "currentColor"
   */
  color?: string;
  /**
   * The title for accessibility
   */
  title?: string;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Whether this is a filled variant
   * @internal
   */
  filled?: boolean;
}

/**
 * Base Icon component that all icons extend from
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size = 24,
      color = "currentColor",
      title,
      className = "",
      filled = false,
      children,
      ...props
    },
    ref,
  ) => {
    // Icons without titles are decorative and should be hidden from screen readers
    const isDecorative = !title;

    // For filled icons, we don't need stroke attributes
    const strokeProps = filled
      ? {}
      : {
          stroke: color,
          strokeWidth: props.strokeWidth || "2",
          strokeLinecap: "round" as const,
          strokeLinejoin: "round" as const,
        };

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? color : "none"}
        className={`spexop-icon ${filled ? "spexop-icon-filled" : ""} ${className}`.trim()}
        role={isDecorative ? "presentation" : "img"}
        aria-hidden={isDecorative ? "true" : undefined}
        {...strokeProps}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        {children}
      </svg>
    );
  },
);

Icon.displayName = "Icon";
