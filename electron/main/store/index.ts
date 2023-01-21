import Store from 'electron-store';
import { moduleConfigSchema } from './jsonschemas/moduleconfigschema';
import { ModuleConfigDataStoreItem } from '#/ModuleConfig';
import { v4 as uuid } from 'uuid';

const moduleConfigStore = new Store({
  name: 'module-config',
  schema: moduleConfigSchema
});

export const configStores = {
  saveModuleConfig: (id: string, config: Partial<ModuleConfigDataStoreItem>) => {
    if (!moduleConfigStore.has(`modules.${id}`)) {
      throw new Error(`Module ${id} does not exist`);
    }
    if (config.values) {
      moduleConfigStore.set(`modules.${id}.values`, config.values);
    }
    if (config.position) {
      moduleConfigStore.set(`modules.${id}.position`, config.position);
    }
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
