#### 公共传参

##### 祖孙组件传输--provide & inject

###### vue2

在祖先组件中用provide函数（不需要从vue2中导入，直接用就行）

```js
export default {
  data() {
    return { 
      data: '给子孙的数据'
    }
  },
  //直接用，不需要'import {provide} from vue'
    provide() {
    return {
      data: () => {
        return this.data
      }
    }
  },
}
```

在子孙组件中，直接使用inject接收，也不需要从vue库中导入

##### 路由传输

##### vuex传参

##### pinia传参

##### 本地存储传参