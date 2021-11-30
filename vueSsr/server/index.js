const express = require('express')
const server = express()
const fs = require('fs')
// const { default: createApp } = require('../dist/server.bundle') //不需要引入  自动注入
const { resolve } = require('path')

const { createBundleRenderer } = require('vue-server-renderer')
const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

server.use(express.static(resolve('../dist'), { index: false }))

server.get('*', async (req, res) => {
    try {
        const url = req.url
        // const app = createApp()
        const render = createBundleRenderer(serverBundle, {
            template: fs.readFileSync('./index.ssr.html', 'utf-8'),
            clientManifest
        })
        // const html = await render.renderToString(app)
        const html = await render.renderToString({ url })
        res.send(html)
    } catch (error) {
        console.log(error)
        if(error.code === 404){
            res.status(404).send('页面去火星了')
            return;
        }
        res.status(500).send('服务器端错误')
    }
})


server.listen('3309', () => {
    console.log('http://localhost:3309')
})