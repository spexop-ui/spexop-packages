import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const ArrowLeft = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </Icon>
  );
});

ArrowLeft.displayName = "ArrowLeft";
