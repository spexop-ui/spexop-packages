import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const CloudSnow = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25M8 16h.01M8 20h.01M12 18h.01M12 22h.01M16 16h.01M16 20h.01"/>
      </Icon>
    );
  }
);

CloudSnow.displayName = 'CloudSnow';
