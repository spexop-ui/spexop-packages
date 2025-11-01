import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Scissors = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/>
      </Icon>
    );
  }
);

Scissors.displayName = 'Scissors';
