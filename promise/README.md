## 实现Promise.all
首先要明白Promise.all的功能和特点，这样才可以进一步去实现它。我也是最近跟着各位大佬学习到的。

#### 功能
阮一峰老师的《ECMAScript 6 入门》中解释道：`Promise.all`方法用于将多个`Promise`实例，包装成一个新的`Promise`实例。
```
let p = Promise.all([p1, p2, p3]);
```
1、只有当所有p1、p2、p3都`fulfilled`p的状态才`fulfilled`，p1、p2、p3的返回值组成的数组会传递给p的回调函数。

2、如果p1、p2、p3有一个被`rejected`，p的状态就会变成`rejected`，第一个被`rejected`的实例的返回值传递给p的回调函数。

#### 特点
1. `Promise.all`的方法的参数，不一定必须是数组，但是必须具有Iterator接口，而且返回的每个成员都是`Promise`实例。

2. 如果传入的可迭代参数为空，则返回一个返回一个已完成状态。

3. 如果传入的参数有不是`Promise`实例的，会调用`Promise.resolve`方法，将其转换为`Promise`实例。

4. 如果传入的promise都完成，则`Promise.all`返回的promise异步的变成完成。

5. 如果有一个promise失败，`Promise.all`异步的将失败的结果传给回调函数。

6. 在任何情况下，`Promise.all`返回的都是一个数组。
