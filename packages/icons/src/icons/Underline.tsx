import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Underline = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3M4 21h16"/>
      </Icon>
    );
  }
);

Underline.displayName = 'Underline';
