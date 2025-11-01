import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const AlignJustify = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M21 10H3M21 6H3M21 14H3M21 18H3"/>
      </Icon>
    );
  }
);

AlignJustify.displayName = 'AlignJustify';
