import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const XTwitter = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m4 4 9 13m7-13-9 13m0 0-7-7m7 7 7-7M4 4l16 16"/>
      </Icon>
    );
  }
);

XTwitter.displayName = 'XTwitter';
