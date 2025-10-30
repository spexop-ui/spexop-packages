import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Send = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
    </Icon>
  );
});

Send.displayName = "Send";
