import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const ZapOff = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M12.41 6.75 13 2l-2.43 2.92M18.57 12.91 21 10h-5.34M8 8l-5 6h9l-1 8 5-6M1 1l22 22" />
    </Icon>
  );
});

ZapOff.displayName = "ZapOff";
