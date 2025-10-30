import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Rows = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M3 12h18M3 12V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 12v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    </Icon>
  );
});

Rows.displayName = "Rows";
