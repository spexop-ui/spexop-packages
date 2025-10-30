import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const FilePlus = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M12 18v-6M9 15h6" />
    </Icon>
  );
});

FilePlus.displayName = "FilePlus";
