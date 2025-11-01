import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Minus = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M5 12h14"/>
      </Icon>
    );
  }
);

Minus.displayName = 'Minus';
