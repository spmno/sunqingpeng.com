---
title: Ubuntu文件监控数量限制
date: "2020-02-17T10:15:03.284Z"
description: "ENOSPC:System limit for number of file watchers reached"
tags: ["ubuntu", "file", "limit"]
---

在使用Ubuntu进行NODEJS开发时，可能会遇到这个错误。
这个错误的意思时系统对文件监控的数量已经到达限制数量了。

解决方法：

修改系统监控文件数量

Ubuntu

打开文件：  
    `sudo gedit /etc/sysctl.conf`  
加到最后一行：  
    `fs.inotify.max_user_watches=524288`  
保存退出，刷新：  
    `sudo sysctl -p`