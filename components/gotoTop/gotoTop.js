/**
 * 
 * @authors Wind (windspeech@qq.com)
 * @date    2017-06-14 16:49:34
 * @version 1.0.0
 */


/*
 * 回到顶部
 * goTop.init(btm)
 * @btm 距离底部的距离
* css
* .to-top{ bottom: 50px; position: fixed; z-index: 999; right: 0px; background-color: #939393; width: 40px; height: 40px;}
* .icon-to-top { border-color: #fff; border-width: 2px 2px 0 0; border-style: solid; display: block; width: 18px; height: 18px; transform: rotate(-45deg); margin-top: 15px;}
*/
(function($) {

    var privateObj = {
        data: {
            $top: null,
            $doc: $(document)
        },
        initData: function() {
            this.data.$top = $('<div class="to-top" style="display:none;"> <i class="icon-to-top"></i> </div>');
            this.data.$top.appendTo($(document.body));
        },
        clickEvent: function() {
            //置顶
            this.data.$top.bind('click', function(e) {
                window.scrollTo(0, 0);
                // alert(e);
                // e.preventDefault();
                // e.stopPropagation();
                return false;
            });
        },
        goToTopEvent: function(btm) {
            var windowHeight = $(window).height();
            var elementHeight = 73; //浮动窗的高度 

            var scrollTopVal = 0;
            var $header = $(".header");
            var self = this;

            function test() {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var bottomSub = 1;
                if (btm) {
                    bottomSub = btm;
                    self.data.$top.css("bottom", (bottomSub));
                }
                if (scrollTop <= 10) {
                    self.data.$top.hide();
                } else {
                    self.data.$top.show();
                }
            }
            (function() { //让requestAnimationFrame兼容各个浏览器 
                var lastTime = 0;
                var vendors = ['ms', 'moz', 'webkit', 'o'];
                for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
                }
                if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
                if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
            }());
            //隐藏与显示  
            document.onscroll = function() { //20151223修改
                requestAnimationFrame(test);
            };
        }
    };
    var app = (function() {
        function init(btm) {
            privateObj.initData();
            if (privateObj.data.$top.length > 0) {
                privateObj.clickEvent();
                privateObj.goToTopEvent(btm);
            }
        }

        return {
            init: init
        }
    })();


    window.goTop = app;
})(jQuery);
