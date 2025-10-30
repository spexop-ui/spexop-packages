import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const ChevronsDown = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m7 13 5 5 5-5M7 6l5 5 5-5" />
      </Icon>
    );
  },
);

ChevronsDown.displayName = "ChevronsDown";
