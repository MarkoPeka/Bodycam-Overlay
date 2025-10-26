const { app, BrowserWindow, ipcMain, screen, Tray, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

// Use app's user data directory for config
const configPath = path.join(app.getPath('userData'), 'config.json');

function loadConfig() {
  try {
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading config:', e);
  }
  return {
    name: '[NOOSE] John Doe',
    role: 'police',
    timezone: 'America/New_York',
    department: 'National Office Of Security Enforcement',
    logoUrl: '',
    headerText: 'CnR Body Cam 1™',
    overlayWidth: 380,
    overlayHeight: 130,
    positionX: 'right',
    positionY: 'top',
    marginX: 10,
    marginY: 10
  };
}

function saveConfig(config) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  } catch (e) {
    console.error('Error saving config:', e);
  }
}

let setupWindow;
let overlayWindow;
let tray = null;

function createSetupWindow() {
  setupWindow = new BrowserWindow({
    width: 600,
    height: 750,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    title: 'Bodycam Overlay - Setup',
    show: false,
    center: true
  });

  setupWindow.loadFile('setup.html');
  setupWindow.setMenuBarVisibility(false);

  setupWindow.once('ready-to-show', () => {
    setupWindow.show();
  });

  // Minimize to tray instead of closing
  setupWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      setupWindow.hide();
    }
  });

  setupWindow.on('closed', () => {
    setupWindow = null;
  });
}

function createOverlay(config) {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const overlayWidth = config.overlayWidth || 350;
  const overlayHeight = config.overlayHeight || 120;
  
  // Calculate position based on config
  const marginX = config.marginX || 10;
  const marginY = config.marginY || 10;
  let posX, posY;
  
  if (config.positionX === 'left') {
    posX = marginX;
  } else {
    posX = width - overlayWidth - marginX;
  }
  
  if (config.positionY === 'bottom') {
    posY = height - overlayHeight - marginY;
  } else {
    posY = marginY;
  }
  
  overlayWindow = new BrowserWindow({
    width: overlayWidth,
    height: overlayHeight,
    x: posX,
    y: posY,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    movable: false,
    focusable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  overlayWindow.loadFile('overlay.html');
  overlayWindow.setIgnoreMouseEvents(true);
  
  // Store config for this window
  overlayWindow.overlayConfig = config;
  
  overlayWindow.webContents.on('did-finish-load', () => {
    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.webContents.send('config-update', config);
    }
  });

  overlayWindow.on('closed', () => {
    overlayWindow = null;
  });
}

// IPC handlers
ipcMain.handle('get-initial-config', async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win && win.overlayConfig) {
    return win.overlayConfig;
  }
  return null;
});

ipcMain.handle('save-config', async (event, config) => {
  saveConfig(config);
  return true;
});

ipcMain.handle('load-config', async () => {
  return loadConfig();
});

ipcMain.handle('start-overlay', async (event, config) => {
  // Close existing overlay if any
  if (overlayWindow) {
    overlayWindow.close();
    overlayWindow = null;
  }
  createOverlay(config);
  return true;
});

ipcMain.handle('hide-setup', async () => {
  if (setupWindow) {
    setupWindow.hide();
  }
  return true;
});

ipcMain.handle('stop-overlay', async () => {
  if (overlayWindow) {
    overlayWindow.close();
  }
  createSetupWindow();
  return true;
});

ipcMain.handle('update-position', async (event, config) => {
  if (overlayWindow) {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const overlayWidth = config.overlayWidth || 350;
    const overlayHeight = config.overlayHeight || 120;
    const marginX = config.marginX || 10;
    const marginY = config.marginY || 10;
    
    let posX, posY;
    if (config.positionX === 'left') {
      posX = marginX;
    } else {
      posX = width - overlayWidth - marginX;
    }
    
    if (config.positionY === 'bottom') {
      posY = height - overlayHeight - marginY;
    } else {
      posY = marginY;
    }
    
    overlayWindow.setBounds({ x: posX, y: posY, width: overlayWidth, height: overlayHeight });
    
    // Update the overlay content too
    if (!overlayWindow.isDestroyed() && overlayWindow.webContents) {
      overlayWindow.webContents.send('config-update', config);
    }
    return true;
  }
  return false;
});

function createTray() {
  // Create tray with icon or use default Electron icon
  try {
    const iconPath = path.join(__dirname, 'assets/icon.png');
    tray = new Tray(iconPath);
  } catch (e) {
    // Fallback to NativeImage if icon file doesn't exist
    const { nativeImage } = require('electron');
    const icon = nativeImage.createEmpty();
    tray = new Tray(icon);
  }
  
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: '⚙️ Show Setup', 
      click: () => {
        if (!setupWindow) createSetupWindow();
        else {
          setupWindow.show();
          setupWindow.focus();
        }
      }
    },
    { 
      label: overlayWindow ? '👁️ Hide Overlay' : '👁️ Show Overlay',
      click: () => {
        if (overlayWindow) {
          overlayWindow.close();
          overlayWindow = null;
        } else {
          const config = loadConfig();
          if (config) createOverlay(config);
        }
        // Recreate menu to update label
        setTimeout(() => createTray(), 100);
      }
    },
    { type: 'separator' },
    { 
      label: '🔄 Reload Overlay',
      click: () => {
        if (overlayWindow) {
          overlayWindow.close();
          const config = loadConfig();
          setTimeout(() => createOverlay(config), 200);
        }
      }
    },
    { type: 'separator' },
    { label: '❌ Exit', click: () => {
      app.isQuitting = true;
      app.quit();
    }}
  ]);
  
  tray.setToolTip('Bodycam Overlay');
  tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  createTray();
  createSetupWindow();
});

app.on('window-all-closed', (event) => {
  // Don't quit, stay in tray
  event.preventDefault();
});

app.on('before-quit', () => {
  app.isQuitting = true;
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createSetupWindow();
  }
});