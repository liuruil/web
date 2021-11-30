const HtmlWebpackPlugin = require('html-webpack-plugin')
const { default: merge } = require('webpack-merge')
const { resolve } = require('path')
const baseWebpack = require('./webpack.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
module.exports = merge(baseWebpack, {
    entry: {
        client: './src/entry/client.entry.js'
    },
    plugins: [
        new VueClientPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('./public/index.html')
        })
    ]
})