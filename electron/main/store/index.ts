import Store from 'electron-store';
import { moduleConfigSchema } from './jsonschemas/moduleconfigschema';
import { ModuleConfigDataStoreItem, ModuleType, ValueType } from '#/index';
import { v4 as uuid } from 'uuid';

const moduleConfigStore = new Store({
  name: 'module-config',
  schema: moduleConfigSchema
});

export const configStores = {
  saveModuleConfig: (id: string, config: Record<string, ValueType>) => {
    if (!moduleConfigStore.has(`modules.${id}`)) {
      throw new Error(`Module ${id} does not exist`);
    }
    moduleConfigStore.set(`modules.${id}.values`, config);
  },

  createModuleConfig: (type: ModuleType): ModuleConfigDataStoreItem => {
    const item: ModuleConfigDataStoreItem = {
      id: uuid(),
      type,
      values: {}
    };
    moduleConfigStore.set(`modules.${item.id}`, item);
    return item;
  },

  getModuleConfigs: (): Record<string, ModuleConfigDataStoreItem> => {
    return moduleConfigStore.get('modules');
  }
};
