# CORS跨域详解

## 概述

`CORS`是基于`http1.1`的一种跨域解决方案，它的全称是Cross-Origin Resource Sharing,跨域资源共享。

它的总体思路是：**如果浏览器要跨域访问服务器的资源，需要获得服务器的允许。**

![](/Users/apple/Desktop/博学谷/web/resource/md/assets/cors.png)

而要知道，一个请求可以附带很多信息，从而会对服务器造成不同程度的影响

比如有的请求只是获取一些数据，有的请求会改变服务器的数据

针对不同的请求，CORS 规定了三种不同的交互模式，分别是

- **简单请求**
- **需要预检的请求**
- **附带身份凭证的请求**

这三种模式从上到下层层递进，请求可以做的事情，要求也越来越严格。

下面分别说明了三种请求模式的具体规范。

## 简单请求

### 简单请求的判定

当请求**同时满足**以下条件时，浏览器会认为它是一个简单请求：

1. **请求方法属于下面的一种：**
   - get
   - post
   - head
2. **请求头仅包含安全的字段，常见的安全字段如下**
   - Accept
   - Accept-Language
   - Content-Language
   - Content-Type
   - DPR
   - Save-Data
   - Viewport-Width
3. **请求头如果包含Content-Type，仅限下面的值之一**
   - text/plain
   - multipart/form-data
   - application/x-www-form-urlencoded

如果以上三个要求同时满足，**浏览器**会判定为简单请求。

### 简单请求的交互规范

当浏览器判定**ajax跨域请求为简单请求**时，会发生以下的事情

1. **请求头中自动添加Origi字段**

```javascript
// 简单请求
$.ajax({url:"http://www.crossdomain.com/api/news"})
```

发出请求后，**请求头**会是下面的格式：
```javascript
GET /api/news
Host：crossdomain.com
Connection: keep-alive
Reference：http://www.baidu.com/index.html
Origin: http://www.baidu.com
```

看最后一行，**Origin**字段会告诉服务器，是哪个源地址在跨域请求

2. 服务器响应头中包含**Access-Control-Allow-Origin**

当服务器收到请求后，如果允许该请求跨域访问，需要在响应头中添加**Access-Control-Allow-Origin**字段

该字段的值可以是：

- `*`： 表示我很开放，什么人我都允许访问
- 具体的源：比如`http://www.baidu.com`,表示我就允许你访问。

> 实际上，这两个值对于客户端`http://www.baidu.com`而言都一样，因为客户端才不会管其他源服务器允不允许，就关心自己是否被允许
>
>当然，服务器也可以维护一个可被访问的源列表（白名单）,如果请求命中该列表，才允许跨域。
>
> **为了避免后续的麻烦，强烈推荐使用具体的源**

假设服务器做了以下的响应：

```javascript
HTTP/1.1 200 OK
Data: Tue, 21 APR 2022 08:03:30 GMT
...
Access-Control-Allow-Origin: http://www.baidu.com
...
消息题中的数据
```

当浏览器看到服务器允许自己访问时，高兴的像一个两百斤的孩子，于是，把响应顺利交给js，以完成后续的处理。

## 需要预检的请求

简单请求对服务器的威胁不大，所以允许使用上述的简单交互即可完成。

但是，如果浏览器不认为只是一种简单请求，就会按照下面的流程进行：

1. 浏览器发送预检请求，询问服务器是否允许
2. 服务器允许
3. 浏览器发送真实请求
4. 服务器完成真实的响应

比如，在页面`http:www.baidu.com`中有以下的代码造成了跨域


```javascript
$.ajax({
	url:"http://www.crossdomain.com/api/news",
	type:'POST',
	headers:{
		//设置请求头
        a:1,
        b:2,
        "content-type":"application/json"
	},
	body:JSON.stringfly({a:1})
})
```

浏览器会发现它不是一个简单请求，则会按照下面的流程与服务器交互

1. 浏览器发送预检请求，询问服务器是否允许

```javascript
OPTIONS /api/news http/1.1
Host：crossdomain.com
...
Origin: http://www.baidu.com
...
Access-Control-Request-Method：POST
Access-Control-Request-Headers：a,b,content-type
```

可以看出，这并非我们想要发送的真实请求，请求中不包含我们的消息体

这是一个预检请求，它的目的是询问服务器，是否允许后续的真实请求

预检请求没有请求体，它包含了后续真实请求要做的事情

预检请求有以下特征：

- 请求方法为 OPTIONS
- 没有请求体
- 请求头中包含
  - Origin: 请求的源
  - Access-Control-Request-Methods ：真实请求的请求方法
  - Access-Control-Request-Headers：真实请求改动的请求头字段

2. 服务器允许

服务器收到预检请求后，可以检查预检请求中包含的信息，如果允许这样的请求，需要响应下边的消息格式

```javascript
HTTP/1.1 200 OK
Data: Tue, 21 APR 2022 08:03:30 GMT
...
Access-Control-Allow-Origin: http:www.baidu.com
Access-Control-Request-Methods：POST
Access-Control-Request-Headers：a,b,content-type
Access-Control-Max-Age：86400
```

对于预检请求，不需要响应任何的消息体，只需要在响应头中添加：

- Access-Control-Allow-Origin: 允许的源
- Access-Control-Request-Methods ：允许后续的请求方法
- Access-Control-Request-Headers ：允许改动的请求头
- Access-Control-Max-Age：告诉浏览器，多少秒内，对于相同的请求源，请求头，方法，不需要再次发送预检了

3. 浏览器发送真实请求

预检服务器允许后，浏览器就会发送真实的请求，上边的代码会发生下边的请求数据

```javascript
POST /api/news http/1.1
Host：crossdomain.com
Connection: keep-alive
Reference：http://www.baidu.com/index.html
Origin: http://www.baidu.com

请求体：{ a : 1 }
```

4. 服务器响应真实请求

```javascript
HTTP/1.1 200 OK
Data: Tue, 21 APR 2022 08:03:30 GMT
...
Access-Control-Allow-Origin: http:www.baidu.com
...
添加数据成功
```

可以看出，当完成预检请求后，后续的处理与简单请求相同

## 附带身份凭证的请求

默认情况下，ajax的跨域请求并不会附带cookie，这样一来，某些需要权限的操作就无法进行

不过可以通过简单的配置就可以实现附带 cookie

```javascript
$.ajax({
	url:"http://www.crossdomain.com/api/news",
	type:'POST',
	xhrFields: {
       withCredentials: true
    },
})
```

这样一来，该跨域的ajax请求就是一个附带身份凭证的请求

当一个请求需要附带 cookie 时，无论它是简单请求还是预检请求，都会在请求头中添加 cookie 字段

而服务器响应时，需要明确告知客户端：服务器允许这样的凭证

告知的方式也非常的简单，只需要在响应头中添加` Access-Control-Allow-Credentials:true `即可

对于一个附带身份凭证的请求，若服务器没有明确告知，浏览器仍视为跨域被拒绝。

另外，要特别注意的是，**对于附带身份凭证的请求，不可以设置 Access-Control-Allow-Origin: * **，这就是为什么不推荐使用*****的原因。

## 一个额外的补充

在跨域访问时，js只能拿到一些最基本的响应头，如：Cache-Control,Content-Language,Content-Type，Expires,Last-Modified,Pragma，如果要访问其他的响应头，则需要在服务器设置本响应头

```javascript
Access-Control-Expose-Headers: authorization
```

 这样，js就能访问指定的响应头了。