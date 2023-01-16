import { IPCApi } from '#/IpcApi';

export const useIpc = (): IPCApi => {
  // @ts-ignore
  return window.IPC as IPCApi;
};
