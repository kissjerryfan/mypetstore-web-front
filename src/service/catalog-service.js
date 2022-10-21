var _util = require('util/util.js');

var _catalog_service = {
    getProductList : function( categoryId , resolve , reject){
        console.log('getProductList');
        _util.request({
            url     : _util.getServerURL('catalog/categories/'+ categoryId + '/products'),
            method  : 'GET',   
            success : resolve,
            error   : reject,
        });
    },
    getItemList : function( productId , resolve, reject){
        console.log('getItemList');
        _util.request({
            url     : _util.getServerURL('catalog/products/'+ productId + '/items'),
            method  : 'GET',   
            success : resolve,
            error   : reject,
        });
    },
    getItemByItemID:function(itemID,resolve,reject){
        console.log('getItemByItemId');
        _util.request({
            url     : _util.getServerURL('catalog/items/'+ itemID),
            method  : 'GET',   
            success : resolve,
            error   : reject
        });
    },
    searchByKey:function(key,resolve,reject){
        console.log('searchByKey');
        _util.request({
            url     : _util.getServerURL('catalog/search'),
            method  : 'POST', 
            data    : key, 
            success : resolve,
            error   : reject,
        });
    }
};

module.exports = _catalog_service;