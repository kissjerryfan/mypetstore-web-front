require('./index.css');
var _account_service = require('service/account-service.js');
var $ = require('jquery');
const _catalog_service = require('../../../service/catalog-service');

var header = {
    // username : 'abcdefg',
    init :function(){
        this.bindEvents();
        this.loadAccountInfo();
        return this;
    },
    bindEvents : function(){
        $("#signout-btn").on("click",function(){
            _account_service.logout(
                function(res){
                    window.location.replace('./catalog-main.html');
                },
                function(errMsg){
                    alert("退出失败");
                }
            );
        });

        $("#searchButton").on("click",function(){
            var formData = {
                key : $('#searchText').val()||''
            }
            console.log(formData.key);
            _catalog_service.searchByKey(formData,
                function(res){
                window.location.href = 'http://localhost:8888/view/catalog-search.html?key='+formData.key;
                console.log(res);
                }),
                function(err){
                    console.log('请求失败');
                }
            
        });

        $('#cart').on("click",function(){
            _account_service.checkLogin(
                function(res){
                    window.location.href = 'http://localhost:8888/view/cart.html'
                },
                function(errMsg){
                    window.location.href = 'http://localhost:8888/view/account-login.html'
                }
            )
        })

        

    },
    loadAccountInfo : function(){
        var _this = this;
        _account_service.checkLogin(
            function(res){
                // _this.username=res.username;
                $('#signout-btn').show();
                $('.signIn').hide();
                $('.sep').show();
                $('.myAccount').show();
            },
            function(errMsg){
                // console.log("Error...");
            }
        )
    }
};

module.exports = header.init();