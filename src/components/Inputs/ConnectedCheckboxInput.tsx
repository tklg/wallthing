import { CheckboxProps, Checkbox } from '@nextui-org/react';
import { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

type ConnectedCheckboxInputProps = Pick<UseControllerProps, 'name' | 'rules'> & Partial<CheckboxProps> & {
  label: string;
};

export const ConnectedCheckboxInput: FC<ConnectedCheckboxInputProps> = ({
  name, 
  rules, 
  label, 
  color = 'gradient',
  size = 'md',
  ...props
}) => {
  const { field: { onChange, value, onBlur, ref } } = useController({
    name,
    rules
  })

  return (
    <Checkbox
      {...props}
      size={size}
      ref={ref}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      color={color}
    />
  )
}
