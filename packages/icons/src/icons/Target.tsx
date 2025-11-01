import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Target = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </Icon>
    );
  }
);

Target.displayName = 'Target';
