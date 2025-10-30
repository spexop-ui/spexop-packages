import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const RotateCcw = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M1 4v6h6" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </Icon>
  );
});

RotateCcw.displayName = "RotateCcw";
