import { contextBridge, ipcRenderer } from 'electron';
import { moduleConfigIPCApi } from './api';

export const preload = () => {
  const api = {};

  for (const methodName in moduleConfigIPCApi) {
    const item = moduleConfigIPCApi[methodName];
    api[methodName] = (...args: unknown[]) => ipcRenderer.invoke(item.eventName, ...args);
  }

  contextBridge.exposeInMainWorld('IPC', api);
};
