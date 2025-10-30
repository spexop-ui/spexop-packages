import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const SquareStack = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <rect x="14" y="14" width="8" height="8" rx="2" />
        <rect x="2" y="2" width="8" height="8" rx="2" />
        <path d="M7 14v1a2 2 0 0 0 2 2h1M14 7h1a2 2 0 0 1 2 2v1" />
      </Icon>
    );
  },
);

SquareStack.displayName = "SquareStack";
