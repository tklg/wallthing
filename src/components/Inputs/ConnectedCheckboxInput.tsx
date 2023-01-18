import { ConnectedInputProps } from '#/ConnectedInputProps';
import { CheckboxProps, Checkbox } from '@nextui-org/react';
import { FC } from 'react';
import { useController } from 'react-hook-form';

type ConnectedCheckboxInputProps = ConnectedInputProps & Partial<CheckboxProps>

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
      isSelected={value}
      onChange={checked => onChange({ target: { value: checked }})}
      onBlur={onBlur}
      color={color}
    />
  )
}
