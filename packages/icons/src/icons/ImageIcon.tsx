import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

/**
 * ImageIcon component
 * @param props - IconProps
 * @param ref - Ref
 * @returns ImageIcon component
 */
export const ImageIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </Icon>
  );
});

ImageIcon.displayName = "ImageIcon";
