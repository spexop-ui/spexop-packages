import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Pause = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
      </Icon>
    );
  }
);

Pause.displayName = 'Pause';
