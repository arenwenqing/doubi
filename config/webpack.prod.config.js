const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { npm_config_analyze: analyze, NODE_ENV: env } = process.env
const entry = {
  // mobile: path.join(__dirname, '../src/mobile/index.ts'),
  // pc: path.join(__dirname, '../src/pc/index.ts'),
  index: path.join(__dirname, '../src/index.ts')
}
const prodConfig = {
  mode: env ? 'production' : 'development',
  entry: entry,
  output: {
    path: path.join(__dirname, '../lib/'),
    // filename: 'index.js',
    libraryTarget: 'umd', // 采用通用模块定义
    // libraryExport: 'default' // 兼容 ES6 的模块系统、CommonJS 和 AMD 模块规范
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?modules']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.min.css'
    }),
    new CleanWebpackPlugin(),
    analyze ? new BundleAnalyzerPlugin() : null
  ].filter(item => item),
  externals: { // 定义外部依赖，不打包react/react-dom/antd/axios
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    // antd: 'antd',
    // axios: 'axios'
  }
}

module.exports = merge(prodConfig, baseConfig)