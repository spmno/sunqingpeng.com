---
title: Nginx配置与命令
date: "2020-02-18T10:13:03.284Z"
description: "Nginx的常用配置与命令, site-available不好用，换为conf.d目录"
tags: ["nginx", "linux", "server"]
---

安装Nginx:  
    `sudo apt install nginx`  
启动Nginx服务:  
    `sudo systemctl start nginx`  
 重启Nginx服务:  
    `sudo systemctl restart nginx`     
开机自启动:  
    `sudo systemctl enable nginx`
关闭开机自启动:  
    `sudo systemctl disable nginx`  
    
    
主要修改文件:  
    /etc/nginx/
网站配置:  
    修改<font color=red>/etc/nginx/conf.d/default.conf</font>文件，找到root选项，改成自己的目录，完成。
    `root /my-directory;`
    

如果在`/my-directory`下面有index.html文件的话，直接就可以访问了。  
注：之前是配置site-available，新版本目录结构有变化，变为conf.d目录。