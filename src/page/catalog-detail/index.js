require('page/common/header/index.js');
require('../../util/util.js');
const _util = require('../../util/util');
var _catalog_service = require('service/catalog-service.js');
var itemInfoTemplate = require('./index.string');
const _cart_service = require('../../service/cart-service.js');

var itemInfo = {
    listData:{
        back:'',
        itemId:'',
        itemAttr:'',
        productName:'',
        quantity:'',
        decimal:''
    },
    
    init :function(){
        this.bindEvents();
        this.loadAccountInfo();
        return this;
    },
    bindEvents : function(){
    },
    loadAccountInfo : function(){
        var id = _util.getURLParam('id');
        var route = _util.getServerURL('route');
        var _this = this;

        _catalog_service.getItemByItemID(id,
            function(res){
                console.log(res);
                _this.listData.back=res.categoryId;
                _this.listData.itemId=id;
                _this.listData.itemAttr=res.attribute1;
                _this.listData.productName=res.productName;
                _this.listData.quantity=res.quantity+'  in stock.';
                _this.listData.decimal='$'+res.listPrice;


                var result = _util.renderHtml(itemInfoTemplate,{ListData: _this.listData});
                $('#Content').html(result);
                $('#des').html(res.productDescription);
                console.log(result);
                $('#addButton').on('click', function(){
                    _cart_service.addItem2Cart(_this.listData.itemId, function(res)
                    {
                        window.location.href = _util.getURLParam('redirect') || './cart.html';
                    }, function(){});
                });

            },
            function(err){

            });
    }
};

module.exports = itemInfo.init();