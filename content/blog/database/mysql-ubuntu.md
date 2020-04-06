---
title:  ubuntu mysql安装及简单使用
date: "2020-04-06T10:46:15.284Z"
description: "ubuntu mysql安装及简单使用"
tags: ["database", "mysql"]
---

1. 用apt安装所需要的库：
    ```
    sudo apt install mysql-server          //服务端
    sudo apt install mysql-client          //客户端
    sudo apt install libmysqlclient-dev    //程序编译时链接的库
    ```

2. 初始化配置：  
   `sudo mysql_secure_installation`

3. 新建数据库：
   ```
    CREATE DATABASE databasename
    GRANT ALL PRIVILEGES ON databasename.* TO databasename@"%" IDENTIFIED BY "password";  //针对这个数据库，新建一个用户和密码 
   ```    
4. 常用操作：  
    <font color='blue'>创建数据库</font>  
    create database dbname charset=utf8;  
    <font color='blue'>删除数据库</font>  
    drop database dbname;  
    <font color='blue'>切换数据库</font>  
    use dbname;  
    <font color='blue'>查看当前选择的数据库</font>  
    select database();  
    <font color='blue'>查看当前数据库所有表</font>  
    show tables;  
    <font color='blue'>创建表</font>  
    create table tablename(
         列及类型
    );  
    <font color='blue'>修改表</font>  
    alter table tablename add|change|drop 列名　类型；  
    <font color='blue'>删除表</font>  
    drop table tablename;  
    <font color='blue'>查看表结构</font>  
    desc tablename;  
    <font color='blue'>查看表的创建语句</font>  
    show create table 'tablename'  
    <font color='blue'>查询</font>  
    select * from tablename;  
    <font color='blue'>增加</font>  
    全列插入: insert into tablename values(....)  
    缺省插入: insert into tablename(列１....) values(值1 .....)  
    同时插入多条数据　insert into tablename values(....),(.....)  
    或者　insert into tablename(列１...) values(值１...),(值１....);  
    <font color='blue'>修改</font>  
    update tablename set 列1=值1 ,... where 条件  
    <font color='blue'>删除</font>  
    delete from tablename where 条件  
    注意删除需谨慎，删了就没了一般进行逻辑删除，即把isdelete 设成１如（上下图对比）实现假删除
