import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const ArrowLeftCircle = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="m12 8-4 4 4 4M16 12H8" />
      </Icon>
    );
  },
);

ArrowLeftCircle.displayName = "ArrowLeftCircle";
