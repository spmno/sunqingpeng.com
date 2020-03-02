---
title: 使用storybook测试自己组件 
date: "2020-03-03T22:28:03.284Z"
description: "使用storybook测试自己组件 "
tags: ["react", "storybook"]
---

最近公司项目用electron+react写一个PC端的小工具。  
在调试的时候发现，如果加入业务逻辑了之后，调试UI的效率比较低。  
之前就听说用storybook调试UI效果效率高。正好试一下。  

由于项目已经建立好了，就直接在项目根目录下执行以下命令：  
`npx -p @storybook/cli sb init`  
这个命令初始化storybook工程，并且可以检测目标工程的类型，主流的React、Vue、Angular都支持。  
从命令输出可以看出，检测本工程的类型是`react-script`  
同时，创建.storybook目录及配置文件main.js，内容如下：  
```
module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
};
```
主要的配置项就是stories，说明了寻找story的目录和story文件的后缀。  
命令还会修改package.json文件，在script中加入了storybook相关命令，并且在工程中加入了两个例子文件。  
能帮你做的都做了 :grinning:  :grinning:  :grinning:

我们可以学着例子建立index.stories.js（测试index组件）  
```
export default { title: 'Index' };  
export const  AppTest = () =>  (<App />)
```
运行  
`npm run storybook`  
在<http://localhost:9009>可以看到最终结果。每个story都是一项，项目名称就是刚才的title。  

最后推荐一个比较好的中文学习网站  
<https://www.learnstorybook.com/intro-to-storybook/react/zh-CN/get-started/>