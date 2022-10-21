var _util = require('util/util.js');

var _cart_service = {
    viewCart : function(resolve, reject){
        _util.request({
            url     : _util.getServerURL('cart/user_cartView'),
            method  : 'GET',
            success : resolve,
            error   : reject,
        });
    },
    removeItem : function(itemId, resolve, reject){
        _util.request({
            url     : _util.getServerURL('cart/removeItem/' + itemId),
            method  : 'GET',   
            success : resolve,
            error   : reject,
        });
    },
    updateCart : function(resolve, reject){
        _util.request({
            url     : _util.getServerURL('cart/updateCart'),
            method  : 'GET',   
            success : resolve,
            error   : reject,
        });
    },
    clearCart : function(resolve, reject){
        _util.request({
            url     : _util.getServerURL('cart/clearCart'),
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },
    updateNum : function(quantity, itemId, resolve, reject){
        _util.request({
            url     : _util.getServerURL('cart/updateNum/' + itemId + '/' + quantity),
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },
    addItem2Cart : function(itemId, resolve, reject){
        _util.request({
            url     : _util.getServerURL('cart/addItem/' + itemId),
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    }
};

module.exports = _cart_service;