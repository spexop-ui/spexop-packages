import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Facebook = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Icon>
  );
});

Facebook.displayName = "Facebook";
