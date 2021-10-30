const { default: merge } = require('webpack-merge')
const baseWebpack = require('./webpack.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
module.exports = merge(baseWebpack, {
    entry: {
        server: './src/entry/server.entry.js'
    },
    output: {
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new VueServerPlugin()
    ],
    target: 'node'
})