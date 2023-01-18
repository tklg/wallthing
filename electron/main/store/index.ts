import Store from 'electron-store';
import { moduleConfigSchema } from './jsonschemas/moduleconfigschema';
import { ModuleConfigDataStoreItem, ValueType } from '#/index';
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

  createModuleConfig: (newItem: Omit<ModuleConfigDataStoreItem, 'id'>): ModuleConfigDataStoreItem => {
    const item: ModuleConfigDataStoreItem = {
      id: uuid(),
      values: {},
      position: { height: 0, width: 0, x: 0, y: 0 },
      ...newItem
    };
    moduleConfigStore.set(`modules.${item.id}`, item);
    return item;
  },

  deleteModuleConfig: (id: string) => {
    // @ts-ignore
    moduleConfigStore.delete(`modules.${id}`);
  },

  getModuleConfigs: (): Record<string, ModuleConfigDataStoreItem> => {
    return moduleConfigStore.get('modules');
  }
};
