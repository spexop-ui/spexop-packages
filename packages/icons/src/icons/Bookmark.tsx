import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Bookmark = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </Icon>
  );
});

Bookmark.displayName = "Bookmark";
