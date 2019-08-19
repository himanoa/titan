import path from "path";
import { app, BrowserWindow, Menu } from "electron";
import menuTemplate from "./menu";
import url from "url";

app.on("ready", () => {
  const window = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  console.log(process.env.NODE_ENV);
  console.dir(
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8080"
      : url.format({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file:",
          slashes: true
        })
  );
  window.loadFile(path.join("./index.html"));
  window.loadURL(
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8080"
      : url.format({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file:",
          slashes: true
        })
  );

  if (process.env.NODE_ENV !== "production") {
    window.webContents.openDevTools();
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate(window)));
});
