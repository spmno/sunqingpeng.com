---
title: 最省空间的数据格式，nimn介绍 
date: "2020-03-01T22:28:03.284Z"
description: "最省空间的格式，nimn介绍，比XML省85%"
tags: ["data format", "nimn", "xml", "json"]
---

工作开始最早接触的数据格式应该是INI，Windows编程的时候经常使用。  
然后是XML文件，Andorid的Manifest文件就是XML格式。  
网络交换数据最常用的是Json格式。  

今天介绍的是[nimn](http://nimn.in/)格式，它占用空间是最小的，下面是与xml和json的对比：
![空间对比](dataformats.png)

下面是常用转nimn的两个库：
xml转nimn:
<https://github.com/NaturalIntelligence/fast-xml-parser>  
json转nimn:  
<https://github.com/nimndata/nimnjs>