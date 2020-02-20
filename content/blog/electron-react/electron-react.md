---
title: 搭建electron react环境
date: "2020-02-20T12:15:03.284Z"
description: "用electron react配合搭建环境开发PC程序，提高开发效率"
---

版本React 16.12，electron 8.0  

1. 先搭建react环境, 用官方的create-react-app工具  

`npx create-react-app my-app`  
`cd my-app`  
`npm start` --正常启动  

浏览器访问<http://localhost:3000>， 出现react logo搭建成功  

2. 搭建 electron环境  

`yarn add electron electron-builder --dev 用electron-builder打包程序`  

3. 加入第三方工具  

 `yarn add wait-on concurrently --dev`
  其中wait-on是等待react 是否启动完成使用，Concurrently 是同时启动react 和 electron使用。（开发的时候，react和electron要分别启动）  

  4. 在build目录下，建立electron.js文件。（electron-builder打包时规定的目录）  

    const { app, BrowserWindow } = require('electron')
    const path = require('path');
    const url = require('url')
    const pkg = require('../package.json')

    function createWindow () {
      // Create the browser window.
      let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        }
      })

      // and load the index.html of the app.
      if (pkg.devMode) 
        win.loadURL('http://localhost:3000/');
      else 
        win.loadURL(url.format({
          pathname: path.join(__dirname, './index.html'),
          protocol: 'file',
          slashes: true
        }));

        console.log('app started.');
    }

    app.whenReady().then(createWindow)

    5. package相关配置：  

    {
      "name": "my-app",
      "version": "0.1.0",
      "private": true,
      "main": "build/electron.js",
      "build": {
        "appId": "cantools",
        "files": [
          "build/**/*",
          "node_modules/**/*"
        ],
        "win": {
          "target": [
            "nsis",
            "zip"
          ]
        }
      },
      "dependencies": {
        "@testing-library/jest-dom": "^4.2.4",
        "@testing-library/react": "^9.3.2",
        "@testing-library/user-event": "^7.1.2",
        "bootstrap": "^4.4.1",
        "jquery": "^3.4.1",
        "path": "^0.12.7",
        "popper.js": "^1.16.1",
        "react": "^16.12.0",
        "react-bootstrap": "^1.0.0-beta.16",
        "react-dom": "^16.12.0",
        "react-scripts": "3.3.1"
      },
      "devDependencies": {
        "concurrently": "^5.1.0",
        "electron": "^8.0.0",
        "electron-builder": "^22.3.2",
        "wait-on": "^4.0.0"
      },
      "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
        "electron-start": "electron .",
        "electron-dev": "concurrently \"set BROWSER=none\" \"yarn start\" \"wait-on http://localhost:3000 && electron .\"",
        "dist": "electron-builder --win --x64"
      },
      "eslintConfig": {
        "extends": "react-app"
      },
      "browserslist": {
        "production": [
          ">0.2%",
          "not dead",
          "not op_mini all"
        ],
        "development": [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version"
        ]
      },
      "homepage": ".",
      "devMode": true
    }

6. bootstrap使用  
    react要结合bootstrap使用  
    `yarn add react-bootstrap bootstrap jquery`  
    在src/index.js里加入css,  
    `import 'bootstrap/dist/css/bootstrap.min.css';`

7. 打包
   先打包react:   
   `npm run build`  
    在build目录下生成react production文件  
    用electron-builder打包整体文件   
    `npm run dist`    
    生成dist目录里，就有生成相关exe和安装包