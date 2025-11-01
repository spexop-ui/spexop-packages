import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const CheckCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><path stroke="#fff" d="m8 12 3 3 5-6"/>
      </Icon>
    );
  }
);

CheckCircleFilled.displayName = 'CheckCircleFilled';
