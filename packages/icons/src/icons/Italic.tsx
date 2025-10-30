import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Italic = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M19 4h-9M14 20H5M15 4 9 20" />
    </Icon>
  );
});

Italic.displayName = "Italic";
