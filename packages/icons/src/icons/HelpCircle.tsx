import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const HelpCircle = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
      </Icon>
    );
  }
);

HelpCircle.displayName = 'HelpCircle';
