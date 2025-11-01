import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const InfoFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><path stroke="#fff" d="M12 16v-4M12 8h.01"/>
      </Icon>
    );
  }
);

InfoFilled.displayName = 'InfoFilled';
