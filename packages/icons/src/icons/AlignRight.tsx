import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const AlignRight = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M21 10H7M21 6H3M21 14H3M21 18H7"/>
      </Icon>
    );
  }
);

AlignRight.displayName = 'AlignRight';
