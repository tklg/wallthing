import { Schema } from 'electron-store';
import { ModuleConfigDataStore } from '#/ModuleConfig';

export const moduleConfigSchema: Schema<ModuleConfigDataStore> = {
  version: {
    type: 'number'
  },
  modules: {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      type: {
        type: 'string',
        enum: [
          'digitalclock',
          'analogclock',
        ]
      },
      values: {
        type: 'object',
      }
    }
  }
};
