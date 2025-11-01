import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const PoundSterling = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M16 6a4 4 0 0 0-8 0v9H6M3 12h9M6 21h11"/>
      </Icon>
    );
  }
);

PoundSterling.displayName = 'PoundSterling';
