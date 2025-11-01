import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Plus = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M12 5v14M5 12h14"/>
      </Icon>
    );
  }
);

Plus.displayName = 'Plus';
