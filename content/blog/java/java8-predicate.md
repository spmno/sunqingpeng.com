---
title:  java8 Predicate
date: "2020-03-15T10:56:18.284Z"
description: "熟悉java8 predicate, 可是使代码更清晰"
tags: ["java", "predicate", "java8"]
---

在使用Stream的时候，我们发现Stream上的参数，很多都是Predicate类型，我们现在了解一下Predicate吧。
官方文档：<https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html>

Predicate单词本意是断言，这里Predicate就是断言条件的真假。主要是test()函数，返回传入函数的真假。
上代码：
```Java
import java.util.function.Predicate;

public class PredicateTest {

    public static void main(String[] args) {
        Predicate<String> predicate = new Predicate<String>() {
            @Override
            public boolean test(String value) {
                return value.equals("hello");
            }
        };
        System.out.println(predicate.test("hello"));
        System.out.println(predicate.test("world"));
    }
}
```
输出：  
true  
false