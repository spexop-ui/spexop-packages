import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const ArrowUp = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </Icon>
    );
  }
);

ArrowUp.displayName = 'ArrowUp';
