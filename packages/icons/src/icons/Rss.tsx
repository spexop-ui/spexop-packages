import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Rss = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>
      </Icon>
    );
  }
);

Rss.displayName = 'Rss';
