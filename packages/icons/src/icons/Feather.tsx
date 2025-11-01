import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Feather = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5zM16 8 2 22M17.5 15H9"/>
      </Icon>
    );
  }
);

Feather.displayName = 'Feather';
