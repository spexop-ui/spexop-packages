import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Printer = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>
      </Icon>
    );
  }
);

Printer.displayName = 'Printer';
