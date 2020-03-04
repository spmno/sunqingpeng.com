---
title: javascript Object与Map对比
date: "2020-03-04T20:28:03.284Z"
description: "javascript Object与Map对比 "
tags: ["javascript", "object", "map"]
---

在使用javascript时候，使用[Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)与[Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)的时候，概念比较模糊。这里做个对比，具体还需要参考MDN文档。

1. Key的取值：  
   Object：字符串或Symbol  
   Map：任何值(对象或者原始值)   
2. 创建方法：  
   Object:   
   // 对象初始化器（Object initialiser）或对象字面量（literal）  
   { [ nameValuePair1[, nameValuePair2[, ...nameValuePairN] ] ] }  
   // 以构造函数形式来调用  
   new Object([value])  
   Map:  
   new Map([iterable])  
3. 读：  
   Object: obj.key; 或者 obj[key];  
   Map: map.get(key);  
4. 写：  
   Object: obj.key = value; 或者 obj[key] = value;
   Map: map.set(key, value);
5. Map支持迭代器，Object不支持。

下面写下MDN中的对比：
Objects 和 Maps 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 Maps 使用。不过 Maps 和 Objects 有一些重要的区别，在下列情况里使用 Map 会是更好的选择：

一个Object的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值，包括函数、对象、基本类型。
Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。

注意：自ECMAScript 2015规范以来，对象确实保留了字符串和Symbol键的创建顺序； 因此，在只有字符串键的对象上进行迭代将按插入顺序产生键。

你可以通过 size 属性直接获取一个 Map 的键值对个数，而 Object 的键值对个数只能手动计算。
Map 可直接进行迭代，而 Object 的迭代需要先获取它的键数组，然后再进行迭代。
Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。
注意：虽然 ES5 开始可以用 map = Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见。

Map 在涉及频繁增删键值对的场景下会有些性能优势。
   