1.  window 指定了一个 load 事件处理程序。因为向 DOM 中添加新元素，所以必须确保页面已经加载完成，如果在页面加载完成之前操作 document.body，则会导致错误
2.  通过 innerHtml 插入的 script 标签是不会执行的