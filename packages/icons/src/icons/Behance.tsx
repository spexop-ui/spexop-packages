import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Behance = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M3 8h6.5C11 8 12 9 12 10.5S11 13 9.5 13H3zm0 5h7c1.7 0 3 1.3 3 3s-1.3 3-3 3H3zM14 7h7m-4 8.5a2.5 2.5 0 1 0 5 0c0-1.5-1-2.5-2.5-2.5S14 14 14 15.5z"/>
      </Icon>
    );
  }
);

Behance.displayName = 'Behance';
