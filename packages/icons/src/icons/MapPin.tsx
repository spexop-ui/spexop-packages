import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const MapPin = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0"/><circle cx="12" cy="10" r="3"/>
      </Icon>
    );
  }
);

MapPin.displayName = 'MapPin';
