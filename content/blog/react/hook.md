---
title: react hook特性 
date: "2020-03-10T08:18:03.284Z"
description: "使用hook来写自己组件 "
tags: ["react", "hook"]
---

最简单概括hook的一句话就是，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

React官网给出的3个使用的理由：
* 完全可选的。 你无需重写任何已有代码就可以在一些组件中尝试 Hook。但是如果你不想，你不必现在就去学习或使用 Hook。
* 100% 向后兼容的。 Hook 不包含任何破坏性改动。
* 现在可用。 Hook 已发布于 v16.8.0。

最常用的两个Hook就是useState和useEffect，我们通过这两个例子还了解Hook吧。

1. useState
  代替class中的state，参数只有一个就是state的初始值，返回state变量和setState函数。
  我们来对比一个两个版本的区别：  
  class版本：  
  ```
    class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        count: 0
        };
    }

    render() {
        return (
        <div>
            <p>You clicked {this.state.count} times</p>
            <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Click me
            </button>
        </div>
        );
    }
    }
  ```
  hook版本：
  ```
    import React, { useState } from 'react';

    function Example() {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(0);

    return (
        <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
        </div>
    );
    }
  ```
   是不是感觉hook的版本更轻爽一些。  

2. useEffect
   useEffect Hook 可以看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。  
   看一下对比的例子：  
   class版本：
   ```
    class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        count: 0
        };
    }

    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
    }

    componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
    }

    render() {
        return (
        <div>
            <p>You clicked {this.state.count} times</p>
            <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Click me
            </button>
        </div>
        );
      }
    }
   ```
   hook版本：
   ```
    import React, { useState, useEffect } from 'react';

    function Example() {
    const [count, setCount] = useState(0);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
        </div>
    );
    }
   ```
   可以看到hook版本的一个函数包括了componentDidMount, componentDidUpdate两个函数的作用。如果Effect返回函数，则这个函数就是componentWillUnmount函数的作用，
   ```
     useEffect(() => {
        return function umount() {
        console.log('this is the umount function');
        };
    });
```
    THE END
