import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const AlertTriangle = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4M12 17h.01"/>
      </Icon>
    );
  }
);

AlertTriangle.displayName = 'AlertTriangle';
