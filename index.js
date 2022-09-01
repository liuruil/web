var $ = {
    ajax: function (options) {
        var url = options.url
        var type = options.type
        var dataType = options.dataType
        //判断是否同源
        var targetProtocol = ""  //目标协议
        var targetHost = "" //包含目标域名和端口
        // 如果url不带http 那么访问的一定是相对路径，相对路径一定是同源的
        if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
            var targetUrl = new URL(url)
            targetProtocol = targetUrl.protocol
            targetHost = targetUrl.host
        } else {
            //同源
            targetProtocol = location.protocol
            targetHost = location.host
        }
        // 判断是否为JSONP
        if (dataType === 'jsonp') {
            //判断是否同源
            if (targetProtocol === location.protocol && targetHost === location.host) {
                // 同源情况下  jsonp会当作普通的ajax请求
            } else {
                //不同源 随即生成一个callback
                var callback = 随机名字
                window[callback] = options.success
                // 生成script标签
                var script = document.createELement('script')
                if (url, indexOf('?') > 0) {
                    script.src = url + "&callback=" + callback
                } else {
                    script.src = url + "?callback=" + callback
                }
                script.id = callback
                document.head.appendChild(script)
            }
        }
    }
}