import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Youtube = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33" />
      <path d="m9.75 15.02 5.75-3.27-5.75-3.27z" />
    </Icon>
  );
});

Youtube.displayName = "Youtube";
