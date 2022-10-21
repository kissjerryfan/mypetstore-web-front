require('page/common/header/index.js');
require('../../util/util.js');
require('./index.css');

var _account_service = require('service/account-service.js');
var $ = require('jquery');
const _util = require('../../util/util.js');

var userRegister = {
    init :function(){
        $('#pwdMsg').hide();
        this.bindEvents();
        return this;
    },
    bindEvents : function(){
        var _this=this;
        $('#submit').on("click",function(){
            _this.submit();
        });
    },
    submit : function(){
        $('#pwdMsg').hide();
        var formData = {
            username : $('#username').val(),
            password : $('#password').val()
        }
        var validationResult = this.formValidation(formData);
        if(validationResult.status){
            //向服务器发送登录请求
            console.log(formData);
            _account_service.register(
                formData,
                function(res){
                    window.location.href = _util.getURLParam('redirect') || './catalog-main.html';
                    // _util.getURLParam('redirect');
                },
                function(errMsg){
                    $('#pwdMsg').show().text(errMsg);
                }
                )
        }else{
            $('#pwdMsg').show().text(validationResult.msg);
        }
    },
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
        if(formData.password != $('#repeatedPassword').val()){
            result.msg = '两次输入密码不同';
            return result;
        }
        //校验通过
        result.status = true;
        result.msg = '校验通过';
        return result;
    }
};

module.exports = userRegister.init();