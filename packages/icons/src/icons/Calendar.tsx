import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Calendar = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
      </Icon>
    );
  }
);

Calendar.displayName = 'Calendar';
