import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Save = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2" />
      <path d="M17 21v-8H7v8M7 3v5h8" />
    </Icon>
  );
});

Save.displayName = "Save";
