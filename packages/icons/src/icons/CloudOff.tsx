import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const CloudOff = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3M1 1l22 22"/>
      </Icon>
    );
  }
);

CloudOff.displayName = 'CloudOff';
