import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const CornerUpLeft = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M9 14 4 9l5-5" />
        <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
      </Icon>
    );
  },
);

CornerUpLeft.displayName = "CornerUpLeft";
