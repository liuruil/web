## 更好Unicode支持
早期，由于储存空间宝贵，Unicode使用16进制来储存文字，我们将一个16位的二进制编码叫做一个码元。
后来，由于技术的发展，Unicode对文字进行编码扩展，将某些文字扩展到了32位(占用两个码元)，并且，将某个文字对应的二进制数字叫做码点
> charCodeAt()     得到的是码元 (一个汉字占一个码点，两个码元)
> codePointAt()    得到的是码点  
```js
使用场景:{
    得到一个字符串的真实长度
    得到一个字符是否是32位的(是否是汉字)
}
```
> ES6为正则表达式添加了一个flag "u" 添加了该配置匹配的是码点


## 字符串新增的实例API
1. includes()   //是否包含传递的字符串               都有第二个参数  
2. startsWith() //判断字符串中是否以指定的字符串开头  都有第二个参数
3. endsWith()   //判断字符串中是否以指定的字符串结尾  都有第二个参数
4. repeat()     //将字符串重复指定的次数 返回新的字符串

## 正则中的粘连标记(y) 
匹配时完全按照正则中的 **lastIndex** 位置 开始匹配
reg.lastIndex 默认为0   可以更改

## 模板字符串
1. 处理多行字符串
2. 字符串拼接

在ES6中提供了模板字符串的书写，可以非常方便的换行和拼接
```js
var text = `${js表达式}`
表达式可以是任何有意义的数据
表达式是可以嵌套的
```

- 扩展课程
```js
// 模板字符串标记
在模板字符串书写之前可以加标记；标记是一个函数，
参数如下
1. 被差值分割的字符串数组
2. 后续参数  所有的插值
var love1 = '秋葵'
var love2 = '香菜'
var myTag = function (parts) {
    var parts = parts
    var str = ''
    var params = [].slice.call(arguments, 1)
    for (var i = 0; i < params.length; i++) {
        str += parts[i] + ":"+ params[i]
        if (i == params.length - 1) {
            str += parts[i + 1]
        }
    }
    return str
}
var text = myTag`邓哥喜欢${love1}，还喜欢${love2}。`
console.log(text) // 邓哥喜欢:秋葵，还喜欢:香菜。

var text = String.raw`abc\t\nabn`
console.log(text) 



```