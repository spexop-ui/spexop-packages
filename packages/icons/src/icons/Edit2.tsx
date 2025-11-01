import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Edit2 = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>
      </Icon>
    );
  }
);

Edit2.displayName = 'Edit2';
