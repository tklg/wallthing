import { ModuleConfigFormItem } from '#/ModuleConfig';
import { ConnectedRadioInput } from '@/components/Inputs';
import { PathRouteDirection } from '@/components/modules/PathArrivals/types/path-data';

export interface PathDeparturesConfigValues {
  direction: PathRouteDirection | null;
}

export const configItems: (ModuleConfigFormItem & { id: keyof PathDeparturesConfigValues; })[] = [
  {
    id: 'direction',
    label: 'Route direction',
    // @ts-ignore
    InputComponent: ConnectedRadioInput,
    orientation: 'horizontal',
    options: [
      {
        label: 'Both',
        value: null
      },
      {
        label: 'To NY',
        value: PathRouteDirection.TO_NY
      },
      {
        label: 'To NJ',
        value: PathRouteDirection.TO_NJ
      },
    ]
  }
];
