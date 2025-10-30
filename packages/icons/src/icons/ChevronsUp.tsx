import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const ChevronsUp = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="m17 11-5-5-5 5M17 18l-5-5-5 5" />
    </Icon>
  );
});

ChevronsUp.displayName = "ChevronsUp";
