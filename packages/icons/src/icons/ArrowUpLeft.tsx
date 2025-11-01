import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const ArrowUpLeft = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M17 17 7 7M7 17V7h10"/>
      </Icon>
    );
  }
);

ArrowUpLeft.displayName = 'ArrowUpLeft';
