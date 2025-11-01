import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const ArrowUpCircle = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4M12 16V8"/>
      </Icon>
    );
  }
);

ArrowUpCircle.displayName = 'ArrowUpCircle';
