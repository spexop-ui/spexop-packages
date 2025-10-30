import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const ToggleRight = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <rect x="1" y="5" width="22" height="14" rx="7" ry="7" />
        <circle cx="16" cy="12" r="3" />
      </Icon>
    );
  },
);

ToggleRight.displayName = "ToggleRight";
