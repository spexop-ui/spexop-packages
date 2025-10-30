import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Tablet = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </Icon>
  );
});

Tablet.displayName = "Tablet";
