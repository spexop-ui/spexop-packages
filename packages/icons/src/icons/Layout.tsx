import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Layout = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/>
      </Icon>
    );
  }
);

Layout.displayName = 'Layout';
