import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const BatteryCharging = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19M23 13v-2M11 6l-4 6h6l-4 6" />
      </Icon>
    );
  },
);

BatteryCharging.displayName = "BatteryCharging";
