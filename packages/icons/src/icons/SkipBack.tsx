import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const SkipBack = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M19 20 9 12l10-8zM5 19V5" />
    </Icon>
  );
});

SkipBack.displayName = "SkipBack";
