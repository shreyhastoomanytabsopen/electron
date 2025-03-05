const { app, BrowserWindow, screen } = require('electron');

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const x = 0; // Touching the left side of the screen
    const y = Math.round(height * (1 - 0.24)); // 24% from the top of the screen

    const win = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false, // Removes window frame
        resizable: false, // Prevents resizing
        transparent: true, // Enables transparency
        alwaysOnTop: false, // Ensure it does NOT stay above apps
        focusable: false, // Prevents interaction
        skipTaskbar: true, // Hides from taskbar
        x: x, // Aligns window to left
        y: y, // Positions window 24% from top
        hasShadow: false, // Optional: Removes shadow
        backgroundColor: '#00000000' // Full transparency
    });

    // Keep the window only on the desktop (below all other apps)
    win.setAlwaysOnTop(false, "desktop");

    // Ignore mouse events so it's click-through
    win.setIgnoreMouseEvents(true);

    // Load your HTML file
    win.loadFile('popup.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
