import { ConnectedInputProps } from '#/ConnectedInputProps';
import { ModuleType } from '#/Module';
import { Position } from '#/Position';
import { FC } from 'react';

export enum ModuleConfigFieldType {
  Text = 'text',
  Number = 'number',
  Checkbox = 'checkbox',
  Switch = 'switch',
}

export type ValueType = string | number | boolean;

export interface ModuleConfigFormItem {
  id: string;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  InputComponent: FC<ConnectedInputProps>;
  defaultValue?: ValueType;
}

export interface ModuleConfigDataStore {
  version: number;
  modules: Record<string, ModuleConfigDataStoreItem>;
}

export interface ModuleConfigDataStoreItem {
  id: string;
  type: ModuleType;
  values: Record<string, ValueType>;
  position: Position;
}
