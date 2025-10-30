import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const RotateCw = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M23 4v6h-6" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </Icon>
  );
});

RotateCw.displayName = "RotateCw";
