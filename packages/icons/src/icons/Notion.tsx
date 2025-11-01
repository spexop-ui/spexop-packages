import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Notion = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m4 4 3-1 13 1a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1L7 22l-3-1z"/><path d="M9 4v16m4-15 5 1v13l-5 1"/>
      </Icon>
    );
  }
);

Notion.displayName = 'Notion';
