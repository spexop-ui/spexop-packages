import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Home = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>
      </Icon>
    );
  }
);

Home.displayName = 'Home';
