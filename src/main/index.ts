import path from "path";
import { app, BrowserWindow } from "electron";

app.on("ready", () => {
  const window = new BrowserWindow({ width: 800, height: 800 });
  window.loadFile(path.join("./index.html"));
});
