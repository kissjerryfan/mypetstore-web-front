var Hogan = require('hogan.js');

var config = {
    serverHost : 'http://localhost:8089/'
}

var _util = {

    request : function(param){
        var _this=this;//把_util的this存在_this里
        $.ajax({
            type        : param.method || 'GET',
            url         : param.url    || '',
            dataType    : param.type   || 'json',
            data        : param.data   || '',
            xhrFields   : {
                withCredentials : true
                //有异步请求sessionid会被带过去，不会被当作是不同的人请求，类似于token
            },
            success     : function(res){
                if(0 === res.status){
                    //登陆成功
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                else if(10 === res.status){
                    //未登录
                    _this.doLogin();
                    //后面加参数因为以后还要回退，encodeURIComponent是怕有特殊字符
                }
                else if(1 === res.status){
                    //登录失败
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(errMsg){
                //todo : 请求错误的提示
                typeof param.error === 'function' && param.error('服务器异常');
            }
        });
    },
    doLogin : function(){
        window.location.href = './account-login.html?redirect='+encodeURIComponent(window.location.href);
    },
    getServerURL : function(path){
        return config.serverHost + path;
    },
    //目前只支持非空校验
    validateField : function(fieldType, fieldValue){
        if(fieldType === 'require') {
            return !!fieldValue;
        }
        //未来可以写电话号码邮箱等等的校验
    },
    getURLParam : function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substring(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    renderHtml  : function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate);
        var result = template.render(data);
        return result;
    }
};

module.exports = _util;