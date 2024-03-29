## HOOK 简介

HOOK 是 React16.8.0 之后出现的

组件：无状态组件(函数组件) 类组件

类组件中的麻烦:

```react
 1. this指向问题
 2. 繁琐的生命周期
 3. 其他问题
```

HOOK 专门用于增强函数组件的功能，使之理论上可以成为类组件的替代品

HOOK(钩子)本质上是一个函数，该函数可以挂载任何功能

## State Hook

State Hook 是一个在函数组件中使用的函数(useState)，用于在函数组件中使用状态

- useState 有一个参数，代表状态的默认值
- 函数的返回值是一个数组，该数组一定包含两项
  - 第一项：当前状态值
  - 第二项：改变状态的函数

一个函数组件中可以有多个状态，这种做法非常有利于横向切分关注点

原理分析:
一个函数组件时(调用该函数)，改变状态一定重新运行函数

- 调用 useState，检查该节点的状态数组中是否存在
- 不存在，使用默认值创建一个状态，将该状态加入到状态数组中
- 存在 忽略掉默认值，直接得到改变后的状态

**每个节点有单独的一个状态数组，组件状态是附着在节点上的，是相互独立的**

**注意细节**

1. useState 最好写到函数的起始位置，便于阅读
2. 严禁 useState 出现在判断，循环中
3. useState 返回的函数(数组的第二项)，引用不变(节约内存空间)
4. 使用函数改变数据，如果数据和之前的数据完全相等(Object.is),不会导致重新渲染，以达到优化效率的目的
5. 使用函数改变数据，传入的值不会和原来的数据进行合并，而是直接替换。
6. 如果要实现强制刷新
   1. 在类组件中, 使用 this.forceUpdate() /./不会运行 shouldComponentUpdate
   2. 函数组件 使用一个空对象的 useState
7. 如果某些状态之间没有必然的联系，应该分化为不同的状态，**不要合并成一个对象**
8. 和类组件的状态一样，函数组件中改变状态可能是异步的(在 DOM 事件中)，多个状态变化会合并以提高效率，此时不能信任之前的状态，应该使用回调函数的方式改变状态

```jsx
   const [count, setCount] = useState(0)
   <button
      onClick={() => {
            setCount(prev=>prev+1)
            setCount(prev=>prev+1)
      }}>
   点击
   </button>
```

## Effect HOOK

Effect Hook:用于在函数组件中处理副作用

副作用:

1. ajax 请求
2. 计时器
3. 其他异步操作
4. 更改真实 DOM 对象
5. 本地储存
6. 其他会对外部产生影响的操作

函数:useEffect，该函数接受一个函数作为参数，接受的函数来处理副作用

**细节**

1. 副作用函数的运行时间点，是在页面完成 UI 渲染完成后，因此他的执行是异步的，并且不会阻塞浏览器 1.与类组件中 componentDidMount 和 componentDidUpdate 的区别
   2.componentDidMount 和 componentDidUpdate，更改了真实 DOM，但是用户还没有看到 UI 更新
   3.useEffect 中的副作用函数，更改了真实 DOM，并且用户已经看到了 UI 更新，异步
2. 每个函数组件中，可以多次使用 Effect，按顺序执行
3. 严禁 useEffect 出现在判断，循环中
4. useEffect 中的副作用函数可以有返回值，返回值必须是一个函数，该函数叫做清理函数。
   1. 该函数运行时间点，在每次运行副作用函数之前
   2. 首次渲染组件不会运行
   3. 组件被销毁时一定会运行清理函数
5. useEffect 函数，可以传递第二个参数
   1. 第二个参数是一个数组
   2. 数组中记录该副作用的依赖数据
   3. 当组件重新渲染时，只有依赖的数据和上一次不一样时，才会执行副作用
   4. 所以，当传递了依赖数据之后，如果数据没有发生变化
      1. 副作用函数仅在第一次渲染之后运行
      2. 清理函数仅在卸载组件之后运行
6. 副作用函数中，如果使用了函数上下文中的变量，则由于闭包的影响，会导致副作用函数中变量不会实时变化
7. 如果副作用函数在每次注册时，会覆盖掉之前的副作用函数，因此，尽量保持副作用函数稳定，否则控制起来比较复杂。

## Ref Hook

useRef 函数

1. 一个参数: 默认值
2. 返回一个固定的对象 `{current:值}`
