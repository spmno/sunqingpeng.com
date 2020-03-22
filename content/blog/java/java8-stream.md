---
title:  java8 Stream
date: "2020-03-15T10:38:38.284Z"
description: "熟悉java8 stream, 可是使代码更清晰"
tags: ["java", "stream", "java8"]
---

stream是java8新引入的包，具体可以参考官方文档
<https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html#package.description>  
包中主要是几种Steam和相关的Builder，[DoubleStream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/DoubleStream.html)，[IntStream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/IntStream.html)，[LongStream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/LongStream.html)，[Stream<T>](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)
这几个Interface的方法基本相同。

我的理解，Stream就是一个流水线，一个操作可以分成一系列的步骤，有中间操作，有结束操作。一旦调用了结束操作。这个结果就计算出来了。  
调用的方法类似RxJava的一系列函数式的调用，也类似javascript的Promise的调用。主要是作用就是写代码写的更少，更清晰。  

总体来说，stream有3个特点：  
       1. stream不存储数据  
       2. stream不改变源数据  
       3. stream的延迟执行特性  
主要操作方法分类：
<table>
    <tr>
        <td colspan=3>Steam操作方法</td>
    </tr>
    <tr>
        <td rowspan=2>中间操作(Intermediate operations)</td>
        <td>无状态(Stateless)</td>
        <td>unordered() filter() map() mapToInt() mapToLong() mapToDouble() flatMap() flatMapToInt() flatMapToLong() flatMapToDouble() peek()</td>
    </tr>
    <tr>
        <td>有状态(Stateful)</td>
        <td>distinct() sorted() sorted() limit() skip()</td>
    </tr>
    <tr>
        <td rowspan=2>结束操作(Terminal operations)</td>
        <td>非短路操作</td>
        <td>forEach() forEachOrdered() toArray() reduce() collect() max() min() count()</td>
    </tr>
    <tr>
        <td>短路操作(short-circuiting)</td>
        <td>anyMatch() allMatch() noneMatch() findFirst() findAny()</td>
    </tr>
</table>

直接上代码吧：  
```Java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class StreamTest {
    public static void main(String[] args) {
        List<User> users = new ArrayList<>();
        users.add(new User("sun", "wukong"));
        users.add(new User("zhu", "bajie"));
        users.add(new User("sha", "heshang"));

        //测试filter和forEach，打印"wukong"
        users.stream().filter(x->x.getFirstName().equals("sun")).forEach(x->System.out.println(x.getLastName()));

        //测试map和collect, 得到一个新的只包含性的List 
        List<String> firstNames = users.stream().map(User::getFirstName).collect(Collectors.toList());
        firstNames.forEach(x->System.out.println(x));
    }
}
```  
上面的代码选了中间操作和结束操作的几个例子，其它的函数用法类似，就不一一举例了。
