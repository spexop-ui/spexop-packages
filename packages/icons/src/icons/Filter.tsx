import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Filter = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>
      </Icon>
    );
  }
);

Filter.displayName = 'Filter';
