import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const AtSign = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
      </Icon>
    );
  }
);

AtSign.displayName = 'AtSign';
