##### 界面交互

19. showLoading: 显示loading提示框

- title ：文字提示内容

- mask：是否显示透明层，防止触摸穿透（主要解决，正在加载的时候，用户还点击按钮）

```js
// 对象形式传参
vx.showLoading({
    title:'正在加载。。。'
    mask：true
})
```

20. showToast：消息提示框。

- title ：文字提示内容

- mask：是否显示透明层，防止触摸穿透（主要解决，正在加载的时候，用户还点击按钮）

- icon:指定图标，none是不适用图标（本次小程序中，常用这个设置）

- duration：提示的延迟时间

21. hideLoading：隐藏 loading 提示框（一般不写参数，直接调用就行）

##### 本地存储

==小程序中读与存，对于复杂数据都不需要做json处理，小程序会自己处理！==

>存数据

22. setStorageSync（'key',value）：缓存本地，参数是字符串

```js
// 存入简单数据
vx.setStorageSync('name','付方方')
// 存入复杂数据(会自动做json处理，不需要再人为处理)
vx.setStorageSync('user',{name:'fff',age:25})
```
>取数据
23. getStorageSync('key')：从本地缓存中同步获取指定 key 的内容。

```js
vx.getStorageSync('name')
// 读取复杂对象时，不需要再转为js对象，小程序里会自动转，出来就是处理好的对象
vx.getStorageSync('user')
```

>删数据

24. removeStorageSync

```js
vx.removeStorageSync('user')
```

>清空本地数据

25. clearStorageSync：

```js
// 不需要传参，本地有多少，删多少
vx.clearStorageSync()
```

##### 小程序api特征

1. 同步api：同步方式读取api执行结果（==api的名称以Sync为后缀==）

2. 异步api：回调函数中读取api执行结果（==支持success（成功时调用）、fail（失败时调用）、complete（无论成功或失败都会执行）回调函数==）

3. promise：只有部分api支持

>说明：如果一个异步函数支持promise格式，那么可以用async，await来拿数据，示例如下：

```js
// 比如本次小程序用到的一个api：showModal

 wx.showModal({
        title: '提示',
        content: '需要获取您的地理位置，请确认授权',
        showCancel: false,
        success(res) {
          if (res.confirm) that.openSetting()
        }
      })

// 等价于
async showMoal(){
const res=await wx.showModal({
        title: '提示',
        content: '需要获取您的地理位置，请确认授权',
        showCancel: false,
      })
}
```