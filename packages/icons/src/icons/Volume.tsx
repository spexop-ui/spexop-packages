import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Volume = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M11 5 6 9H2v6h4l5 4z" />
    </Icon>
  );
});

Volume.displayName = "Volume";
