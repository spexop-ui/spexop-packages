import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Reddit = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10"/><path d="M16 15s-1.5 2-4 2-4-2-4-2M18.5 9.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-10 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
      </Icon>
    );
  }
);

Reddit.displayName = 'Reddit';
