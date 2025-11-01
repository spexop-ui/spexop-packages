import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const Upload = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
      </Icon>
    );
  }
);

Upload.displayName = 'Upload';
