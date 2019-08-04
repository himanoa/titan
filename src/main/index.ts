import path from "path";
import { app, BrowserWindow, Menu } from "electron";
import menuTemplate from "./menu";

app.on("ready", () => {
  const window = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });
  window.loadFile(path.join("./index.html"));
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate(window)));
});
