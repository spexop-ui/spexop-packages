import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Package2 = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M16.5 9.4 7.55 4.24M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>
      </Icon>
    );
  }
);

Package2.displayName = 'Package2';
