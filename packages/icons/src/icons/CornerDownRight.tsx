import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const CornerDownRight = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/>
      </Icon>
    );
  }
);

CornerDownRight.displayName = 'CornerDownRight';
