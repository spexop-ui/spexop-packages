import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Telegram = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M12 2 3 6l9 4 9-4z"/><path d="m12 10 9-4v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/>
      </Icon>
    );
  }
);

Telegram.displayName = 'Telegram';
