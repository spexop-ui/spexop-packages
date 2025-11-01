import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const LogIn = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
      </Icon>
    );
  }
);

LogIn.displayName = 'LogIn';
