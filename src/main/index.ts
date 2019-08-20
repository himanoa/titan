import path from "path";
import { app, BrowserWindow, Menu } from "electron";
import menuTemplate from "./menu";
import url from "url";

app.on("ready", () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: process.env.NODE_ENV !== "production"
    }
  });

  if (process.env.NODE_ENV !== "production") {
    win.loadURL("http://localhost:8080");
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
      })
    );
  }

  if (process.env.NODE_ENV !== "production") {
    win.webContents.openDevTools();
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate(win)));
});
