import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const XTwitter = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M18 6 6 18 M6 6 18 18" />
    </Icon>
  );
});

XTwitter.displayName = "XTwitter";
