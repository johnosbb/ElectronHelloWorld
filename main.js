const { app, BrowserWindow, Menu } = require('electron')


const isMac = process.platform === 'darwin'
const isWindows = process.platform === "win32"
const isLinux = process.platform === "linux"
const electronVerion = process.version
let win;

function createWindow () {
    win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  const menu = Menu.buildFromTemplate(menuTemplate) // this breaks the ivocation of devtools
  Menu.setApplicationMenu(menu)                     // this breaks the ivocation of devtools
  console.log(" Electron Version: " + electronVerion)

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

  function sendMenuCommand(command) {
   // app.once('did-finish-load', () => {
        win.webContents.send(command)
   //  })
        
  }

const menuTemplate = [
    //Spread syntax can be used when all elements from an object or array need to be included in a list of some kind. 
    ...(isMac ? [{ // ...spread operator, return the contents of the enclosed array
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
    }] : []), // equates to nothing on expansion
    {
       label:  "File",
       submenu: [
             { label: "Open",  click() { sendMenuCommand("open_clicked")},  accelerator: "Ctrl+O"        },
             { label: "Save",  click() { sendMenuCommand("save_clicked")},  accelerator: "Ctrl+S"        },
             { label: "Save As",  click() { sendMenuCommand("saveas_clicked")},  accelerator: "Ctrl+Shift+S"        },
             { label: "Save All",  click() { sendMenuCommand("saveall_clicked")},         },

             

       ]
    },
    //{
      //   label: "Edit",
      //   submenu: isLinux ? [
      //     { label: "Undo",  click: focusAndPerform("undo"),  accelerator: "Ctrl+Z"       },
      //     { label: "Redo",  click: focusAndPerform("redo"),  accelerator: "Ctrl+Shift+Z" },
      //     { label: "Cut",   click: focusAndPerform("cut"),   accelerator: "Ctrl+X"       },
      //     { label: "Copy",  click: focusAndPerform("copy"),  accelerator: "Ctrl+C"       },
      //     { label: "Paste", click: focusAndPerform("paste"), accelerator: "Ctrl+V"       },
      //   ] : [
      //     { role: "undo"  },
      //     { role: "redo"  },
      //     { role: "cut"   },
      //     { role: "copy"  },
      //     { role: "paste" },
      //   ]
      // }
    { role: 'editMenu'}
]