---
title:  java8 forEach 
date: "2020-03-14T14:10:03.284Z"
description: "java8 forEach和lambda应用，写更少的代码"
tags: ["java", "java8"]
---

java8 增加lambda之后，forEach与lambda组合，能让我们写更少的代码。  

1. ArrayList:  

```Java
import java.util.ArrayList;
import java.util.List;  
public class ForEachTest {
    public static void main(String []args) {
    List<String> items = new ArrayList<>();
    items.add("hello");
    items.add("world");
    items.forEach(item->System.out.println(item));
    }
}
```

2. Map:  
```Java
import java.util.HashMap;  
import java.util.Map;
public class ForEachTest {
    public static void main(String []args) {
        Map<String, String> items = new HashMap<>();
        items.put("sun", "wukong");
        items.put("zhu", "bajie");
        items.forEach((key, value) -> System.out.println("last name:" + key + ", first name:" + value));  
    }
}
```
以上代码直接建立ForEachTest.java，拷贝运行。
