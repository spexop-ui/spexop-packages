import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Columns = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" />
    </Icon>
  );
});

Columns.displayName = "Columns";
