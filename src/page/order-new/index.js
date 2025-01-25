require('page/common/header/index.js');
const _util = require("util/util");
const $ = require('jquery');

const _account_service = require('service/account-service');
const _order_service = require('service/order-service');
const listTemplate = require('./index.string');


const newOrder = {
    username:'',
    init: function () {
        this.getAccountInfo();
        return this;
    },
    getAccountInfo:function (){
        const _this=this;
        _account_service.checkLogin(
            function (res) {
                newOrder.username=res.username;
                $('#account-firstName').val(res.firstName);
                $('#account-lastName').val(res.lastName);
                $('#account-address1').val(res.address1);
                $('#account-address2').val(res.address2);
                $('#account-city').val(res.city);
                $('#account-state').val(res.state);
                $('#account-zip').val(res.zip);
                $('#account-country').val(res.country);
                newOrder.bindEvents();
            },
            function (errMsg) {
                window.location.href = _util.getURLParam('redirect') || './account-login.html';
            }
        );
    },
    bindEvents: function () {
        $('#orderMsg').hide();
        $(function (){
            $('#submit').bind('click',function (){
                const date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                let data = {};
                data.orderDate=year.toString()+'-'+month.toString()+'-'+day.toString();
                data.shipAddress1=$('#account-address1').val();
                data.shipAddress2=$('#account-address2').val();
                data.shipCity=$('#account-city').val();
                data.shipState=$('#account-state').val();
                data.shipZip=$('#account-zip').val();
                data.shipCountry=$('#account-country').val();
                data.shipToFirstName=$('#account-firstName').val();
                data.shipToLastName=$('#account-lastName').val();
                data.billAddress1=$('#billAddress1').val();
                data.billAddress2=$('#billAddress2').val();
                data.billCity=$('#billCity').val();
                data.billState=$('#billState').val();
                data.billZip=$('#billZip').val();
                data.billCountry=$('#billCountry').val();
                data.billToFirstName=$('#billToFirstName').val();
                data.billToLastName=$('#billToLastName').val();
                data.creditCard=$('#creditCard').val();
                data.expiryDate=$('#expiryDate').val();
                data.cardType=$('#cardType').val();
                const result = _util.renderHtml(listTemplate, {data: data});
                $('#Catalog').html(result);
                $(function (){
                    $('#confirm').bind('click',function (){
                        _order_service.insertOrder(newOrder.username,data,
                            function (res){
                                window.location.href = _util.getURLParam('redirect') || './order-orderList.html';
                                $('body').html(res);
                            },
                            function (errMsg){
                                $('#orderMsg').show().text(errMsg);
                            }
                            );
                    })
                })
            });
        })
    },
};

module.exports = newOrder.init();