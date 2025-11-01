import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Menu = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M3 12h18M3 6h18M3 18h18"/>
      </Icon>
    );
  }
);

Menu.displayName = 'Menu';
