import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const StarFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path fill="currentColor" stroke="none" d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
      </Icon>
    );
  }
);

StarFilled.displayName = 'StarFilled';
