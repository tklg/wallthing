import { ModuleConfigFormItem } from '#/ModuleConfig';
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

export interface ModuleFC extends FC {
  moduleName: string;
  moduleDescription?: string;
  moduleIconPath: string;
  configFormItems: ModuleConfigFormItem[];
}
