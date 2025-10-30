import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const DollarSign = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </Icon>
  );
});

DollarSign.displayName = "DollarSign";
