import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Tiktok = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </Icon>
  );
});

Tiktok.displayName = "Tiktok";
