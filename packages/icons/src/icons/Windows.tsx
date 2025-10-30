import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Windows = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M3 5.5 10.5 4v6.5H3zm0 8h7.5V20L3 18.5zM13.5 3.5 21 2v8.5h-7.5zm0 10H21V22l-7.5-1.5z" />
    </Icon>
  );
});

Windows.displayName = "Windows";
