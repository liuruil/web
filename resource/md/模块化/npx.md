# npx

## npx 与 npm 的区别

使用方法：**npx 命令**。

> **npx 命令**虽然会自动安装模块，但是**重在执行命令**。
> npm 侧重于安装或者卸载某个模块的，并不具备执行某个命令的功能。

## npx 基本逻辑

> npx 非常智能的识别命令，
> 如果在本地项目 **node_modules/.bin**可以找到此命令，就直接使用此命令。
> 如果不存在，就临时下载（会在一个临时目录去下载 下载完之后自动执行相关命令）
> 此临时目录中的命令会在一段时间之后自动删除。

## npx 命令和包名不同

```js
//  -p 指定包 包提供的命令
npx -p @vue/cli vue create app

npx -p webpack-cli webpack
```

## npm init

> **npm init** 通常用来初始化工程的*package.json*文件
> 除此之外，有时也可以充当*npx*使用

```js
npm init 包名 // 等效于 npx create-包名

npm init @命名空间 // 等效于 npx @命名空间/create

npm init @命名空间/包名 // 等效于 npx @命名空间/create-包名
```

> 注意点
> 如果将 npx 命令 配置到 package.json 的 script 中，可以省略 npx
