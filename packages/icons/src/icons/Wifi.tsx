import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Wifi = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>
      </Icon>
    );
  }
);

Wifi.displayName = 'Wifi';
