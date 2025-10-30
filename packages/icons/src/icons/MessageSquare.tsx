import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const MessageSquare = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </Icon>
    );
  },
);

MessageSquare.displayName = "MessageSquare";
