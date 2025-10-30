import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const ArrowRightCircle = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="m12 16 4-4-4-4M8 12h8" />
      </Icon>
    );
  },
);

ArrowRightCircle.displayName = "ArrowRightCircle";
