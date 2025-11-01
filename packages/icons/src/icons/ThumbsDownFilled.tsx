import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const ThumbsDownFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" fill="currentColor" stroke="none"/>
      </Icon>
    );
  }
);

ThumbsDownFilled.displayName = 'ThumbsDownFilled';
