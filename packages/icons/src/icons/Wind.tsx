import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Wind = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </Icon>
  );
});

Wind.displayName = "Wind";
