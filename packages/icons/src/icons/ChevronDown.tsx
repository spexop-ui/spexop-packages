import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const ChevronDown = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m6 9 6 6 6-6"/>
      </Icon>
    );
  }
);

ChevronDown.displayName = 'ChevronDown';
