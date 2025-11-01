import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Mail = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2"/><path d="m22 6-10 7L2 6"/>
      </Icon>
    );
  }
);

Mail.displayName = 'Mail';
