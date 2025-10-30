import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Laptop = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M22 17H2" />
    </Icon>
  );
});

Laptop.displayName = "Laptop";
