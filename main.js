const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    title: "Express View",
    webPreferences: {
      webviewTag: true,
    },

    autoHideMenuBar: true,
    backgroundColor: "#fff",
    icon: path.join(__dirname, resolveIcons()),
  });
  //open external links in default browser
  win.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });

  //make title unchangeable
  win.webContents.on("page-title-updated", () => {
    win.setTitle("Express View");
  });

  win.loadFile("./renderer/start.html");
  win.once("ready-to-show", () => {
    win.maximize();
  });
};

app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

function resolveIcons() {
  let iconPath = "";
  if (process.platform === "darwin") {
    iconPath = "assets/icons/mac/logo.icns";
  } else if (process.platform === "win32") {
    iconPath = "assets/icons/win/logo.ico";
  } else {
    iconPath = "assets/icons/png/logo.png";
  }
  console.log(`On platform ${process.platform}`);
  console.log(`Icon: ${path.join(__dirname, iconPath)}`);
  return iconPath;
}
