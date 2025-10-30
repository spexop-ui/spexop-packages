import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Activity = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </Icon>
  );
});

Activity.displayName = "Activity";
