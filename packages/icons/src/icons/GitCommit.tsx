import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const GitCommit = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <circle cx="12" cy="12" r="4"/><path d="M1.05 12H7M17.01 12h5.95"/>
      </Icon>
    );
  }
);

GitCommit.displayName = 'GitCommit';
