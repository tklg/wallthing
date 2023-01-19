import { ModuleConfigIPCApi } from '#/IpcApi';
import { ModuleConfigDataStoreItem } from '#/ModuleConfig';
import { IpcMainInvokeEvent } from 'electron';
import { configStores } from '../../main/store';

type mcipcapiType = Record<keyof ModuleConfigIPCApi, {
  methodName: string;
  eventName: string;
  handle: (event: IpcMainInvokeEvent, ...args: unknown[]) => unknown;
}>;

export const moduleConfigIPCApi: mcipcapiType = {
  loadModuleConfig: {
    methodName: 'loadModuleConfig',
    eventName: 'moduleconfig.load',
    handle: () => {
      return configStores.getModuleConfigs();
    }
  },
  saveModuleConfig: {
    methodName: 'saveModuleConfig',
    eventName: 'moduleconfig.save',
    handle: (e, id: string, values: Partial<ModuleConfigDataStoreItem>) => {
      return configStores.saveModuleConfig(id, values);
    }
  },
  createModuleConfig: {
    methodName: 'createModuleConfig',
    eventName: 'moduleconfig.create',
    handle: (e, newItem: Omit<ModuleConfigDataStoreItem, 'id'>) => {
      return configStores.createModuleConfig(newItem);
    }
  },
  deleteModuleConfig: {
    methodName: 'deleteModuleConfig',
    eventName: 'moduleconfig.delete',
    handle: (e, id: string) => {
      return configStores.deleteModuleConfig(id);
    }
  }
};
