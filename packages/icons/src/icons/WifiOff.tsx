import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const WifiOff = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="m1 1 22 22M16.72 11.06A11 11 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.58 9M1.42 9a15.9 15.9 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
    </Icon>
  );
});

WifiOff.displayName = "WifiOff";
