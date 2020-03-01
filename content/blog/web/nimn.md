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

空间的节省，失去的是可读性。下面是官方几种格式的对比。  
XML (806 bytes)
```
<any_name>
    <person>
        <phone>+122233344550</phone>
        <name>Jack</name>
        <phone>+122233344551</phone>
        <age>33</age>
        <married>Yes</married>
        <birthday>Wed, 28 Mar 1979 12:13:14 +0300</birthday>
        <address>
            <city>New York</city>
            <street>Park Ave</street>
            <buildingNo>1</buildingNo>
            <flatNo>1</flatNo>
        </address>
        <address>
            <city>Boston</city>
            <street>Centre St</street>
            <buildingNo>33</buildingNo>
            <flatNo>24</flatNo>
        </address>
    </person>
    <person>
        <phone>+122233344553</phone>
        <name>Boris</name>
        <phone>+122233344554</phone>
        <age>34</age>
        <married>Yes</married>
        <birthday>Mon, 31 Aug 1970 02:03:04 +0300</birthday>
        <address>
            <city>Moscow</city>
            <street>Kahovka</street>
            <buildingNo>1</buildingNo>
            <flatNo>2</flatNo>
        </address>
        <address>
            <city>Tula</city>
            <street>Lenina</street>
            <buildingNo>3</buildingNo>
            <flatNo>78</flatNo>
        </address>
    </person>
</any_name>
```
JSON (580 bytes)
```
{
    "any_name": {
        "person": [
            {
                "phone": [
                    122233344550,
                    122233344551
                ],
                "name": "Jack",
                "age": 33,
                "married": "Yes",
                "birthday": "Wed, 28 Mar 1979 12:13:14 +0300",
                "address": [
                    {
                        "city": "New York",
                        "street": "Park Ave",
                        "buildingNo": 1,
                        "flatNo": 1
                    },
                    {
                        "city": "Boston",
                        "street": "Centre St",
                        "buildingNo": 33,
                        "flatNo": 24
                    }
                ]
            },
            {
                "phone": [
                    122233344553,
                    122233344554
                ],
                "name": "Boris",
                "age": 34,
                "married": "Yes",
                "birthday": "Mon, 31 Aug 1970 02:03:04 +0300",
                "address": [
                    {
                        "city": "Moscow",
                        "street": "Kahovka",
                        "buildingNo": 1,
                        "flatNo": 2
                    },
                    {
                        "city": "Tula",
                        "street": "Lenina",
                        "buildingNo": 3,
                        "flatNo": 78
                    }
                ]
            }
        ]
    }
}
```
MESSAGE PACK (426 bytes)
```
81 a8 61 6e 79 5f 6e 61 6d 65 81 a6 70 65 72 73 6f 6e 92 86 a5 70 68 6f 6e 65 92 cf 00 00 00 1c 75 ac d2 26 cf 00 00 00 1c 75 ac d2 27 a4 6e 61 6d 65 a4 4a 61 63 6b a3 61 67 65 21 a7 6d 61 72 72 69 65 64 a3 59 65 73 a8 62 69 72 74 68 64 61 79 bf 57 65 64 2c 20 32 38 20 4d 61 72 20 31 39 37 39 20 31 32 3a 31 33 3a 31 34 20 2b 30 33 30 30 a7 61 64 64 72 65 73 73 92 84 a4 63 69 74 79 a8 4e 65 77 20 59 6f 72 6b a6 73 74 72 65 65 74 a8 50 61 72 6b 20 41 76 65 aa 62 75 69 6c 64 69 6e 67 4e 6f 01 a6 66 6c 61 74 4e 6f 01 84 a4 63 69 74 79 a6 42 6f 73 74 6f 6e a6 73 74 72 65 65 74 a9 43 65 6e 74 72 65 20 53 74 aa 62 75 69 6c 64 69 6e 67 4e 6f 21 a6 66 6c 61 74 4e 6f 18 86 a5 70 68 6f 6e 65 92 cf 00 00 00 1c 75 ac d2 29 cf 00 00 00 1c 75 ac d2 2a a4 6e 61 6d 65 a5 42 6f 72 69 73 a3 61 67 65 22 a7 6d 61 72 72 69 65 64 a3 59 65 73 a8 62 69 72 74 68 64 61 79 bf 4d 6f 6e 2c 20 33 31 20 41 75 67 20 31 39 37 30 20 30 32 3a 30 33 3a 30 34 20 2b 30 33 30 30 a7 61 64 64 72 65 73 73 92 84 a4 63 69 74 79 a6 4d 6f 73 63 6f 77 a6 73 74 72 65 65 74 a7 4b 61 68 6f 76 6b 61 aa 62 75 69 6c 64 69 6e 67 4e 6f 01 a6 66 6c 61 74 4e 6f 02 84 a4 63 69 74 79 a4 54 75 6c 61 a6 73 74 72 65 65 74 a6 4c 65 6e 69 6e 61 aa 62 75 69 6c 64 69 6e 67 4e 6f 03 a6 66 6c 61 74 4e 6f 4e
```
or
```
��any_name��person���phone���u��&��u��'�name�Jack�age!�married�Yes�birthday�Wed, 28 Mar 1979 12:13:14 +0300�address���city�New York�street�Park Ave�buildingNo��flatNo���city�Boston�street�Centre St�buildingNo!�flatNo���phone���u��)��u��*�name�Boris�age"�married�Yes�birthday�Mon, 31 Aug 1970 02:03:04 +0300�address���city�Moscow�street�Kahovka�buildingNo��flatNo���city�Tula�street�Lenina�buildingNo��flatNoN
```
NIMN (232 bytes)
```
ÆÆÇÆÇ122233344550º122233344551ÅJackº33ºYesºWed, 28 Mar 1979 12:13:14 +0300ÇÆNew YorkºPark Aveº1º1ÆBostonºCentre Stº33º24ÅÆÇ122233344553º122233344554ÅBorisº34ºYesºMon, 31 Aug 1970 02:03:04 +0300ÇÆMoscowºKahovkaº1º2ÆTulaºLeninaº3º78ÅÅ
```
NIMN with date compression (190 bytes)
```
ÆÆÇÆÇ122233344550º122233344551ÅJackº33ºYesº�OMs9demÇÆNew YorkºPark Aveº1º1ÆBostonºCentre Stº33º24ÅÆÇ122233344553º122233344554ÅBorisº34ºYesº�Faun34mÇÆMoscowºKahovkaº1º2ÆTulaºLeninaº3º78ÅÅ
```
or
```
�����122233344550�122233344551�Jack�33�Yes��OMs9dem��New York�Park Ave�1�1�Boston�Centre St�33�24���122233344553�122233
```     


下面是常用转nimn的两个库：  
xml转nimn:  
<https://github.com/NaturalIntelligence/fast-xml-parser>  
json转nimn:  
<https://github.com/nimndata/nimnjs>