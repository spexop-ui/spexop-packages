import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Server = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <path d="M6 6h.01M6 18h.01" />
    </Icon>
  );
});

Server.displayName = "Server";
