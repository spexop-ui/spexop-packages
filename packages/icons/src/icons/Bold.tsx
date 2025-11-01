import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Bold = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6zM6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
      </Icon>
    );
  }
);

Bold.displayName = 'Bold';
