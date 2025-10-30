import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Google = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M12 11v2.4h3.9c-.2 1-1.2 3-3.9 3-2.3 0-4.2-1.9-4.2-4.3S9.7 7.8 12 7.8c1.3 0 2.2.6 2.7 1.1l1.9-1.8C15.3 5.9 13.8 5 12 5c-3.9 0-7 3.1-7 7s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2z" />
    </Icon>
  );
});

Google.displayName = "Google";
