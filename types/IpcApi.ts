import { ModuleConfigDataStoreItem, ValueType } from '#/ModuleConfig';

export type IPCApi = ModuleConfigIPCApi;

export interface ModuleConfigIPCApi {
  loadModuleConfig: () => Promise<Record<string, ModuleConfigDataStoreItem>>;
  saveModuleConfig: (id: string, config: Record<string, ValueType>) => Promise<void>;
}
