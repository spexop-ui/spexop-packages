import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Link2 = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3M8 12h8"/>
      </Icon>
    );
  }
);

Link2.displayName = 'Link2';
