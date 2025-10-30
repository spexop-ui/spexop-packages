import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const XCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
        <path stroke="#fff" d="m15 9-6 6M9 9l6 6" />
      </Icon>
    );
  },
);

XCircleFilled.displayName = "XCircleFilled";
