require('page/common/header/index.js');
require('../../util/util.js');
const _util = require('../../util/util.js');
var _account_service = require('../../service/account-service.js');
var listTemplate = require('./index.string');

var accountInfo = {

    init: function () {
        this.bindEvents();
        this.loadAccountInfo();
        return this;
    },
    bindEvents: function () {
        var _this = this;
    },
    loadAccountInfo: function () {
        var _this = this;

        _account_service.getAccountInfo(

            function (res) {
                console.log(res);

                var __this = _this;

                var result = _util.renderHtml(listTemplate, { ListData: res });

                $('#Catalog').html(result);
                $('#OP_' + res.languagePreference).attr("selected", true);
                $('#OP_' + res.favouriteCategoryId).attr("selected", true);
                $('#listCheck').attr('checked', res.listOption);
                $('#bannerCheck').attr('checked', res.bannerOption);

                $('#editSubmit').on('click', function () {
                    __this.submit();
                });

            },
            function (errMsg) { });

    },
    submit: function () {
        $('#pwdMsg').hide();
        var formData = {
            username: $('#username').val(),
            password: $('#password').val(),
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            address1: $('#address1').val(),
            address2: $('#address2').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            status: "",
            zip: $('#zip').val(),
            country: $('#country').val(),
            languagePreference: $('#language').val(),
            favouriteCategoryId: $('#favouriteCategoryId').val(),
            bannerOption: document.getElementById('bannerCheck').checked?1:0,
            listOption: document.getElementById('listCheck').checked?1:0
            
        }
        console.log(document.getElementById('bannerCheck').checked);
        var validationResult = this.formValidation(formData);
        if (validationResult.status) {
            //向服务器发送登录请求
            console.log(formData);
            _account_service.editAccount(
                $('#username').val(),
                formData,
                function (res) {
                    window.location.href = _util.getURLParam('redirect') || './catalog-main.html';
                    // _util.getURLParam('redirect');
                },
                function (errMsg) {
                    $('#pwdMsg').show().text(errMsg);
                }
            )
        } else {
            $('#pwdMsg').show().text(validationResult.msg);
        }
    },
    formValidation: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_util.validateField('require', formData.username)) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_util.validateField('require', formData.password)) {
            result.msg = '密码不能为空';
            return result;
        }
        if (formData.password != $('#repeatedPassword').val()) {
            result.msg = '两次输入密码不同';
            return result;
        }
        //校验通过
        result.status = true;
        result.msg = '校验通过';
        return result;
    }

};

module.exports = accountInfo.init();