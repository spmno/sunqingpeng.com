---
title: "彻底删除ubuntu软件包"
date: "2020-08-04T11:54:03.284Z"
description: "ubuntu提示软件包重新安装，彻底删除软件包方法"
tags: ["ubuntu", "apt"]
---

在Ubuntu安装软件失败后，有可以提示软件包需要重新安装，用以下命令可以彻底将软件删除。  

`sudo dpkg --remove --force-remove-reinstreq 软件包名称`

