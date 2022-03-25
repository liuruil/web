## 什么是jsx
- facebook起草的js扩展语法
- 本质是一个js对象，会被babel编译，最终转化成React.createElement
- 每一个jsx表达式，有且仅有一个根节点 否则无法编译
  - React.Fragment <></> ===  <React.Fragment></React.Fragment>
- 每一个jsx元素必须结束(XML规范)
- 最好在每个jsx加上小括号 表示这是一个表达式

## 在jsx中嵌入表达式
- { 表达式 }
- 表达式中嵌入 true  false  null 和  undefined 是不会显示的
- {/* 注释的表示方式 */}
- { 普通对象 }  会出问题 不能作为子元素
- { react元素对象 }  可以
- { 数组 } 会自动把数组一个一个展开作为子元素加进来
- 给相同的元素类型加上key值  保证唯一性 不然会有警告
- 防止注入攻击 react的保护机制
  - 自动编码       innerText  纯文本
  - dangerouslySetInnerHTML 可以用来插入HTML元素
- 作为元素的属性
```js
var content = '<h1>我是插入的HTML元素</h1>'
var div = <img src={ 路径变量 } 
className="wrapper"
//class属性要写成  className
style = {{
    width:'200px',
    backgroundColor:'green',
    marginLeft:'200px'
    //小驼峰命名法
}}
dangerouslySetInnerHTML={{
    __html : content
></img>
```
## 元素的不可变性
- 虽然JSX元素是一个对象，但是该对象中的所有属性不可更改(只读属性) Object.freeze()冻结
- 如果想要更改 只能重新渲染 并且不会浪费性能 每一次创建React对象的开销是很小的 react会进行优化 如果对比后发现只有内容变了，真实dom只会更改内容 所以不会浪费性能