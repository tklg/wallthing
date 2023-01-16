import { ipcMain } from 'electron';
import { moduleConfigIPCApi } from './api';

export const registerIpcHandlers = () => {
  for (const methodName in moduleConfigIPCApi) {
    ipcMain.handle(moduleConfigIPCApi[methodName].eventName, moduleConfigIPCApi[methodName].handle);
  }
};
