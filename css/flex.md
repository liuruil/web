# flex注意点

## flex-basis

1. 在不设置width的情况下，设置 flex-basis，或者flex-basis > width
    - flex-basis 相当于设置元素的最小宽度，当不换行元素超过内容区的时候，会撑开元素
2. 在设置width的情况下，设置 flex-basis，且小于width，
    - 那么元素的宽度范围是 flex-basis < realWidth < width
3. 无论什么情况，被不换行内容撑开的容器，不参与压缩

## flex-shrink

> 按照元素自身的**内容区**进行压缩

```css
    .wrapper {
        display: flex;
        width: 600px;
        height: 600px;
        border: 1px solid black;
    }

    .content:nth-of-type(1) {
        flex-basis: 200px;
        flex-shrink: 1;
        background-color: red;
    }

    .content:nth-of-type(2) {
        flex-basis: 300px;
        flex-shrink: 2;
        background-color: aqua;
    }

    .content:nth-of-type(3) {
        flex-basis: 400px;
        flex-shrink: 3;
        background-color: blueviolet;
    }
```

```html
<div class='wrapper'>
  <div class='content'></div>
  <div class='content'></div>
  <div class='content'></div>
</div>
```

```js
// 三个元素分别为 200 300 400
// 压缩比例为    1   2   3

// 则计算出总共的 200 * 1 + 300 * 2 + 400 * 3 = 2000
                     200 * 1    300 * 2   400 * 3 
                     -------    -------   -------
                      2000       2000      2000

// 计算出的压缩比例为   1 / 10     3 / 10    6 / 10
// 需要压缩的总宽度为  200 + 300 + 400 - 600 =  300
// 每个元素压缩的宽度    30          90       180
// 元素实际的宽度为     170         210       220
```

## align-self

1. 父级设置 align-content，再给子元素设置 align-self 无效

```css
        .wrapper {
            display: flex;
            width: 600px;
            height: 600px;
            border: 1px solid black;
            flex-wrap: wrap;
            /* 子元素多行居中 */
            align-content: center;
        }

        .content {
            flex-basis: 100px;
            height: 100px;
            border: 1px solid black;
            box-sizing: border-box;
        }

        .content:nth-of-type(2) {
            /* 再设置此属性无效 */
            align-self: flex-end;
        }
```

```html
    <div class='wrapper'>
        <div class='content'></div>
        <div class='content'></div>
        <div class='content'></div>
        <div class='content'></div>
        <div class='content'></div>
        <div class='content'></div>
        <div class='content'></div>
        <div class='content'></div>
    </div>
```
