import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const TrendingDown = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m23 18-9.5-9.5-5 5L1 6"/><path d="M17 18h6v-6"/>
      </Icon>
    );
  }
);

TrendingDown.displayName = 'TrendingDown';
