---
title: "ImageMagick报错convert-im6.q16: not authorized解决方法"
date: "2020-02-29T09:54:03.284Z"
description: "ImageMagick报错convert-im6.q16: not authorized解决方法"
tags: ["linux", "ImageMagick"]
---


修改配置文件/etc/ImageMagick-6/policy.xml
`vim /etc/ImageMagick-6/policy.xml`
 
找到这一行：
 
`<policy domain="coder" rights="none" pattern="PDF" />`
 
修改为：
 
`<policy domain="coder" rights="read|write" pattern="PDF" />`
 
在下面再增加一行：
 
`<policy domain="coder" rights="read|write" pattern="LABEL" />`

