import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const TrendingUp = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="m23 6-9.5 9.5-5-5L1 18" />
      <path d="M17 6h6v6" />
    </Icon>
  );
});

TrendingUp.displayName = "TrendingUp";
