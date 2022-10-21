require('page/common/header/index.js');
const _util = require("util/util");
const $ = require('jquery');

const _account_service = require('service/account-service');
const _order_service = require('service/order-service');


const orderList = {
    username: '',
    init: function () {
        this.bindEvents();
        this.loadOrderList();
        return this;
    },
    bindEvents: function () {
        $('#orderMsg').hide();
    },
    loadOrderList: function () {
        var _this = this;
        _account_service.checkLogin(
            function (res) {
                _this.username = res.username;
                _order_service.viewOrderLists(_this.username,
                    function (res) {
                        //成功返回订单信息，对订单信息进行显示
                        let html = '';
                        //todo:设置查看订单跳转链接
                        for (let i=0;i<res.length;i++){
                            html += `<tr>
                                <td><a href="./order-viewOrder.html?orderID=`+res[i].orderId+`">` + res[i].orderId + `</a></td>
                                <td>` + res[i].orderDate + `</td>
                                <td>` + res[i].totalPrice + `</td>
                                </tr>`
                        }
                        $('#orderListTable').append(html);
                    },
                    function (errMsg) {
                        //服务器异常
                        $('#orderMsg').show().text(errMsg);
                    }
                );
            },
            function (errMsg) {
                //todo:如果用户未登录则跳转登陆界面，登陆成功后重新回到订单列表
            }
        );

    }
};

module.exports = orderList.init();