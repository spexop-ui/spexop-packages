import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const ArrowDownLeft = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M17 7 7 17M17 17H7V7"/>
      </Icon>
    );
  }
);

ArrowDownLeft.displayName = 'ArrowDownLeft';
