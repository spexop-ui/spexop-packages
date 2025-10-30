import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const FolderOpen = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <path d="m2 11 5 5h15v-5" />
    </Icon>
  );
});

FolderOpen.displayName = "FolderOpen";
