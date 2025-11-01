import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const AlignLeft = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M17 10H3M21 6H3M21 14H3M17 18H3"/>
      </Icon>
    );
  }
);

AlignLeft.displayName = 'AlignLeft';
