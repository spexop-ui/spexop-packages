import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const ArrowDownRight = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m7 7 10 10M17 7v10H7" />
      </Icon>
    );
  },
);

ArrowDownRight.displayName = "ArrowDownRight";
