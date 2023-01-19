import { ModuleConfigDataStoreItem, ValueType } from '#/ModuleConfig';
import { Position } from '#/Position';
import { useIpc } from '@/hooks';
import { createContext, FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

type ModuleConfigContextValue = {
  updateValue: (id: string, values: Record<string, ValueType>) => Promise<void>;
  updatePosition: (id: string, newPosition: Position) => Promise<void>;
  deleteConfig: (id: string) => Promise<void>;
  createConfig: (moduleConfigItem: Omit<ModuleConfigDataStoreItem, 'id'>) => Promise<void>,
  configs: Record<string, ModuleConfigDataStoreItem>;
  editing?: string;
  setEditing: (id?: string) => void;
}

export const ModuleConfigContext = createContext<ModuleConfigContextValue>({
  updateValue: () => Promise.resolve(),
  updatePosition: () => Promise.resolve(),
  createConfig: () => Promise.resolve(),
  deleteConfig: () => Promise.resolve(),
  configs: {},
  editing: undefined,
  setEditing: () => null
})

export const ModuleConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const ipcApi = useIpc()
  const [editing, setEditing] = useState<string>()
  const [configs, setConfigs] = useState<Record<string, ModuleConfigDataStoreItem>>({})

  useEffect(() => {
    (async () => {
      const configs = await ipcApi.loadModuleConfig()
      setConfigs(configs)
    })()
  }, [])

  const createConfig = useCallback(async (newItem: Omit<ModuleConfigDataStoreItem, 'id'>) => {
    const existingPositions = Object.values(configs).map(c => c.position);
    const windowWidth = window.innerWidth;
    
    const created = await ipcApi.createModuleConfig(newItem);
    setConfigs(moduleConfigs => {
      return {
        ...moduleConfigs,
        [created.id]: created
      }
    })
  }, [configs])

  const updateValue = useCallback(async (id: string, newValues: Record<string, ValueType>) => {
    await ipcApi.saveModuleConfig(id, { values: newValues })
    setConfigs(moduleConfigs => {
      return {
        ...moduleConfigs,
        [id]: {
          ...moduleConfigs[id],
          values: {
            ...moduleConfigs[id].values,
            ...newValues
          }
        }
      }
    })
  }, [])

  const updatePosition = useCallback(async (id: string, newPosition: Position) => {
    await ipcApi.saveModuleConfig(id, { position: newPosition })
    setConfigs(moduleConfigs => {
      return {
        ...moduleConfigs,
        [id]: {
          ...moduleConfigs[id],
          position: newPosition
        }
      }
    })
  }, [])

  const deleteConfig = useCallback(async (id: string) => {
    await ipcApi.deleteModuleConfig(id)
    setConfigs(moduleConfigs => {
      const copy = {
        ...moduleConfigs
      }
      delete copy[id]
      return copy
    })
  }, [])

  const contextValue = useMemo(() => ({
    configs,
    updateValue,
    updatePosition,
    createConfig,
    deleteConfig,
    editing,
    setEditing
  }), [configs, updateValue, updatePosition, editing])

  return (
    <ModuleConfigContext.Provider value={contextValue}>
      {children}
    </ModuleConfigContext.Provider>
  )
}
