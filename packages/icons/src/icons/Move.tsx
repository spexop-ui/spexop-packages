import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Move = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m5 9-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/>
      </Icon>
    );
  }
);

Move.displayName = 'Move';
