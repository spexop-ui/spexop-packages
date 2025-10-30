import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Undo = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M3 7v6h6" />
      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
    </Icon>
  );
});

Undo.displayName = "Undo";
