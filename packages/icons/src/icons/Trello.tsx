import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Trello = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M7 7h3v9H7zM14 7h3v5h-3z"/>
      </Icon>
    );
  }
);

Trello.displayName = 'Trello';
