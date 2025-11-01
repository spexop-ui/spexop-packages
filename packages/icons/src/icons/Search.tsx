import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Search = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </Icon>
    );
  }
);

Search.displayName = 'Search';
