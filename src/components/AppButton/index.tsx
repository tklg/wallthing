import { Button, ButtonProps } from '@nextui-org/react';
import clsx from 'clsx';
import { FC } from 'react';
import styles from './index.module.scss'

type AppButtonProps = Omit<ButtonProps, 'onClick'> & {

};

export const AppButton: FC<AppButtonProps> = ({
  children,
  size = 'md',
  color = 'gradient',
  className,
  ...props
}) => {
  if (props.flat || props.light) {
    color = 'default'
  }
  return (
    <Button
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
};
