import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { Costumer, NewCostumer } from '../shared/types/ipc'

declare global {
  export interface Window{
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  onNewCostumer: (callback: () => void) => {
    ipcRenderer.on('new-costumer', callback)

    return () => {
      ipcRenderer.off('new-costumer', callback)
    }
  },
  fetchUsers: () => {
    // INVOKE -> enviar e receber
    return ipcRenderer.invoke('fetch-users')
  },
  addCostumer: (doc: NewCostumer): Promise<void | PouchDB.Core.Response> => ipcRenderer.invoke('add-costumer', doc),
  fetchAllCostumers: (): Promise<Costumer[]> => ipcRenderer.invoke('fetch-all-costumers'),
  fetchCostumerById: (docId: string): Promise<Costumer> => ipcRenderer.invoke('fetch-costumer-id', docId),
  deleteCostumer: (docId: string) => ipcRenderer.invoke('delete-costumer', docId),
  getVersionApp: () => ipcRenderer.invoke('get-version')

}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
