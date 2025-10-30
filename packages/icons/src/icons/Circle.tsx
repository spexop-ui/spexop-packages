import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Circle = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
    </Icon>
  );
});

Circle.displayName = "Circle";
