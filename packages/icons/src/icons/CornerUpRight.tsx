import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const CornerUpRight = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m15 14 5-5-5-5"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/>
      </Icon>
    );
  }
);

CornerUpRight.displayName = 'CornerUpRight';
