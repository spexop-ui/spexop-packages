import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const CloudRain = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M16 13v8M8 13v8M12 15v8M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
      </Icon>
    );
  }
);

CloudRain.displayName = 'CloudRain';
