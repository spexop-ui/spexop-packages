import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const ChevronUp = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="m18 15-6-6-6 6" />
    </Icon>
  );
});

ChevronUp.displayName = "ChevronUp";
