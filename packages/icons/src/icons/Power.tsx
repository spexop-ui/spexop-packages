import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Power = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"/>
      </Icon>
    );
  }
);

Power.displayName = 'Power';
