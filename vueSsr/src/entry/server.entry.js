import createApp from '../main'

export default function (ctx) {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()
        router.push(ctx.url)
        router.onReady(() => {
            // 判断路由是否存在
            const matchedComponents = router.getMatchedComponents()
            if (matchedComponents.length === 0) {
                reject({
                    code: 404
                })
            }
            Promise.all(matchedComponents.map((c) => {
                if (c.asyncData) {
                    return c.asyncData(store)
                }
            })).then(() => {
                // 向页面注入一个属性 window__INITIAL_STATE__
                ctx.state = store.state
                resolve(app)
            }).catch(reject)
        }, reject)
    })
}
