import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const List = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </Icon>
  );
});

List.displayName = "List";
