import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const ArrowRight = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </Icon>
    );
  }
);

ArrowRight.displayName = 'ArrowRight';
