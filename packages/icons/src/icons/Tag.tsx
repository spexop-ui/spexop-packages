import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Tag = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82M7 7h.01" />
    </Icon>
  );
});

Tag.displayName = "Tag";
