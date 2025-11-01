import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Percent = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
      </Icon>
    );
  }
);

Percent.displayName = 'Percent';
