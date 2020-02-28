---
title: Seo常用标签及优化
date: "2020-02-27T22:54:03.284Z"
description: "最基本的SEO标签及解释"
tags: ["seo", "meta"]
---

网站搭好了，最重要的就是流量，如何获得流量，一是自己宣传，再就是让搜索引擎能找到你。

首先是标题，标题一定是对网站最好的定位。比如京东的标题：  
`<title>京东(JD.COM)-正品低价、品质保障、配送及时、轻松购物！</title>`

然后就是在head中，加入相关的meta标签。

什么是meta标签：

`meta标签提供关于HTML文档的元数据。元数据不会显示在页面上，但是对于机器是可读的。它可用于浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他 web 服务。`

meta主要分为二部分，name：名称，content：内容。主要的meta标签有以下几个类型：

1. description，描述：
主页中是对整体网站功能的描述。可以看一下京东的描述。  
`meta name="description" content="京东JD.COM-专业的综合网上购物商城,销售家电、数码通讯、电脑、家居百货、服装服饰、母婴、图书、食品等数万个品牌优质商品.便捷、诚信的服务，为您提供愉悦的网上购物体验!"`

2. keywords，关键字：  
对网站或者分页相关领域的提取。比如京东首页的keywords。
`<meta name="Keywords" content="网上购物,网上商城,手机,笔记本,电脑,MP3,CD,VCD,DV,相机,数码,配件,手表,存储卡,京东">`

3. robots，网页爬虫：  
允许爬虫抓取：  
`<meta name="robots" content="all">`  
让google抓取：  
`<meta name="googlebot" content="all">`  
让baidu抓取：  
`<meta name="baiduspider" content="all">`  

还有其它一些标签比如author，generator最好也写上。

在gatsby生成的meta标签中还发现了一些og开头的标签，是facebook推出的新标签。
og属性说明：  
og:title 标题  
og:type 类型  
常用值:article book movie  
og:image 略缩图地址  
og:url 页面地址  
og:description 页面的简单描述  
og:site_name 页面所在网站名  
og:videosrc 视频或者Flash地址  
og:audiosrc 音频地址  

有相关的信息也可以一起写上。




