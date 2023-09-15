#### RSA加密解密

- 前后端对于私密信息，均加密解密

>首先下载jsencrypt包

如图：

![](./images/%E4%B8%8B%E8%BD%BD.png)

>加密解密代码：

```js

import JSEncrypt from 'jsencrypt'
// 加密
export function getRsaCode (str) {
  // 注册方法
//   前后端约定公钥
  const publicKey =
    '' // ES6 模板字符串 引用 rsa 公钥
  const encryptStr = new JSEncrypt()
  encryptStr.setPublicKey(publicKey) // 设置 加密公钥
  const data = encryptStr.encrypt(str.toString()) // 进行加密
  return data
}
// 解密
export function RSAdecrypt (pas) {
    // 前后端约定私钥
  const privateKey =''
    
  const encryptStr = new JSEncrypt()
  encryptStr.setPrivateKey(privateKey)
  const data = encryptStr.decrypt(pas.toString())
  return data
}

```

>可以将它挂载到全局使用

```js
// 解构出加密解密方法
import {getRsaCode,RSAdecrypt} from './utils/crypt.js'

//小程序中:app.js
App({
    onLaunch(){
         $getRsaCode:getRsaCode,
  $RSAdecrypt:RSAdecrypt,
    }
})

//vue中：main.js

Vue.prototype.$getRsaCode=getRsaCode,
Vue.prototype.$RSAdecrypt=RSAdecrypt,

```

__出现过的问题1__ : 小程序构建以后，形成miniprogram_npm之后，引入的crypt.js文件（切记命名不要是：jsencrypt.js,会报错，说这个文件里谁谁不是一个函数。）依然无法使用（会报类型的错）。

__解决办法__ : 在}(this, (function (exports) {代码下面添加下方代码

```js
var navigator = {
  appName: 'Netscape',
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46     (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
};
var window = {
  ASN1: null,
  Base64: null,
  Hex: null,
  crypto: null,
  href: null
};
```

>代码具体位置如图所示：

![](./images/%E6%B7%BB%E5%8A%A0%E4%BB%A3%E7%A0%81.png)