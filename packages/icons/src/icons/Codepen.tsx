import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Codepen = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m12 2 10 6.5v7L12 22 2 15.5v-7zM12 22v-6.5"/><path d="m22 8.5-10 7-10-7"/><path d="m2 15.5 10-7 10 7M12 2v6.5"/>
      </Icon>
    );
  }
);

Codepen.displayName = 'Codepen';
