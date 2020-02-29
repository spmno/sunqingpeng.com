---
title: electron react之间通信
date: "2020-02-26T12:15:03.284Z"
description: "在electron react之前传递数据"
tags: ["react", "electron", "ipc"]
---

electron react开发环境已经完成了。接下来讲一下，electron与react之前的通信。  
react相当于ui，electron相当于本地的操作，当需要本地操作的时候react就需要调用electron的接口。

electron react之间通信使用ipcRenderer，首先引用electron库的ipcRenderer  
`const { ipcRenderer } = window.require('electron');`  
这里要注意的是 <font color=red>window</font>，只有加上window才能找到electron库。

1. react调用electron方法
react端：  
`ipcRenderer.send(消息名称, 参数);`  
其中两中参数都是字符串，这样的调用会把这个消息发送到关注这个消息的electron函数中。
electron端：
```
ipcMain.on(消息名称, (event, arg) => {
  console.log("message comming.");
  event.reply(返回消息名称, "reply.");
});
```
以上代码一般放在main.js或其它electron进程中。收到消息后，还可以用event的reply方法返回一些参数。

2. electron调用react方法：  
electron端：  
使用webContent的方法：
`win.webContents.send(消息名称, 参数)`  
其中win是BrowserWindow的实例。
react端：
```
ipcRenderer.on(消息名称, (event, arg) => {
    console.log('callback:', arg);
    //do something
});
```

以上就是electron与react之前的通信方法。