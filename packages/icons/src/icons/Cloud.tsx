import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Cloud = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10" />
    </Icon>
  );
});

Cloud.displayName = "Cloud";
