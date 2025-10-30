import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Bitcoin = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.5 8H13a2.5 2.5 0 0 1 0 5H9.5zM9.5 13h4a2.5 2.5 0 0 1 0 5h-4zM11 3v3M13 3v3M11 18v3M13 18v3" />
    </Icon>
  );
});

Bitcoin.displayName = "Bitcoin";
