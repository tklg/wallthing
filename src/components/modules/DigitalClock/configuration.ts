import { ModuleConfigFormItem } from '#/ModuleConfig';
import { ConnectedCheckboxInput } from '@/components/Inputs';

export interface DigitalClockConfigValues {
  showSeconds?: boolean;
  showDate?: boolean;
}

export const configItems: (ModuleConfigFormItem & { id: keyof DigitalClockConfigValues; })[] = [
  {
    id: 'showSeconds',
    label: 'Show seconds',
    InputComponent: ConnectedCheckboxInput,
    defaultValue: false
  },
  {
    id: 'showDate',
    label: 'Show date',
    InputComponent: ConnectedCheckboxInput,
    defaultValue: true
  }
];
