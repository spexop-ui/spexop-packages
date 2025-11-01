import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const ChevronLeft = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m15 18-6-6 6-6"/>
      </Icon>
    );
  }
);

ChevronLeft.displayName = 'ChevronLeft';
