import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Layers = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </Icon>
    );
  }
);

Layers.displayName = 'Layers';
