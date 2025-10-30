import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Code = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </Icon>
  );
});

Code.displayName = "Code";
