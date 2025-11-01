import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Close = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M18 6 6 18M6 6l12 12"/>
      </Icon>
    );
  }
);

Close.displayName = 'Close';
