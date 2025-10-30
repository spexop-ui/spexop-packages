import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const AlertCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
        <path stroke="#fff" d="M12 8v4M12 16h.01" />
      </Icon>
    );
  },
);

AlertCircleFilled.displayName = "AlertCircleFilled";
