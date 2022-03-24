const Webpack = require('webpack');
// webpack 可视化
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const isProduction = process.env.NODE_ENV !== 'development';
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 本地环境是否需要使用cdn
// const devNeedCdn = false

// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    // vue: 'Vue',
    // vuex: 'Vuex',
    // 'vue-router': 'VueRouter',
    // axios: 'axios',
    // echarts: 'echarts',
    // 'element-ui': 'ELEMENT'
  }
};

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      //如果地址以/api开头，它就会请求到 http://122.51.238.153 
      '/api': {
        // target: 'http://192.168.100.248:48081',
        target: 'http://192.168.1.41:48081',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',   //重写请求路径
        },
      }
    }
  },
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: config => {
    if (isProduction) {
      config.externals = cdn.externals;
      config.plugins.push(new BundleAnalyzerPlugin());
      config.plugins.push(new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

      // 代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            // 生产环境自动删除console
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log', 'console.dir', 'console.table']
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      // gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css'];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      );
    } else {
      config.devtool = 'source-map';
      config.externals = cdn.externals;
    }
  }
};
