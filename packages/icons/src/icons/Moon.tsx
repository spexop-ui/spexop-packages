import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Moon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79" />
    </Icon>
  );
});

Moon.displayName = "Moon";
