import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const MoreHorizontal = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
      </Icon>
    );
  }
);

MoreHorizontal.displayName = 'MoreHorizontal';
