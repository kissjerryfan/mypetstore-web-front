require('page/common/header/index.js');
require('../../util/util.js');
const _util = require('../../util/util.js');
var _cart_service = require('../../service/cart-service.js');
var listTemplate = require('./index.string');

var cartList = {
    listData: {
        headList: [],
        itemList: {}
    },
    itemHeadList: [
        'Item ID',
        'Product ID',
        'Description',
        'Instock',
        'Quantity',
        'List Price',
        'Total Cost',
    ],
    init: function () {
        this.bindEvents();
        this.loadCartList();
        return this;
    },
    bindEvents: function () {
        var _this = this;
    },
    updateNum: function (itemId, quantity) {
        _cart_service.updateNum(quantity, itemId, function(res){

            window.location.href = _util.getURLParam('redirect') || './cart.html';

        }, function(){

        });
    },
    loadCartList: function () {
        var _this = this;

        _cart_service.viewCart(
            function (res) {
                console.log(res);
                _this.listData.headList = _this.itemHeadList;
                _this.listData.itemList = res;

                var result = _util.renderHtml(listTemplate, { ListData: _this.listData });
                
                $('#Cart').html(result);
                

                if(_this.listData.itemList == null)
                {
                    console.log('EEEmsgSHOW');
                    $('#cartEmptyMsg').show();
                    $('.Button').hide();
                }
                else{
                    $('#cartEmptyMsg').hide();
                }
                _this.addInputEvent();
                console.log(result);
            },
            function () {

            }
        );

    },
    addInputEvent: function () {
        var _this = this;
        $(".number").on('change', function () {
            if(this.value > 0){
            _this.updateNum(this.name, this.value);
            }
            else {
                _cart_service.removeItem(this.name, 
                    function(res){
                        window.location.href = _util.getURLParam('redirect') || './cart.html';
                    }, function(){});
            };
        });
        
    }
};

module.exports = cartList.init();