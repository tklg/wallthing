import { ModuleConfigIPCApi } from '#/IpcApi';
import { ValueType } from '#/ModuleConfig';
import { configStores } from '../../main/store';

type mcipcapiType = Record<keyof ModuleConfigIPCApi, {
  methodName: string;
  eventName: string;
  handle: Function;
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
    handle: (id: string, values: Record<string, ValueType>) => {
      return configStores.saveModuleConfig(id, values);
    }
  }
};
