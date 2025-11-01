import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Anchor = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="5" r="3"/><path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3"/>
      </Icon>
    );
  }
);

Anchor.displayName = 'Anchor';
