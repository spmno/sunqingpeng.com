---
title:  Material Design概述
date: "2020-03-25T10:42:03.284Z"
description: "根据谷歌官方资料简单介绍一下对Material Design的理解"
tags: ["Material Design"]
---

资料基本上来自于Google的Material Design网站，<https://material.io/>
谷歌对设计原则，组件，Icons，辅助设计，开发都做了相关的建议。

* 设计
  * Layout: 可预测，可感知，前后设计一致。响应式。  <https://material.io/design/layout/responsive-layout-grid.html#>  
     大部分组件8dp对齐，Icon 4dp对齐。  
     三个概念Column，Gutter，Margin
     ![布局概念](layout-responsive-columns-margins-gutters.png)
     列(Column)：根据百分比定义，而不是固定值。  
     ![360dp columns](layout-responsive-columns-360.png)
     ![600dp columns](layout-responsive-columns-600.png)
     沟(Gutter)：两个列之间的空间，根据不同的宽度确定不同的固定值。360dp为16dp， 600dp为24dp。
     ![360dp gutters](ayout-responsive-gutters-360.png)
     ![600dp gutters](layout-responsive-gutters-600.png)
     边距(Margin)：内容与左右边距的空间。和Gutter一样，根据不同的宽度确定不同的固定值。
     ![360dp margin](ayout-responsive-margins-360.png)

  * Navigation: 分为侧向导航，前向导航，返回导航。
     横向导航(Lateral navigation)：侧边栏，底部导航，Tab导航。
     ![drawer](lateral-nav-drawer.png)
     ![bottom](lateral-bottom-nav.png)
     ![tab](lateral-tabs.png)
     前向导航(Forward navigation)：向下引入内容，一系列的流，引入到其它APP。  
     实现方式：卡片，列表等容器，按钮中转，搜索，内容链接。  
     返回导航(Reverse navigation)：返回键。
     ![reverse](reverse-chronological.png)
  
  * Color: 主颜色，次要颜色，亮暗主题。
    ![color](color-colorsystem-schemecreation-theme.png)
    工具：<https://www.materialpalette.com/>
    



