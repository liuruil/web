# useState

## 改变数据拿到最新的值

```js
// 通用方法
import { useEffect, useRef, useState } from 'react'
export default function useCallbackState(value) {
    const cbRef = useRef()
    const [state, setState] = useState(value);
    useEffect(() => {
        cbRef.current && cbRef.current(state)
    }, [state])
    return [state, function (val, callback) {
        cbRef.current = callback
        setState(val)
    }]
}
```

## 如何使用

```js
// 通用方法
import useCallbackState from 'useCallbackState'
export default function App(value) {
    const cbRef = useRef()
    const [state, setState] = useCallbackState(value);
    setState('最新的值',res => {
      console.log('最新的值',res)
    })
}
```
