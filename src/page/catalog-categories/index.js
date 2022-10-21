require('page/common/header/index.js');
var $ = require('jquery');
const _util = require('../../util/util.js');
var _catalog_service = require('service/catalog-service.js');

var category = {
    init : function(){
        console.log(_util.getURLParam('categoryId'));
        this.loadProductInfo();
        this.bindEvents();
        return this;
    },
  
    //向服务器发送请求，获取该categoryId下的products
    loadProductInfo: function(){
      _catalog_service.getCategory(
        _util.getURLParam('categoryId'),
        function(res){
          var productList = eval(res);//将接收到的object数据转化为字符串类型，消除undefined问题
          var product;
          console.log(productList);
          let html="";
          for(product of productList){
            console.log(product);
            console.log(product.name);
            html += `<tr> 
                      <td>`;
            html +=    '<a href="../../view/catalog/product.html?productId='+product.productId+'">'+product.productId+'</a>';
            html +=          `</td>`;
            html +=          "<td>"+product.name+"</td>";
            html +=        `</tr>`;
          }
          //向页面上插入product信息
          $('#product-content').html(html);
        }, 
        function(errMsg){
          alert('数据获取失败');
        }
      )
    },
  
    //绑定事件
    bindEvents: function(){
        $ ('#name').html(_util.getURLParam('categoryId'));
    },
  };
  
  module.exports = category.init();