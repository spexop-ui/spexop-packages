import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Clock = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Icon>
  );
});

Clock.displayName = "Clock";
