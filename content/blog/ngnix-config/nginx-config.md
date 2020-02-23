---
title: Nginx配置与命令
date: "2020-02-18T10:13:03.284Z"
description: "Nginx的常用配置与命令"
tags: ["nginx", "linux", "server"]
---

安装Nginx:  
    `sudo apt install nginx`  
启动Nginx服务:  
    `sudo systemctl start nginx`  
开机自启动:  
    `sudo systemctl enable nginx`
关闭开机自启动:  
    `sudo systemctl disable nginx`  
    
主要修改文件:  
    /etc/nginx/
网站配置:  
    修改/etc/nginx/site-available/default文件，找到root选项，改成自己的目录，完成。
    `root /my-directory;`

如果在`/my-directory`下面有index.html文件的话，直接就可以访问了。