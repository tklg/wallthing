import { ModuleType } from '#/Module';
import { ModuleConfigDataStoreItem, ValueType } from '#/ModuleConfig';
import { ModuleConfigContext } from '@/providers/ModuleConfigProvider';
import { useCallback, useContext, useMemo } from 'react';

const useConfigContext = () => useContext(ModuleConfigContext);

export const useModuleConfigCreate = () => {
  const { createConfig } = useConfigContext();
  return useCallback((type: ModuleType) => createConfig({
    type,
    values: {},
    position: {
      height: 1,
      width: 1,
      x: 0,
      y: 0
    }
  }), []);
};

export const useModuleConfigsByKey = () => {
  const { configs } = useConfigContext();
  return configs;
};

export const useModuleConfigs = () => {
  const { configs } = useConfigContext();
  return Object.values(configs);
};

export const useModuleConfig = (id?: string): [ModuleConfigDataStoreItem | null, (newValue: Record<string, ValueType>) => Promise<void>] => {
  const { configs, updateValue } = useConfigContext();

  const setValues = useCallback(async (newValues: Record<string, ValueType>) => {
    if (id) {
      return updateValue(id, newValues);
    }
  }, [id]);

  return useMemo(() => [id ? configs[id] : null, setValues], [id, setValues]);
};

export const useModuleConfigDelete = () => {
  const { deleteConfig } = useConfigContext();

  return useCallback(async (id: string) => {
    await deleteConfig(id);
  }, []);
};

export const useModuleConfigEditing = (): [string | undefined, (id?: string) => void] => {
  const { editing, setEditing } = useConfigContext();
  return useMemo(() => [editing, setEditing], [editing]);
};
