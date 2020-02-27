---
title: flutter开发环境的建立
date: "2020-02-27T12:02:03.284Z"
description: "flutter开发环境的建立及注意事项"
tags: ["android", "flutter"]
---

由于各种原因，又开始做Android开发了。
习惯了React+Antd的开发，再看Activity，Fragment，真是觉得无力。
Android O最新支持的JetPack Compose还不错，可惜普及还得一年之后。
所以决定先试试google强力推荐的flutter，先把环境搭起来。

Android studio 3.6，Dart  2.7，Flutter 1.12.13

首先安装Android studio，国内官网下载。

<https://developer.android.google.cn/studio>

安装Dart，几种方式，加apt源，下载deb，用压缩包。链接如下：

<https://dart.dev/get-dart>

apt源是google提供的，试了一下没成功。直接下deb包安装。

安装Flutter，直接下载，自己选个地方解压一下就行。

<https://flutter.dev/docs/get-started/install/linux>

安装完之后，开始配置Android Studio环境。
安装Dart和Flutter插件。
Setting -> Plugin，搜索Dart和Flutter，安装。

安装成功后，在New中就可以新建Flutter工程了。

遇到问题：
1. no devices，找不到调试设备。  
    解决方法：  
    `flutter config --android-sdk /path/to/android/sdk`  
    `flutter config --android-studio-dir /path/to/android/studio`
    
2. flutter doctor没有找到Android SDK  
    解决方法：  
    在.bashrc中加入 ANDROID\_HOME 变量。  
    `export ANDROID_HOME=/path/to/android/sdk`    
    `export PATH="$PATH:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools"`
