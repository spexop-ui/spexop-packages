import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Monitor = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/>
      </Icon>
    );
  }
);

Monitor.displayName = 'Monitor';
