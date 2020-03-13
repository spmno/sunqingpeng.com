---
title:  javascript 常用类型转换
date: "2020-03-12T21:40:03.284Z"
description: "javascript 常用类型转换"
tags: ["javascript"]
---


在写代码过程中，少不了各种类型的转换，C语言最常用的就是sprintf。  
下面介绍几种常用的javascript类型间的转换。  

* String转int
  `var intData = parseInt(stringData)` 或者 `var intData = Number(stringData)`

* Array和ArrayBuffer互转
  ArrayBuffer to Array  
  `let arrayBuffer = new ArrayBuffer(10);`  
  `let array = Array.prototype.slice.call(new Uint8Array(arrayBuffer ));`

* Array to ArrayBuffer
  `let array = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07];`  
  `let arrayBuffer = new Uint8Array(array).buffer;`

持续更新