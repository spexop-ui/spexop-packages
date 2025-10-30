import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const ExternalLink = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
      </Icon>
    );
  },
);

ExternalLink.displayName = "ExternalLink";
