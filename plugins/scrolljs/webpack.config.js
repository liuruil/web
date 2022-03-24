
const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'ScrollBar.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src')
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.less$/i,
                use: [
                    miniCssExtractPlugin.loader,//生成单独的css文件
                    {
                        loader: "css-loader",
                        options: { modules: true }
                    },
                    'less-loader',
                    'postcss-loader'
                ],
            }
        ]
    },
    plugins: [
        new miniCssExtractPlugin({
            // 生成的单独的css文件重命名
            filename: 'css/index.css'
        }),
        new OptimizeCssAssetsPlugin()
    ],
};