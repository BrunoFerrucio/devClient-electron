import { BrowserWindow, Menu, nativeImage, Tray } from "electron";
import path from "node:path";

export function createTray(window:BrowserWindow) {
  const appIcon = path.join(__dirname, 'resources', 'menuTemplate.png');
  let icon = nativeImage.createFromPath(appIcon);

  const tray = new Tray(icon);

  const menu = Menu.buildFromTemplate([
    {
      label: 'Open',
      enabled: true,
    },
    {
      type: 'separator'
    },
    {
      label: 'Cadastrar clientes',
      click: () => { console.log("Cadastrar clientes") }
    },
    {
      label: 'Abrir',
      click: () => {
        window.show();
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Sair',
      role: 'quit'
    }
  ]);

  tray.setToolTip('Dev Clientes');

  tray.setContextMenu(menu);
}