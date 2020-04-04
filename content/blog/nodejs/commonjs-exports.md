---
title: CommonJs模块规范中module.exports和exports
date: "2020-04-04T09:17:03.284Z"
description: "CommonJs模块规范中module.exports和exports"
tags: ["nodejs", "commonjs"]
---

之前用React基本上都是用export/import来导入，导出模块。但Nodejs不支持，需要用CommonJs的module。

每一个node.js执行文件，都自动创建一个module对象，同时，module对象会创建一个叫exports的属性，初始化的值是 {}  

1. exports其实是指向module.exports的引用；
2. require() 返回的是 module.exports 而不是 exports；
3. module.exports 的初始值为一个空对象{}，所以 exports也为空对象{}；
4. module.exports对象不为空的时候exports对象就自动忽略；

