import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const IndianRupee = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M6 3h12M6 7h9a3 3 0 0 1 0 6H6l9 8M6 11h9" />
      </Icon>
    );
  },
);

IndianRupee.displayName = "IndianRupee";
