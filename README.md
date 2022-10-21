## 小范同学编程时的心路历程：

1.在使用Hogan.js渲染数据的时候有时候会出现接收到了后端传过来的数据但是却没有渲染在页面上，此时应检查页面的index.js和.string文件是否有地方写错了，数据的不匹配或者单词拼错导致没取到值都会渲染不上，切记！！！！！！

2.在实现第三方登录的时候，由于处于第三方页面，所以不好回跳，此时修改后端控制器用工厂类代理进行页面的跳转。或许不修改后端的话直接跳回主界面，在前端使用一个监听器也可以完成类似的工作或者用监听器监听到去请求接口时进行页面的跳转，这两种方法暂未进行尝试。

-------------------------------------------------------------------------------------------------------------------------------------------------------

#### **Week6-P1 项目初始化和 Webpack 的安装&demo**

1.git初始化和gitignore

2.nodejs&npm

3.webpack 的安装 5.x  

4.官网的 demo 

    -设置不压缩和不单独生成注释文件 

    -自动清空dist目录

#### **Week6-P2 webpack 对 JavaScript 的处理**

1.多页应用

2.jQuery的引用

    -模块化的方式

    -传统HTML直接引用

    -传统直接引用+模块化的方式 

3.公共模块的提取

    -公共模块提取成独立的文件

#### **Week6-P3 webpack 对 HTML、CSS、图片的处理**

1.css的处理

    -css-loader (style-loader) MiniCssExtractPlugin单独打包

2.搜索框的快捷键 ctrl+F

3.图片的加载

    -url-loader file-loader limit参数和name参数控制图片格式和打包之后的名称

4.HTML的处理

    -HtmlWebpackPlugin

#### **Week6-P4 webpack-dev-server的配置及使用**

#### **Week7-P1 通用的CSS和index.html的开发**

1.mypetstore.css作为通用的css

#### **Week7-P2 首页catalog-main.html的开发**

1.网页的公共部分的包含问题，使用html-loader来加载后缀名为htm的公共部分，区别于用html插件来加载后缀名为html的文件

#### **Week7-P3 首页catalog-main.html中图片的加载**

1.图片的加载分两种情况：

    - html-loader加载的网页中的图片，只需路径正确就可以加载

    - htmlwebpackplugin加载的网页中的图片，需要require

#### **Week7-P4 通用util.js的开发**

#### **Week7-P5 判断登录状态**

#### **Week8-P1 用户模块登录功能的模板和CSS**

#### **Week8-P2 用户登录功能的逻辑处理**

#### **Week8-P3 用户登录功能的完善**

#### **Week8-P4 商品展示List功能的模板和CSS**

#### **Week8-P5 使用Hogan.js渲染模板数据**

#### **Week8-P6 完成商品列表功能**
