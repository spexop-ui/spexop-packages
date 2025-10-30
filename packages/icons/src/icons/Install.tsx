import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Install = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M12 2v12" />
      <path d="m8 10 4 4 4-4" />
      <path d="M3 17v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
    </Icon>
  );
});

Install.displayName = "Install";
