import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Unlock = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </Icon>
  );
});

Unlock.displayName = "Unlock";
