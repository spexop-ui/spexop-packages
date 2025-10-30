import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const ShieldOff = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18M4.73 4.73 4 5v7c0 6 8 10 8 10a20.3 20.3 0 0 0 5.62-4.38M1 1l22 22" />
    </Icon>
  );
});

ShieldOff.displayName = "ShieldOff";
