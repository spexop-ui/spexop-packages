import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Battery = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><path d="M23 13v-2"/>
      </Icon>
    );
  }
);

Battery.displayName = 'Battery';
