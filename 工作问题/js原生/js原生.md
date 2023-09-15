#### 解码编码

##### encodeURI和decodeURI

>定义

encodeURI() 函数可把字符串作为 URI 进行编码。

对以下在 URI 中具有特殊含义的 ASCII 标点符号，encodeURI() 函数是不会进行转义的： , / ? : @ & = + $ # (可以使用 encodeURIComponent() 方法分别对特殊含义的 ASCII 标点符号进行编码。).

__提示：__ 使用 decodeURI() 方法可以解码URI（通用资源标识符:UniformResourceIdentifier,简称"URI"）。

>个人理解：

个人感觉这两个函数（encodeURI和decodeURI）用的很少，因为对地址编码主要是为了去掉地址中的特殊字符，而这两个函数对常用的特殊字符都没有处理。

##### encodeURIComponent和decodeURIComponent

>定义

encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。

该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。

其他字符（比如 ：;/? : @ & = + $,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。

__提示：__ 使用 decodeURIComponent() 方法可以解码URI（通用资源标识符:UniformResourceIdentifier,简称"URI"）。

> 示例代码如下：

```js
// 定义一个地址字符串
 var uri = 'https://www.runoob.com/my test.php?name=fff&car=saab'

 console.log(encodeURIComponent(uri))
 // 结果：将特殊字符全部编码
 // https%3A%2F%2Fwww.runoob.com%2Fmy%20test.php%3Fname%3Dfff%26car%3Dsaab
 console.log(encodeURI(uri))
 // 结果：仅对my test中间的空格进行了编码
 // https://www.runoob.com/my%20test.php?name=fff&car=saab
 var url = encodeURIComponent(uri)

 console.log(decodeURIComponent(url))
 console.log(decodeURI(uri))
 // 两者解码结果相同
 // https://www.runoob.com/my test.php?name=fff&car=saab
```