import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Hash = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />
    </Icon>
  );
});

Hash.displayName = "Hash";
