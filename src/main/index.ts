import { app, BrowserWindow } from "electron";

app.on("ready", () => {
  const window = new BrowserWindow({ width: 800, height: 800 });
  window.loadURL(`file://${__dirname}/index.html`);
});
