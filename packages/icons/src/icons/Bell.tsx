import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Bell = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
    </Icon>
  );
});

Bell.displayName = "Bell";
