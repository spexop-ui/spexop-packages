import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Redo = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>
      </Icon>
    );
  }
);

Redo.displayName = 'Redo';
