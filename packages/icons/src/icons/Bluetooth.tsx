import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Bluetooth = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m6.5 6.5 11 11L12 23V1l5.5 5.5-11 11"/>
      </Icon>
    );
  }
);

Bluetooth.displayName = 'Bluetooth';
