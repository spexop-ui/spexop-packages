import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const Film = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5" />
    </Icon>
  );
});

Film.displayName = "Film";
