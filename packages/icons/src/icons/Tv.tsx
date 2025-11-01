import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Tv = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><path d="m17 2-5 5-5-5"/>
      </Icon>
    );
  }
);

Tv.displayName = 'Tv';
