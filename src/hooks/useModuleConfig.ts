import { ModuleType } from '#/Module';
import { ModuleConfigDataStoreItem, ValueType } from '#/ModuleConfig';
import { Position } from '#/Position';
import { ModuleConfigContext } from '@/providers/ModuleConfigProvider';
import { useCallback, useContext, useMemo } from 'react';

const useConfigContext = () => useContext(ModuleConfigContext);

export const useModuleConfigCreate = () => {
  const { createConfig } = useConfigContext();
  return useCallback((type: ModuleType) => createConfig({
    type,
    values: {},
    position: {
      height: 4,
      width: 3,
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
  return configs ? Object.values(configs) : [];
};

export const useModuleConfig = (id?: string): { config: ModuleConfigDataStoreItem | null, setValues: (newValue: Record<string, ValueType>) => Promise<void>, setPosition: (newPosition: Position) => Promise<void>; } => {
  const { configs, updateValue, updatePosition } = useConfigContext();

  const setValues = useCallback(async (newValues: Record<string, ValueType>) => {
    if (id) {
      return updateValue(id, newValues);
    }
  }, [id]);

  const setPosition = useCallback(async (newPosition: Position) => {
    if (id) {
      return updatePosition(id, newPosition);
    }
  }, [id]);

  return useMemo(() => ({
    config: id ? configs[id] : null,
    setValues,
    setPosition
  }), [configs, id, setValues, setPosition]);
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

export const useModuleConfigSetPosition = () => {
  const { updatePosition } = useConfigContext();
  return useCallback(async (id: string, position: Position) => {
    await updatePosition(id, position);
  }, []);
};
