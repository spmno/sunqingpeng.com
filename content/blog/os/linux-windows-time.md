---
title: Linux与windows双系统时间同步
date: "2020-02-29T09:54:03.284Z"
description: "Linux与windows双系统时间同步"
tags: ["linux", "windows", "time"]
---

Linux和Windows双系统工作的时候会发现，在来回切换系统的时候，启动后时间会差8小时。    
虽然过一会网络时间同步后，时间会自己改正确，但还是感觉不爽。    

通过调查发现，时间不同步的原因就是Windows和Linux默认使用BIOS的方式不同。  
Linux将BIOS时间认为是GMT时间，也就是世界标准时间。  
Windows装BIOS时间认为是本地时间，中国在东8区，所在是GMT+8。  

解决方案：

Windows采用和Linux一样的时间管理方式。修改相应注册表。  
在Windows下，按窗口键输入regedit，启动注册表编辑器。进入以下目录：  
`HKEY_LOCAL_MACHINE/SYSTEM/CurrentControlSet/Control/TimeZoneInformation/`  
在右边窗口，右键新建REG_DWORD值。  
名称RealTimeIsUniversal，值为1。  

亲试好用。
