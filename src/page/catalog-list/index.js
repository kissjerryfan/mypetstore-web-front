require('page/common/header/index.js');
require('../../util/util.js');
const _util = require('../../util/util');
var _catalog_service = require('service/catalog-service.js');
var _cart_service = require('service/cart-service.js');
var listTemplate = require('./index.string');

var catalogList = {
    listData: {
        title: '',
        headList: [],
        productList: {},
        itemList: {}
    },
    productHeadList: [
        'Product ID',
        'Name'
    ],
    itemHeadList: [
        'Item ID',
        'Product ID',
        'Description',
        'List Price',
        ' '
    ],
    init: function () {
        this.bindEvents();
        this.loadAccountInfo();
        return this;
    },
    bindEvents: function () {

    },
    loadAccountInfo: function () {
        var id = _util.getURLParam('id');
        var route = _util.getURLParam('route');
        var _this = this;

        if (route === 'product') {
            _catalog_service.getProductList(id,
                function (res) {
                    console.log(res);
                    _this.listData.headList = _this.productHeadList;
                    _this.listData.title = id;
                    _this.listData.productList = res;
                    _this.listData.itemList = null;

                    var result = _util.renderHtml(listTemplate, { ListData: _this.listData });
                    $('#Catalog').html(result);
                    console.log(result);
                },
                function () {

                }
            );
        }
        if (route === 'item') {
            _catalog_service.getItemList(id,
                function (res) {
                    console.log(res);
                    _this.listData.headList = _this.itemHeadList;
                    _this.listData.title = id;
                    _this.listData.productList = null;
                    _this.listData.itemList = res;

                    var result = _util.renderHtml(listTemplate, { ListData: _this.listData });
                    $('#Catalog').html(result);
                    //绑定购物车事件
                    console.log(result);
                    _this.addCartEvent();
                },
                function () {

                }
            );
        }
    },
    addCartEvent: function () {
        var _this = this;
        $(".addButton").on('click', function () {
            console.log(this.name);
            _this.addCart(this.name);
        });

    },
    addCart: function (itemId) {
        _cart_service.addItem2Cart(itemId,
            function (res) {
                console.log(res);
                window.location.href = _util.getURLParam('redirect') || './cart.html';
            },
            function (errMsg) {
                console.log(errMsg);
            });
    }
};

module.exports = catalogList.init();