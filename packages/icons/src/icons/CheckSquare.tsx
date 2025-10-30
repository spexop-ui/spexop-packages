import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const CheckSquare = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m9 11 3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </Icon>
    );
  },
);

CheckSquare.displayName = "CheckSquare";
