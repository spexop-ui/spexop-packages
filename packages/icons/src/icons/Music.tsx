import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Music = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </Icon>
  );
});

Music.displayName = "Music";
