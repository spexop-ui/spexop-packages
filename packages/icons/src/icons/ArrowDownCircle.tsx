import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const ArrowDownCircle = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="10"/><path d="m8 12 4 4 4-4M12 8v8"/>
      </Icon>
    );
  }
);

ArrowDownCircle.displayName = 'ArrowDownCircle';
