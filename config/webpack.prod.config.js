const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { npm_config_analyze: analyze } = process.env
const entry = {
  // mobile: path.join(__dirname, '../src/mobile/index.ts'),
  // pc: path.join(__dirname, '../src/pc/index.ts'),
  index: path.join(__dirname, '../src/index.tsx')
}
const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  entry: entry,
  output: {
    // path: path.join(__dirname, '../lib/'),
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    libraryTarget: 'umd' // 采用通用模块定义
    // libraryExport: 'default' // 兼容 ES6 的模块系统、CommonJS 和 AMD 模块规范
  },
  module: {
    // rules: [
    //   {
    //     test: /\.css$/,
    //     use: [MiniCssExtractPlugin.loader, 'css-loader']
    //   }
    // ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common', // 指定包名，不指定时使用上层key作为包名
          chunks: 'all',
          minSize: 10,
          priority: 0
        },
        // vendor: 打包node_modules中的文件（上面的 lodash）
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          chunks: 'all',
          priority: 10
        }
      }
    },
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin()
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
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
    'antd-mobile': 'antd-mobile'
    // antd: 'antd',
    // axios: 'axios'
  }
}

module.exports = merge(prodConfig, baseConfig)