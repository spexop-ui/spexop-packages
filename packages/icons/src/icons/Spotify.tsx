import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Spotify = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14.5c1.5-1 4-1 5.5 0m-6-3c2-1.5 5-1.5 7 0M7 8.5c2.5-1.5 6.5-1.5 9 0" />
    </Icon>
  );
});

Spotify.displayName = "Spotify";
