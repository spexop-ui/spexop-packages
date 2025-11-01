import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const PlayFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path fill="currentColor" stroke="none" d="m5 3 14 9-14 9z"/>
      </Icon>
    );
  }
);

PlayFilled.displayName = 'PlayFilled';
