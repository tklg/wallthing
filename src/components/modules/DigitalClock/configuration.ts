import { ModuleConfigFormItem } from '#/ModuleConfig';
import { ConnectedCheckboxInput, ConnectedTextInput } from '@/components/Inputs';

export const configItems: ModuleConfigFormItem[] = [
  {
    id: 'show-seconds',
    label: 'Show seconds',
    InputComponent: ConnectedCheckboxInput,
    defaultValue: false
  }
];
