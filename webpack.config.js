const path = require('path');

//清除相同名称的打包后的js
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

//禁止生成licensez.txt文件
const TerserPlugin = require("terser-webpack-plugin");

//用来生成单独的css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//用来生成单独的HTML文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack=require('webpack');

var getHtmlConfig = function(name){
  return {
    template : './src/view/'+name+'.html',
        filename : 'view/'+name+'.html',
        inject   : true,//自动注入值
        hash     : true,//自动生成一个版本号
        chunks   : ['common',name],//入口
        minify   : {
          collapseWhitespace : false
        }
  }
}

const { javascript } = require('webpack');

var config = {
  entry: {
    'common'          : ['./src/page/common/index.js'],
    'index'           : ['./src/page/index/index.js'],
    'login'           : ['./src/page/login/index.js'],
    'catalog-main'    : ['./src/page/catalog-main/index.js'],
    'account-login'   : ['./src/page/account-login/index.js'],
    'account-register': ['./src/page/account-register/index.js'],
    'order-orderList' : ['./src/page/order-orderList/index.js'],
    'order-viewOrder' : ['./src/page/order-viewOrder/index.js'],
    'order-new'       : ['./src/page/order-new/index.js'],
    'help'            : ['./src/page/help/index.js'],
    'catalog-list'    : ['./src/page/catalog-list/index.js'],
    'catalog-detail'  : ['./src/page/catalog-detail/index.js'],
    'catalog-search'  : ['./src/page/catalog-search/index.js'],
    'cart'            : ['./src/page/cart/index.js'],
    'account-info'    : ['./src/page/account-info/index.js'],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer : {
    port : 8888,
    contentBase : path.resolve(__dirname,'dist')//设置默认打开哪个目录
  },
  module : {
    rules : [
      {test : /\.css$/,
       use : [
         {
           loader : MiniCssExtractPlugin.loader,
           options : {
             publicPath : '../'
           }
         }
        ,'css-loader'
             ]
      },
    {
      test : /\.(png|svg|jpg|gif)$/,
      // use : ['url-loader?limit=1000&name=images/[name].[ext]'],
      loader : 'url-loader',
      options: {
        limit   : 10,
        esModule: false,
        name    : 'images/[name].[ext]'
      },
      type : 'javascript/auto'
    },
    {
      test : /\.(htm|string)$/,
      use  : {
        loader  : 'html-loader',
        options : {
          esModule : false,//设置将图片当成es6的对象进行加载
          minimize : false //设置是否压缩
        }
      }
    }
    ]
  },
  plugins : [
      //new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename : 'css/[name].css'
      }),
      new HtmlWebpackPlugin(getHtmlConfig('index')),
      new HtmlWebpackPlugin(getHtmlConfig('login')),
      new HtmlWebpackPlugin(getHtmlConfig('catalog-main')),
      new HtmlWebpackPlugin(getHtmlConfig('account-login')),
      new HtmlWebpackPlugin(getHtmlConfig('account-info')),
      new HtmlWebpackPlugin(getHtmlConfig('account-register')),
      new HtmlWebpackPlugin(getHtmlConfig('order-orderList')),
      new HtmlWebpackPlugin(getHtmlConfig('order-viewOrder')),
      new HtmlWebpackPlugin(getHtmlConfig('order-new')),
      new HtmlWebpackPlugin(getHtmlConfig('help')),
      new HtmlWebpackPlugin(getHtmlConfig('cart')),
      new HtmlWebpackPlugin(getHtmlConfig('catalog-list')),
      new HtmlWebpackPlugin(getHtmlConfig('catalog-detail')),
      new HtmlWebpackPlugin(getHtmlConfig('catalog-search')),
      new webpack.HotModuleReplacementPlugin()//设置热替换
  ],
  optimization : {
      minimize:false,//是否将打包后的js进行压缩
      minimizer: [
          new TerserPlugin({
              extractComments:false,//不将注释提取到单独的文件中
          })
      ],
      splitChunks : {
        cacheGroups : {
          commons : {
              name : 'util',
              chunks : 'all',
              minChunks : 2,
              minSize : 0
          }
        }
      }
  },
  externals : {
    'jquery' : 'window.jQuery'
  },
  resolve : {
    alias : {
      util          : __dirname + '/src/util',
      page          : __dirname + '/src/page',
      images        : __dirname + '/src/images',
      service       : __dirname + '/src/service',
      node_modules  : __dirname + '/node_modules'
  }
}
};
module.exports = config;