import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Navigation = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="m3 11 19-9-9 19-2-8z" />
    </Icon>
  );
});

Navigation.displayName = "Navigation";
