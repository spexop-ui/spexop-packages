import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Play = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m5 3 14 9-14 9z"/>
      </Icon>
    );
  }
);

Play.displayName = 'Play';
