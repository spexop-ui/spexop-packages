import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Droplet = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m12 2.69 5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </Icon>
    );
  }
);

Droplet.displayName = 'Droplet';
