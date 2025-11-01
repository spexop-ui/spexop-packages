import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Flag = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>
      </Icon>
    );
  }
);

Flag.displayName = 'Flag';
