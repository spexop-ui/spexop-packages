import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Grid = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
    </Icon>
  );
});

Grid.displayName = "Grid";
