### nvm 的安装和使用

> 下载链接(window)：https://pan.baidu.com/s/1SQlzCIKHrlTdOvALS3p2oA?pwd=asdf

**注意：** 安装之前必须卸载之前版本的 node


1. 使用 nvm 下载 node 和 npm 失败的解决方法

```js
在nvm的安装目录找到setting.txt文件,加入以下代码,设置镜像

　node_mirror: https://npm.taobao.org/mirrors/node/
　npm_mirror: https://npm.taobao.org/mirrors/npm/
```

2. 常用命令

- nvm install version 下载指定 node 版本
- nvm use version 使用 node 指定版本
- nvm list [available] 查看本地或者远程全部 node 版本

