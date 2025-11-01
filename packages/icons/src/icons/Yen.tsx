import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Yen = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m6 3 6 9 6-9M12 12v9M7 13h10M7 17h10"/>
      </Icon>
    );
  }
);

Yen.displayName = 'Yen';
