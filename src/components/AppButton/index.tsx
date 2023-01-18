import { Button, ButtonProps } from '@nextui-org/react';
import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './index.module.scss'

export interface AppButtonProps extends Omit<ButtonProps, 'onClick'> {};

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(({
  children,
  size = 'md',
  color = 'gradient',
  className,
  ...props
}, ref) => {
  if (props.flat || props.light) {
    color = 'default'
  }
  return (
    <Button
      ref={ref}
      rounded
      size={size} 
      auto
      color={color} 
      {...props}
      className={clsx(styles.btn, className)}
    >
      {children}
    </Button>
  );
});
