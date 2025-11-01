import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Instagram = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37M17.5 6.5h.01"/>
      </Icon>
    );
  }
);

Instagram.displayName = 'Instagram';
