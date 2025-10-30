import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Type = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M4 7V4h16v3M9 20h6M12 4v16" />
    </Icon>
  );
});

Type.displayName = "Type";
