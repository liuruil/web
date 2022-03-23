## 自定义滚动条插件

1. 引入样式文件

```css
 <link rel="stylesheet" href="./dist/css/index.css">
```

2. 引入 ScrollBar.js 文件

```js
<script src="./dist/ScrollBar.js"></script>
```

3. 使用说明

```js
<div class="scroll-wrapper">
  <div class="scroll-content">write....</div>
</div>;

new ScrollBar({
  scrollWrapper: document.getElementsByClassName("scroll-wrapper")[0], //外部容器
  scrollContent: document.getElementsByClassName("scroll-content")[0], //包裹数据的容器
  scrollWidth: 10, //滚动条的宽度
  scrollBarContentColor: "#6C73FF", //滚动条容器的颜色
  scrollBarColor: "#A5ABFF", //滚动条的颜色
  height: 500, //容器的高度
});
```
