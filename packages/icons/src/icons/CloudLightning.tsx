import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const CloudLightning = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
        <path d="m13 11-4 6h6l-4 6" />
      </Icon>
    );
  },
);

CloudLightning.displayName = "CloudLightning";
