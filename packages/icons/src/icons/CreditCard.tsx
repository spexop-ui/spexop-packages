import { forwardRef } from 'react';
import { Icon, type IconProps } from '../Icon';

export const CreditCard = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <Icon ref={ref} {...props}>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><path d="M1 10h22"/>
      </Icon>
    );
  }
);

CreditCard.displayName = 'CreditCard';
