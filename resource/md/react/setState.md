## 深入了解 steState

> setState 对状态的改变，可能是异步的

> 如果改变状态的代码处于某个 HTML 元素的事件中，则其是异步的

```react
handeClick(){
    this.setState({
       <!-- 改变状态触发render函数，之后再运行回调函数  -->
    },()=>{
       console.log('a')
    })
}
render(){
 console.log('b')
}
<!-- 先打印b 再打印a -->
```

> 如果在事件中触发三次状态的改变

```react
state = {
    n:0
}
handeClick(){
    this.setState({
       n: this.state.n+1
    })
     this.setState({
       n: this.state.n+1
    })
     this.setState({
       n: this.state.n+1
    })
    <!-- 这样写的结果是不对的 因为在事件中setState是异步的  这样运行的结果还是1
    等效代码 如下
    this.setState({
       n: 1
    })
     this.setState({
       n: 1
    })
     this.setState({
       n: 1
    })
    -->
}

<!-- 应该利用回调函数 但是会造成回调地狱-->
this.setState({
      n:this.state.n+1
    },()=>{
      this.setState({
          n: this.setState.n+1
      },()=>{
          this.setState({
              n:this.setState.n+1
          })
      })
    })
<!-- 最好的写法如下 -->
第一个参数写成函数的形式
this.setState(prev=>{
    <!-- prev表示当前的状态 -->
   <!-- 该函数的返回结果会混合掉之前的状态 -->
   <!-- 该函数也是异步的 -->
    return {
        n : prev.n+1
    }
},()=>{
    console.log(this.state.n)
    <!-- 此时的输出结果是3 因为回调函数是在render之后才会触发
    由于react的异步优化，render函数会在所有状态改变之后才会触发，
    所以此时的三次状态已经改变完成，所以结果是3 -->
})
this.setState(prev=>{
    return {
        n : prev.n+1
    }
})
this.setState(prev=>{
    return {
        n : prev.n+1
    }
})
此时虽然改变了三次状态，但是render函数只会运行一次
```

**react 会对异步的 setState 进行优化，将多次 setState 进行合并(将多次状态改变完成后统一对 state 进行改变，再运行 render 函数)。如果是同步的则不会**

```react
setInterval(()=>{
    <!-- 此时是同步的 -->
    <!-- 这样写最后的结果是3，并且render函数运行三次 -->
    this.setState({
        n:this.state.n+1
    })
     this.setState({
        n:this.state.n+1
    })
     this.setState({
        n:this.state.n+1
    })
})
```

最佳实践：

1. 把所有的 setState 当作是异步的
2. 永远不要信任 setState 调用之后的状态
3. 如果需要使用改变之后的状态，需要使用回调函数的方式
4. 如果新的状态需要用到之前的状态进行运算，使用函数的方式(第一个参数)
