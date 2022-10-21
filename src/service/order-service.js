var _util = require('util/util.js');

var _order_service = {
    viewOrderLists:function (username,resolve,reject){
        _util.request({
            url:_util.getServerURL('orders/get/'+username),
            success:resolve,
            error:reject,
        });
    },
    viewOrder:function (orderId,resolve,reject){
        _util.request({
            url:_util.getServerURL('orders/'+orderId),
            success:resolve,
            error:reject,
        })
    },
    insertOrder:function (username,data,resolve,reject){
        _util.request({
            url:_util.getServerURL('orders/insert/'+username),
            data:data,
            method  : 'POST',
            success:resolve,
            error:reject,
        })
    },
    pay:function (orderId,resolve,reject){
        _util.request({
            url:_util.getServerURL('order/pay/'+orderId),
            method:'POST',
            success:resolve,
            error:reject,
        })
    }
} ;

module.exports = _order_service;