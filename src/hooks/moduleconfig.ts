import { ModuleConfigDataStoreItem, ValueType } from '#/ModuleConfig';
import { useIpc } from '@/hooks/ipc/useIpc';
import { ModuleConfigContext } from '@/providers/ModuleConfigProvider';
import { useCallback, useContext, useMemo } from 'react';

const useConfigContext = () => useContext(ModuleConfigContext);

export const useModuleConfig = (id: string): [ModuleConfigDataStoreItem, (newValue: Record<string, ValueType>) => void] => {
  const { value, updateValue } = useConfigContext();
  const ipc = useIpc();

  const setValues = useCallback((values: Record<string, ValueType>) => {
    updateValue(id, values);
    ipc.saveModuleConfig(id, values);
  }, [id]);

  return useMemo(() => [value[id], setValues], [id, setValues]);
};

export const useModuleConfigEditing = (): [string | undefined, (id?: string) => void] => {
  const { editing, setEditing } = useConfigContext();
  return useMemo(() => [editing, setEditing], [editing]);
};
