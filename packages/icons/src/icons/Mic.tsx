import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Mic = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
      </Icon>
    );
  }
);

Mic.displayName = 'Mic';
