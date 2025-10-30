import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Gitlab = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M22.65 14.39 12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.4.4 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .4.4 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.4.4 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .4.4 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94" />
    </Icon>
  );
});

Gitlab.displayName = "Gitlab";
