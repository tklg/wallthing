import { ConnectedInputProps } from '#/ConnectedInputProps';
import { Radio, RadioGroupProps } from '@nextui-org/react';
import { FC } from 'react';
import { useController } from 'react-hook-form';

type ConnectedRadioInputProps = ConnectedInputProps & Partial<RadioGroupProps> & {
  options: {
    value: string;
    label: string;
  }[]
}

export const ConnectedRadioInput: FC<ConnectedRadioInputProps> = ({
  name, 
  rules, 
  label, 
  color = 'gradient',
  size = 'md',
  options = [],
  placeholder,
  ...props
}) => {
  const { field: { onChange, value, onBlur, ref } } = useController({
    name,
    rules
  })

  return (
    <Radio.Group
      {...props}
      size={size}
      ref={ref}
      label={label}
      name={name}
      value={value}
      onChange={checked => onChange({ target: { value: checked }})}
      onBlur={onBlur}
    >
      {options.map(opt => (
        <Radio
          key={opt.value}
          value={opt.value}
        >
          {opt.label}
        </Radio>
      ))}
    </Radio.Group>
  )
}
