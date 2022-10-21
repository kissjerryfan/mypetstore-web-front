require('page/common/header/index.js');
require('../../util/util.js');
require('./index.css');

var _account_service = require('service/account-service.js');
var $ = require('jquery');
const _util = require('../../util/util.js');

var userLogin = {
    init :function(){
        $('#loginMsg').hide();
        this.bindEvents();
        return this;
    },
    bindEvents : function(){
        var _this=this;
        $('#submit').on("click",function(){
            _this.submit();
        });
        $('#3').on("click",function(){
            window.location.href='https://openauth.alipaydev.com/oauth2/appToAppAuth.htm?app_id=2021000119641159&redirect_uri=http://localhost:8089/alipay/auth';
        });
    },
    submit : function(){
        var formData = {
            username : $('#username').val(),
            password : $('#password').val()
        }
        var validationResult = this.formValidation(formData);
        if(validationResult.status){
            //向服务器发送登录请求
            _account_service.login(
                formData,
                function(res){
                    window.location.href = _util.getURLParam('redirect') || './catalog-main.html';
                    // _util.getURLParam('redirect');
                },
                function(errMsg){
                    $('#loginMsg').show().text(errMsg);
                }
                )
        }else{
            $('#loginMsg').show().text(validationResult.msg);
        }
    },
    // submit3 : function(){
    //     //向服务器发送登录请求
    //     _account_service.login3(
    //         function(res){
    //             window.location.href = _util.getURLParam('redirect') || './catalog-main.html';
    //             // _util.getURLParam('redirect');
    //         },
    //         function(errMsg){
    //             alert(errMsg);
    //         }
    //         )
    // },
    formValidation : function(formData){
        var result = {
            status : false,
            msg    : ''
        };
        if(!_util.validateField('require',formData.username)){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_util.validateField('require',formData.password)){
            result.msg = '密码不能为空';
            return result;
        }
        //校验通过
        result.status = true;
        result.msg = '校验通过';
        return result;
    }
};

module.exports = userLogin.init();