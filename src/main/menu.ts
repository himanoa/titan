import { dialog, BrowserWindow, ipcMain } from "electron";
import { promisify } from "util";
import { readFile, writeFile } from "fs";

const read = promisify(readFile);
const write = promisify(writeFile);

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
      },
      {
        label: "保存",
        click() {
          dialog.showSaveDialog(mainWindow, {}, fileName => {
            if (fileName === undefined) {
              return;
            }
            mainWindow.webContents.send("request-fileBody", { fileName });
            ipcMain.on(
              `response-fileBody-${fileName}`,
              async (_: unknown, body: string) => {
                console.dir(body);
                console.dir("foobar");
                await write(fileName, body, "utf-8");
              }
            );
          });
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
          mainWindow.reload();
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
