import { ModuleConfigDataStoreItem, ValueType } from '#/ModuleConfig';
import { useIpc } from '@/hooks';
import { createContext, FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

type ModuleConfigContextValue = {
  updateValue: (id: string, values: Record<string, ValueType>) => void;
  value: Record<string, ModuleConfigDataStoreItem>;
  editing?: string;
  setEditing: (id?: string) => void;
}

export const ModuleConfigContext = createContext<ModuleConfigContextValue>({
  updateValue: () => null,
  value: {},
  editing: undefined,
  setEditing: () => null
})

export const ModuleConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const ipcApi = useIpc()
  const [editing, setEditing] = useState<string>()
  const [value, setValue] = useState<Record<string, ModuleConfigDataStoreItem>>({})

  useEffect(() => {
    (async () => {
      const config = await ipcApi.loadModuleConfig()
      setValue(config)
    })()
  }, [])

  const updateValue = useCallback((id: string, newValues: Record<string, ValueType>) => {
    setValue(values => {
      return {
        ...values,
        [id]: {
          ...values[id],
          ...newValues
        }
      }
    })
  }, [])

  const contextValue = useMemo(() => ({
    value,
    updateValue,
    editing,
    setEditing
  }), [value, updateValue, editing])

  return (
    <ModuleConfigContext.Provider value={contextValue}>
      {children}
    </ModuleConfigContext.Provider>
  )
}
