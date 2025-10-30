import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const SkipForward = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m5 4 10 8-10 8zM19 5v14" />
      </Icon>
    );
  },
);

SkipForward.displayName = "SkipForward";
