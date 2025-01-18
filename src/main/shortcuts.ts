import { BrowserWindow, app, globalShortcut } from 'electron';

export function createShortcuts(window: BrowserWindow){

  app.on('browser-window-focus', () => {
    globalShortcut.register('CommandOrControl+N', () => {
      window.webContents.send('new-costumer')
    })
  })

  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll();
  })

}