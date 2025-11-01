import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const File = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v7h7"/>
      </Icon>
    );
  }
);

File.displayName = 'File';
