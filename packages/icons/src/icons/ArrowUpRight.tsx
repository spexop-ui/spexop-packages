import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const ArrowUpRight = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M7 17 17 7M7 7h10v10"/>
      </Icon>
    );
  }
);

ArrowUpRight.displayName = 'ArrowUpRight';
