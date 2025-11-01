import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const ChevronsRight = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m13 17 5-5-5-5M6 17l5-5-5-5"/>
      </Icon>
    );
  }
);

ChevronsRight.displayName = 'ChevronsRight';
