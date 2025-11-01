import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const MapIcon = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4zm7-4v16m8-12v16"/>
      </Icon>
    );
  }
);

MapIcon.displayName = 'MapIcon';
