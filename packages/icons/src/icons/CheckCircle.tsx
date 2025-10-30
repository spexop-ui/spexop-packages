import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const CheckCircle = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4 12 14.01l-3-3" />
      </Icon>
    );
  },
);

CheckCircle.displayName = "CheckCircle";
