import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Umbrella = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7" />
    </Icon>
  );
});

Umbrella.displayName = "Umbrella";
