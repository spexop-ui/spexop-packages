import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const PenTool = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="m12 19 7-7 3 3-7 7z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18zM2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </Icon>
  );
});

PenTool.displayName = "PenTool";
