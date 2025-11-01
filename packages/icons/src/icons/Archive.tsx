import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Archive = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"/>
      </Icon>
    );
  }
);

Archive.displayName = 'Archive';
