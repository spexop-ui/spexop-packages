import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Award = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/>
      </Icon>
    );
  }
);

Award.displayName = 'Award';
