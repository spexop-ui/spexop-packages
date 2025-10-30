import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const UserCheck = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="m17 11 2 2 4-4" />
    </Icon>
  );
});

UserCheck.displayName = "UserCheck";
