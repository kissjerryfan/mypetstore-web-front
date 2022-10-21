require('page/common/header/index.js');
var _account_service = require('service/account-service.js');

var catalogMain = {
    init :function(){
        this.bindEvents();
        this.loadAccountInfo();
        return this;
    },
    bindEvents : function(){
    },
    loadAccountInfo : function(){
        _account_service.checkLogin(
            function(res){
                $('#WelcomeContent').text('欢迎您,' + res.username + '用户！');
            },
            function(errMsg){
                $('#WelcomeContent').text('');
            }
        );
    }
};

module.exports = catalogMain.init();