require('page/common/header/index.js');
const _util = require("util/util");
const $ = require('jquery');

const _account_service = require('service/account-service');
const _order_service = require('service/order-service');

const viewOrder = {
    username: '',
    orderID: '',
    init: function () {
        this.bindEvents();
        this.loadOrder();
        return this;
    },
    bindEvents: function () {

    },
    loadOrder: function () {
        const _this = this;
        _account_service.checkLogin(
            function (res) {
                viewOrder.username = res.username;
                _this.orderID = _util.getURLParam('orderID');
                _order_service.viewOrder(_this.orderID,
                    function (res) {
                        $('#order-orderId').text(res.orderId);
                        $('#order-orderDate').text(res.orderDate);
                        $('#order-cardType').text(res.cardType);
                        $('#order-creditCard').text(res.creditCard);
                        $('#order-expiryDate').text(res.expiryDate);
                        $('#order-billToFirstName').text(res.billToFirstName);
                        $('#order-billToLastName').text(res.billToLastName);
                        $('#order-billAddress1').text(res.billAddress1);
                        $('#order-billAddress2').text(res.billAddress2);
                        $('#order-billCity').text(res.billCity);
                        $('#order-billState').text(res.billState);
                        $('#order-billZip').text(res.billZip);
                        $('#order-billCountry').text(res.billCountry);
                        $('#order-shipToFirstName').text(res.shipToFirstName);
                        $('#order-shipToLastName').text(res.shipToLastName);
                        $('#order-shipAddress1').text(res.billAddress1);
                        $('#order-shipAddress2').text(res.billAddress2);
                        $('#order-shipCity').text(res.shipCity);
                        $('#order-shipState').text(res.shipState);
                        $('#order-shipZip').text(res.shipZip);
                        $('#order-shipCountry').text(res.shipCountry);
                        $('#order-courier').text(res.courier);
                        $('#order-status').text(res.status);
                        $('#order-totalPrice').text(res.totalPrice);
                        let html = '';
                        for (let item of res.lineItemList){
                            html += `<tr>
                                <td>
                                    <a href="./catalog-detail.html?id=` + item.itemId + `&route=item">` + item.itemId + `</a>
                               </td>
                               <td>` + item.quantity + `</td>
                               <td>` + item.unitPrice + `</td>
                            </tr>`;
                        }
                        /*$.each(res.data.lineItemList,
                            function (index, value) {
                                html += `<td>
                                    <a href="./catalog-list.html?id=` + value.itemId + `&route=item">` + value.itemId + `</a>
                               </td>
                               <td>` + value.quantity + `</td>
                               <td>` + value.unitPrice + `</td>`;
                            });*/
                        $('#itemsList').append(html);
                    },
                    function (errMsg) {
                        $('#orderMsg').show().text(errMsg);
                    }
                )
            },
            function (errMsg) {
                //todo:如果用户未登录则跳转登陆界面，登陆成功后重新回到订单界面
            }
        );
    }
};

module.exports = viewOrder.init();