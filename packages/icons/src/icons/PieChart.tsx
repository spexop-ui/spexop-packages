import { forwardRef } from "react";
import { Icon, type IconProps } from "../Icon";

export const PieChart = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} {...props}>
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </Icon>
  );
});

PieChart.displayName = "PieChart";
