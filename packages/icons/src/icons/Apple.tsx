import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Apple = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M12 2.5c1-1.5 3-2 4.5-1.5s2.5 2 2 3.5-2 2.5-3.5 2-2.5-2.5-2-4zM7.5 9C5 9 3 11 3 13.5c0 3.5 2 7 4 8.5 1.5 1 3 1 4 0s2-.5 3.5 0 2.5 1 4 0c2-1.5 4-5 4-8.5 0-2.5-2-4.5-4.5-4.5-1.5 0-2.5.5-3.5 1.5S12.5 12 11 12s-2.5-2-3.5-3" />
    </Icon>
  );
});

Apple.displayName = "Apple";
