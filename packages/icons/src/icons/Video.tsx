import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Video = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m23 7-7 5 7 5z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </Icon>
    );
  }
);

Video.displayName = 'Video';
