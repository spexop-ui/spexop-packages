import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Euro = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M19 6.5a10 10 0 1 0 0 11M2 10h8M2 14h8"/>
      </Icon>
    );
  }
);

Euro.displayName = 'Euro';
