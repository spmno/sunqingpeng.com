---
title:  javascript 浅拷贝与深拷贝
date: "2020-03-07T21:40:03.284Z"
description: "javascript 浅拷贝与深拷贝"
tags: ["javascript"]
---

在javascript编程中，我们最常用的就是赋值（=）操作。  
在javascript中，等号操作只是对对象地址的引用。  
想真正创建另外的副本，我们就需要进行拷贝操作。  
下面在介绍一下两种拷贝方案，深拷贝和浅拷贝。

* 浅拷贝  
  `Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。  
  语法：`Object.assign(target, ...sources)`  返回目标对象。  
  拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。  

  展开语法(Spread syntax), 构造字面量对象时,进行克隆或者属性拷贝：  
  `let objClone = { ...obj };`

* 深拷贝  
  将对象序列化为字符串，然后再将其反序列化  
  `obj1 = { a: 0 , b: { c: 0}}; `  
  `let obj3 = JSON.parse(JSON.stringify(obj1)); `

  NODE.JS 中的深拷贝  
  ```
  const v8 = require('v8');
  const buf = v8.serialize({ a: 0 , b: { c: 0}});
  const cloned = v8.deserialize(buf);```  

  

