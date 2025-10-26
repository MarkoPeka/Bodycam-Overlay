# 📹 Bodycam Overlay for Streaming

A professional, customizable bodycam overlay for live streaming and roleplay content. Perfect for GTA RP, police roleplay, and other immersive streaming experiences.

**Created by marko28peka** • [Discord: marko28peka]

## ✨ Features

- **Real-time Clock** - Displays accurate time in your chosen timezone with GMT offset
- **Customizable Info** - Set your character name, department, and role
- **Custom Logo Support** - Use your own department/organization logo (or default NOOSE logo)
- **Editable Camera Header** - Change the text next to REC (e.g., "Police Body Cam 1", "Sheriff Cam 2")
- **6 Role Types** - Police, EMS, Fire, Sheriff, DOC, and Civilian with unique colors
- **Flexible Positioning** - Place overlay in any corner with custom margins
- **Adjustable Size** - Resize to fit your stream layout (200-800px width, 100-400px height)
- **Always on Top** - Stays visible over OBS, games, and other windows
- **Transparent Background** - Clean overlay that blends seamlessly
- **System Tray Support** - Minimize to tray to keep desktop clean
- **Preview Mode** - Test positioning before going live
- **Auto-save Settings** - Your config is remembered between sessions

## 📋 Requirements

- Windows 10/11 (64-bit)
- No additional software needed for the packaged version!

## 🚀 Installation & Usage

### For End Users (Packaged Version)

1. **Download** [BodycamOverlay-v0.1.0-win64.zip](https://github.com/MarkoPeka/Bodycam-Overlay/releases/tag/Releases) (~104MB)
2. **Extract** the ZIP file to any folder
3. **Run** `BodycamOverlay.exe` from the extracted folder

### For Developers (From Source)

```bash
# Install dependencies
npm install

# Run in development mode
npm start

# Build packaged executable
npm run package
```

## 🎮 How to Use

### First Time Setup

1. **Launch** the application
2. **Fill in your information:**
   - **Character Name** - Your RP character name (e.g., "[NOOSE] John Doe")
   - **Role** - Select from Police, EMS, Fire, Sheriff, DOC, or Civilian
   - **Department** - Your organization (e.g., "Los Santos Police Department")
   - **Timezone** - Choose your timezone for accurate time display
   - **Camera Header Text** - Customize what appears next to REC (default: "CnR Body Cam 1™")
   - **Logo URL** (Optional) - Direct image URL for custom logo

### Setting Up a Custom Logo

1. Upload your logo to an image host (imgur, imgbb, etc.)
2. Copy the **direct image URL** (must end in .png, .jpg, etc.)
3. Paste into the "Logo URL" field
4. Click "Preview Position" to test

**Note:** Leave blank to use the default NOOSE logo

### Positioning the Overlay

1. **Set Size:**
   - Width: 200-800px (default: 380px)
   - Height: 100-400px (default: 130px)

2. **Choose Position:**
   - Horizontal: Left or Right
   - Vertical: Top or Bottom
   - Set margins (distance from edges)

3. **Preview:**
   - Click "Preview Position" to see placement
   - Adjust settings and preview again until perfect

4. **Start:**
   - Click "Start Overlay" to lock it in place
   - Setup window minimizes to system tray

### Using with OBS/Streaming Software

**Method 1: Window Capture**
1. Add "Window Capture" source in OBS
2. Select the bodycam overlay window
3. Position and scale as needed

**Method 2: Display Capture**
1. Add "Display Capture" in OBS
2. The overlay will appear automatically (it's always on top)

### Stopping/Reconfiguring

1. **Right-click** the tray icon (📹) in your system tray
2. Select "Stop Overlay" to return to setup
3. Or select "Show Setup" to adjust settings while overlay runs

## ⚙️ Configuration Reference

### Basic Settings
| Setting | Description | Example |
|---------|-------------|---------|
| Character Name | Your in-game/RP name | `[NOOSE] John Doe` |
| Role | Police/EMS/Fire/Sheriff/DOC/Civilian | Police |
| Department | Organization name | `Los Santos Police Department` |
| Timezone | Your local timezone | `America/Los_Angeles` |
| Camera Header | Text next to REC | `CnR Body Cam 1™` |

### Position & Size Settings
| Setting | Description | Range |
|---------|-------------|-------|
| Logo URL | Direct link to image | Any `.png`, `.jpg`, `.gif` URL |
| Width | Overlay width | 200-800px (default: 380px) |
| Height | Overlay height | 100-400px (default: 130px) |
| Position X | Horizontal placement | Left or Right |
| Position Y | Vertical placement | Top or Bottom |
| Margin X | Distance from sides | 0-100px (default: 10px) |
| Margin Y | Distance from top/bottom | 0-100px (default: 10px) |

## 🎨 Role Colors

| Role | Name Color |
|------|------------|
| Police | Blue (#4a9eff) |
| EMS | Red (#ff4757) |
| Fire | Orange (#ffa502) |
| Sheriff | Green (#26de81) |
| DOC | Gray (#a4b0be) |
| Civilian | White (#ecf0f1) |

## 📋 Supported Timezones

<details>
<summary><b>North America (10)</b></summary>

- Eastern Time (ET)
- Central Time (CT)
- Mountain Time (MT)
- Arizona (MST)
- Pacific Time (PT)
- Alaska (AKT)
- Hawaii (HST)
- Toronto (ET)
- Vancouver (PT)
- Mexico City (CST)
</details>

<details>
<summary><b>Europe (17)</b></summary>

- London (GMT)
- Paris, Prague, Berlin, Amsterdam, Brussels, Madrid, Rome, Vienna, Warsaw, Stockholm, Copenhagen, Oslo (CET)
- Helsinki, Athens (EET)
- Istanbul (TRT)
- Moscow (MSK)
</details>

<details>
<summary><b>Asia (11)</b></summary>

- Dubai, Karachi, India, Bangkok, Singapore, Hong Kong, Shanghai, Tokyo, Seoul, Manila, Jakarta
</details>

<details>
<summary><b>Oceania (6)</b></summary>

- Perth, Adelaide, Brisbane, Sydney, Melbourne, Auckland
</details>

<details>
<summary><b>South America (5)</b></summary>

- São Paulo, Buenos Aires, Santiago, Lima, Bogotá
</details>

<details>
<summary><b>Africa (4)</b></summary>

- Cairo, Johannesburg, Lagos, Nairobi
</details>

## 🖼️ Using Custom Logos

1. Find an image online (your department logo, clan emblem, etc.)
2. Right-click the image → "Copy image address"
3. Paste the URL into the "Logo URL" field
4. Leave empty to use the default NOOSE logo

**Supported formats:** PNG, JPG, GIF, WebP

## 💡 Usage Tips

- **Streaming:** Perfect for roleplay streams on Twitch/YouTube
- **Recording:** Adds authenticity to bodycam footage
- **Roleplay:** Different logos for different characters/departments
- **Size adjustment:** Larger for readability, smaller for minimal overlay
- **Multiple characters:** Save different configs by using the app

## 🔧 Technical Details

**Built with:**
- Electron (Cross-platform desktop apps)
- Node.js
- HTML/CSS/JavaScript

**Requirements:**
- Windows 10/11
- Node.js (for development)

## 📝 File Structure

```
bodycam-overlay-app/
├── main.js          # Main Electron process
├── setup.html       # Configuration UI
├── overlay.html     # The actual overlay
├── package.json     # Project configuration
├── start.bat        # Easy launcher
└── README.md        # This file
```

## 🐛 Troubleshooting

**Logo not loading after clicking Start?**
- This is now fixed! Logo should load in both preview and final overlay
- If issues persist, ensure the URL is a direct image link (ends with .png, .jpg, etc.)
- Try imgur.com or imgbb.com for reliable image hosting

**Overlay not showing in OBS?**
- Make sure you've clicked "Start Overlay" (not just Preview)
- Try "Window Capture" instead of "Display Capture"
- Ensure OBS has permission to capture windows

**Overlay disappears when I click on it?**
- This is normal behavior - the overlay is click-through when active
- Use the system tray icon to stop or reconfigure

**Timezone not displaying correctly?**
- Verify you selected a timezone from the dropdown
- The overlay shows GMT offset automatically
- Time updates every second

## 📄 License

MIT License - Feel free to modify and distribute!

## 👥 Credits

**Developer:** marko28peka  
**Discord:** marko28peka

Created for roleplay and streaming communities worldwide.

---

**Version:** 0.1.0  
**Author:** marko28peka  
**Last Updated:** October 2025
