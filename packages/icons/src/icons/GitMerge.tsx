import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const GitMerge = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>
      </Icon>
    );
  }
);

GitMerge.displayName = 'GitMerge';
