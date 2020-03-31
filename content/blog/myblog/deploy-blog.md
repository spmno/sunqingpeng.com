---
title: 将Blog布置到Github上
date: "2020-03-30T18:42:03.284Z"
description: "将自己的Blog布置到Github上"
tags: ["gatsby", "blog", "github"]
---

Blog之前一直在自己的服务器。一年几百块钱，也是不小的数目。  
所以就把Blog搬到了Github的pages上，方法也比较简单。

1. 安装gh-pages工具，在Blog的根目录下执行：  
`npm install gh-pages --save`
2. 增加部署命令：  
`"deploy": "gatsby build --prefix-paths && gh-pages -d public"`  
3. 部署到Github上：  
`npm run deploy`
4. 域名设置：
* 在阿里云无名那里建立CNAME类型的解析，并把地址解析指向yourname.github.io。  
* 在Github的代码库的设置里，把Custom Domain设置成你的域名，我这里设置成了www.sunmou.cn。  
* 在根目录里新建一个目录static，创建一个文件CNAME，内容为域名地址，我这里为www.sunmou.cn。  
* 再次部署 `npm run deploy`
  
  我的Blog代码库<https://github.com/spmno/sunmou.cn>
