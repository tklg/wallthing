import { ConnectedInputProps } from '#/ConnectedInputProps';
import { Input, InputProps } from '@nextui-org/react';
import { FC } from 'react';
import { useController } from 'react-hook-form';

type ConnectedTextInputProps = ConnectedInputProps & Partial<InputProps>

export const ConnectedTextInput: FC<ConnectedTextInputProps> = ({ name, rules, label, ...props }) => {
  const { field: { onChange, value, onBlur, ref }, fieldState: { invalid, error } } = useController({
    name,
    rules
  })

  return (
    <Input
      {...props}
      ref={ref}
      label={label}
      name={name}
      value={value}
      rounded
      bordered
      onChange={onChange}
      onBlur={onBlur}
      status={invalid ? (error ? 'error' : 'warning') : 'default'}
      helperText={error?.message}
      helperColor='error'
    />
  )
}
