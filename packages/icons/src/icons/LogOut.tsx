import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const LogOut = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </Icon>
  );
});

LogOut.displayName = "LogOut";
