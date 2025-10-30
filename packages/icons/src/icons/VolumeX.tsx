import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const VolumeX = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M11 5 6 9H2v6h4l5 4zM23 9l-6 6M17 9l6 6" />
    </Icon>
  );
});

VolumeX.displayName = "VolumeX";
