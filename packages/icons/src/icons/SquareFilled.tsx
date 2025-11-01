import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const SquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="currentColor" stroke="none"/>
      </Icon>
    );
  }
);

SquareFilled.displayName = 'SquareFilled';
