import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Smartphone = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/>
      </Icon>
    );
  }
);

Smartphone.displayName = 'Smartphone';
