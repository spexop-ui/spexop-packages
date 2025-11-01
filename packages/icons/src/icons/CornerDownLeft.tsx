import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const CornerDownLeft = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m9 10-5 5 5 5"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/>
      </Icon>
    );
  }
);

CornerDownLeft.displayName = 'CornerDownLeft';
