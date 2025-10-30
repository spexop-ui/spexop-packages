import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Medium = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M4 4v16h16V4zm13.4 3.3-.9.9c-.1.1-.1.2-.1.3V15c0 .1 0 .2.1.3l.9.9v.2H13v-.2l.9-.9c.1-.1.1-.2.1-.3V9.8l-2.5 6.4h-.3L8.5 9.8v4.3c0 .2 0 .4.2.5l1.4 1.7v.2H6.4v-.2l1.4-1.7c.1-.1.2-.3.2-.5V9c0-.2 0-.3-.1-.4L6.8 7.3V7h3.4l2.6 5.7L15 7h3.3v.3z" />
    </Icon>
  );
});

Medium.displayName = "Medium";
