import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Terminal = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="m4 17 6-6-6-6M12 19h8" />
    </Icon>
  );
});

Terminal.displayName = "Terminal";
