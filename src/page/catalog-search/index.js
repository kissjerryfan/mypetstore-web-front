require('page/common/header/index.js');
require('../../util/util.js');
const _util = require('../../util/util');
var _catalog_service = require('service/catalog-service.js');
var listTemplate = require('./index.string');

var catalogList = {
    listData : {
        title           : '',
        headList        : [],
        productList     : {}
    },
    productHeadList : [
        'Product ID',
        'Name'
    ],
    init :function(){
        this.bindEvents();
        this.loadAccountInfo();
        return this;
    },
    bindEvents : function(){

    },
    loadAccountInfo : function(){
        var _this=this;
        var formData = {
            key : _util.getURLParam('key')
        }
        console.log(formData.key);
        _catalog_service.searchByKey(formData,
            function(res){
                console.log(res);
                _this.listData.headList = _this.productHeadList;
                _this.listData.title = 'Search List';
                _this.listData.productList = res;
                var result = _util.renderHtml(listTemplate, {ListData : _this.listData});
                $('#Catalog').html(result);
                console.log(result);
            },
            function(){
                console.log('error');
            }
            );
    }
};

module.exports = catalogList.init();