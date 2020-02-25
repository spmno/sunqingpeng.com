---
title: javascrip中的枚举类型
date: "2020-02-25T13:53:03.284Z"
description: "javascrip中的如何使用枚举类型"
tags: ["javascript", "enum"]
---

在C++，Java中已经习惯用枚举来做返回值去表示函数执行的状态。
Javascript虽然没有原生的关键字去支持，但也可以用其它方法实现。

声明对象
```
var CanboxStatus = {
  OPEN: 1,
  CLOSE: 2,
  ERROR: 3,
};
```
然后用对象的值去判断返回结果。
```
if (boxStatus !== CanboxStatus.OPEN) {
    event.reply("netmanager-reply", "not start");
}
```

