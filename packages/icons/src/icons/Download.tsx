import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Download = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
      </Icon>
    );
  }
);

Download.displayName = 'Download';
