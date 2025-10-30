import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const ShoppingBag = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </Icon>
    );
  },
);

ShoppingBag.displayName = "ShoppingBag";
