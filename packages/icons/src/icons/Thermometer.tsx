import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Thermometer = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0"/>
      </Icon>
    );
  }
);

Thermometer.displayName = 'Thermometer';
