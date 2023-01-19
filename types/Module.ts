import { ModuleConfigFormItem, ValueType } from '#/ModuleConfig';
import { Position } from '#/Position';
import { FC } from 'react';

export enum ModuleType {
  DigitalClock = 'digitalclock',
  AnalogClock = 'analogclock'
}

export interface Module {
  id: string;
  type: ModuleType;
  position: Position;
}

export interface ModuleFCProps {
  config: Record<string, ValueType>;
}
export interface ModuleFC<T> extends FC<ModuleFCProps & T> {
  moduleName: string;
  moduleDescription?: string;
  moduleIconPath: string;
  configFormItems: ModuleConfigFormItem[];
}
