## PureComponent
纯组件，用于避免不必要的渲染(运行render函数)，从而提高效率

优化:如果一个组件的属性和状态，都没有发生变化，重新渲染该组件是没有必要的

PureComponent是一个组件，如果某个组件继承自该组件，则该组件的shouldComponentUpadte会进行优化，对属性和状态进行**浅比较**，如果相等则不会重新渲染该组件

**注意点**
- PureComponent进行的是浅比较(关于类组件的用法)
  - 为了效率，应该尽量使用pureComponent
  - 要求不要改动之前的状态，永远是创建新的状态覆盖之前的状态(Immutable，不可变对象)
  - 有一个第三方JS库，Immutable.js,它专门用来制作不可变对象
- 函数组件，使用React.memo函数制作纯组件