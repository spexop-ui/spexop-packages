import type { IconProps } from "./Icon";
import type React from "react";

export type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

export interface IconMetadata {
  name: string;
  category?: string;
  tags?: string[];
}


