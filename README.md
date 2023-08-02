# lite-node-build

Minimal, easy-to-configure Node.js build configuration for bare-bones vanilla js projects.

**Requires Node 14.8.0 or higher.**
**Not for production**

--- 

### Start

```bash
npm run build
```

1. Creates a 'dist' folder or cleans it if it already exists
2. Minifies and copies CSS, JavaScript, and HTML files to the 'dist' folder
3. Handles the copying of additional assets (images, fonts, etc.) to the 'dist' folder, even if they are in subfolders
4. Logs the build time and any errors that occur during the build process

**The files and directories processed by the script are easily configurable through imported utility modules.**

---

### Clean

```bash
npm run clean
```

Cleans the 'dist' folder.

---

### Why use this?

1. Simplicity: This build configuration is meant to be as simple as possible and easy to configure. Do not waste time defusing the complex bomb that is Webpack while the ideas in your head are still fresh.
2. Lightweight: Produces a minimized build with no unnecessary bloat.
3. Parallel processing: The build script processes files in parallel, which significantly reduces build time, and avoids the process from completely halting if an error occurs.

---
