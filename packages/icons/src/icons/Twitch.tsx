import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Twitch = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M21 2H3v16h5v4l4-4h5l4-4zm-10 9V7m5 4V7" />
    </Icon>
  );
});

Twitch.displayName = "Twitch";
