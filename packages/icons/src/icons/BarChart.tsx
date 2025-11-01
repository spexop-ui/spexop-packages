import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const BarChart = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M12 20V10M18 20V4M6 20v-4"/>
      </Icon>
    );
  }
);

BarChart.displayName = 'BarChart';
