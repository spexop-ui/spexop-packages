import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const AlignCenter = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M18 10H6M21 6H3M21 14H3M18 18H6" />
      </Icon>
    );
  },
);

AlignCenter.displayName = "AlignCenter";
