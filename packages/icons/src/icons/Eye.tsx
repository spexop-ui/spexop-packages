import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Eye = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  );
});

Eye.displayName = "Eye";
