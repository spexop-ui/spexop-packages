import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Volume2 = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M11 5 6 9H2v6h4l5 4zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </Icon>
  );
});

Volume2.displayName = "Volume2";
