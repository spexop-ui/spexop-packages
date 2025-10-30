import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const GitBranch = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M6 3v12" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </Icon>
  );
});

GitBranch.displayName = "GitBranch";
