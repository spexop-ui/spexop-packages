import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Shield = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </Icon>
  );
});

Shield.displayName = "Shield";
