import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const ChevronRight = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m9 18 6-6-6-6" />
      </Icon>
    );
  },
);

ChevronRight.displayName = "ChevronRight";
