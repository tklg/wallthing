import { ModuleConfigDataStoreItem, ValueType } from '#/ModuleConfig';

export type IPCApi = ModuleConfigIPCApi;

export interface ModuleConfigIPCApi {
  loadModuleConfig: () => Promise<Record<string, ModuleConfigDataStoreItem>>;
  saveModuleConfig: (id: string, config: Record<string, ValueType>) => Promise<void>;
  createModuleConfig: (newItem: Omit<ModuleConfigDataStoreItem, 'id'>) => Promise<ModuleConfigDataStoreItem>;
  deleteModuleConfig: (id: string) => Promise<void>;
}
