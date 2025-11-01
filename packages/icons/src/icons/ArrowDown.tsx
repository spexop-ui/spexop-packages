import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const ArrowDown = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M12 5v14M19 12l-7 7-7-7"/>
      </Icon>
    );
  }
);

ArrowDown.displayName = 'ArrowDown';
