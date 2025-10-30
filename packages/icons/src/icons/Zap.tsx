import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Zap = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9z" />
    </Icon>
  );
});

Zap.displayName = "Zap";
