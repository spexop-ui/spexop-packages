import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Compass = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z" />
    </Icon>
  );
});

Compass.displayName = "Compass";
