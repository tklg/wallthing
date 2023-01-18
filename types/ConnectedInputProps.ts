import { UseControllerProps } from 'react-hook-form';

export interface ConnectedInputProps extends Pick<UseControllerProps, 'name' | 'rules'> {
  label: string;
  placeholder?: string;
};
