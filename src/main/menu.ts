import { dialog, ipcMain, BrowserWindow } from "electron";
import { promisify } from "util";
import { readFile } from "fs";

const createMenu = (mainWindow: BrowserWindow) => [
  {
    label: "ファイル",
    submenu: [
      {
        label: "開く",
        click() {
          dialog.showOpenDialog(
            {
              filters: [{ name: "md", extensions: ["md"] }]
            },
            filePaths => {
              if (filePaths === undefined) {
                return;
              }
              const read = promisify(readFile);
              filePaths.forEach(async f => {
                const fileBody = await read(f, "utf-8");
                mainWindow.webContents.send("fileOpen", {
                  name: f,
                  fileBody
                });
              });
            }
          );
        }
      }
    ]
  },
  {
    label: "View",
    submenu: [
      {
        label: "Reload",
        accelerator: "Command+R",
        click: function() {
          mainWindow.restart();
        }
      },
      {
        label: "Toggle Full Screen",
        accelerator: "Ctrl+Command+F",
        click: function() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      },
      {
        label: "Toggle Developer Tools",
        accelerator: "Alt+Command+I",
        click: function() {
          mainWindow.webContents.toggleDevTools();
        }
      }
    ]
  }
];

export default createMenu;
