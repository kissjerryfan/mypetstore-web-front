var _util = require('util/util.js');

var _account_service = {
    checkLogin : function(resolve, reject){
        _util.request({
            url     : _util.getServerURL('account/get_login_account_info'),
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },
    login : function(account, resolve, reject){
        _util.request({
            url     : _util.getServerURL('account/login'),
            data    : account,
            method  : 'POST',   
            success : resolve,
            error   : reject,
        });
    },
    logout : function(resolve, reject){
        _util.request({
            url     : _util.getServerURL('account/logout'),
            method  : 'POST',   
            success : resolve,
            error   : reject,
        });
    },
    login3 : function(resolve, reject){
        _util.request({
            url     : _util.getServerURL('alipay/auth'),
            method  : 'GET', 
            success : resolve,
            error   : reject,
        });
    },  

    register : function(account, resolve, reject) {
        _util.request({
            url     : _util.getServerURL('account/register'),
            data    : account,
            method  : 'POST',   
            success : resolve,
            error   : reject,
        });
    },
    getAccountInfo : function(resolve, reject) {
        _util.request({
            url     : _util.getServerURL('account/get_login_account_info'),
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    },
    editAccount : function(id, account, resolve, reject) {
        _util.request({
            url     : _util.getServerURL('account/edit/' + id),
            data    : account,
            method  : 'POST',
            success : resolve,
            error   : reject,
        });
    }
};

module.exports = _account_service;