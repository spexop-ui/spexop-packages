import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const DownloadCloud = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <path d="m8 17 4 4 4-4M12 12v9"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/><path d="m8 17 4 4 4-4"/>
      </Icon>
    );
  }
);

DownloadCloud.displayName = 'DownloadCloud';
