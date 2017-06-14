/**
 * 
 * @authors Wind (windspeech@qq.com)
 * @date    2017-06-14 16:49:34
 * @version 1.0.0
 */


 /**
 * @wSlide轮播插件
 * @调用方法 $(".js-slide").wSlide({ switchBtn: "controlNum", effect: "fade", autoPlay: true, speed: 4, title: false }); 
 * <div class="js-slide">
 * 	<div class="slide-inner">
 * 		<div class="slide-item">1</div>
 * 		<div class="slide-item">2</div>
 * 	</div>
 * </div>
 *
 */

(function($) {
    $.fn.extend({
        wSlide: function(o) {
            var defaults = $.extend({
                switchBtn: '', // 按钮方案：controlNum【数字按钮】 controlImg【图像按钮】 controlPlayer【播放器按钮】 controlSwitch【上一张下一张按钮】
                effect: '', // 切换效果：auto【无过度效果】 fade【渐隐过度】 TBslide【上下翻页】 LRslide【左右翻页】
                autoPlay: true, // 是否自动播放 true/false
                speed: 3, // 播放速度【秒】
                title: true, // 是否显示标题 true/false
                indexNum: false, // 是否显示序号
                slideEvent: function() {} // 滚动前触发事件
            }, o || {});

            return $(this).each(function() {
                var slideWrap = $(this);
                var slideList = $(this).find('.slide-inner'); // 轮播list
                var width = slideList.outerWidth(); // 轮播宽
                var height = slideList.outerHeight(); // 轮播高
                var slideItem = slideList.children(); // 轮播Item
                var itemLen = slideItem.size(); // 轮播图片数量
                var autoBtnProgram = null; // 按钮方案变量
                var autoEffectProgram = null; // 切换效果方案变量
                var imgPlayIndex = 0; // 图片轮播index
                var autoPlay = null; // 自动播放延时器
                var playMethod = null; // 图片播放方向公共变量【用于判断播放方向以变换图片切换方式】
                if (itemLen === 0) {
                    return false; }

                var autoStart = function() {
                    clearInterval(autoPlay);
                    defaults.autoPlay ? autoPlay = setInterval(nextSlide, defaults.speed * 1000) : autoPlay = null;
                };

                var autoEnd = function() {
                    clearInterval(autoPlay);
                    autoPlay = null;
                };

                /**
                 * 轮播公共按钮事件绑定数组
                 * {
                 *     element: '所要处理的按钮节点的集合',
                 *     events: '当图片轮播imgPlayIndex改变时执行的函数'
                 * }
                 */
                var controlEventArr = [];

                /**
                 * 按钮方案
                 * 支持自定义添加新的方案
                 * 可绑定的事件【nextSlide】// 下一张图片【prevSlide】// 上一张图片【showIndex】// 跳至指定index图片
                 */
                var btnStyle = function() {
                    /**
                     * 数字按钮
                     */
                    var controlNum = function() {
                        var btnWrap = $('<div>'); // 按钮包围层
                        btnWrap.addClass('slide-trigger slide-trigger-num').appendTo(slideWrap);

                        for (var i = 0; i < itemLen; i++) {
                            var a = $('<a href="javascript:;"></a>');
                            a.addClass('slide-trigger-item icon-slide-trigger').html(i + 1);
                            (function(i) {
                                a.mouseover(function() {
                                    autoStart();
                                    showIndex(i);
                                });
                            })(i);
                            btnWrap.append(a);
                        }

                        // 添加轮播公共事件
                        controlEventArr.push({
                            element: btnWrap.children(),
                            events: function(i, o) {
                                btnWrap.children().removeClass('slide-trigger-item-current');
                                $(o).addClass('slide-trigger-item-current');
                            }
                        });
                    };

                    /**
                     * 图像按钮
                     */
                    var controlImg = function() {
                        var btnWrap = $('<div>'); // 按钮包围层
                        btnWrap.addClass('slide-trigger slide-trigger-img').appendTo(slideWrap);

                        slideItem.each(function(i) {
                            var _self = $(this);
                            var img = _self.find('img').clone();
                            var a = $('<a href="javascript:;"></a>');
                            a.html(img);
                            (function(i) {
                                a.mouseover(function() {
                                    autoStart();
                                    showIndex(i);
                                });
                            })(i);
                            btnWrap.append(a);
                        });
                        // 添加轮播公共事件
                        controlEventArr.push({
                            element: btnWrap.children(),
                            events: function(i, o) {
                                btnWrap.children().removeClass('slide-trigger-item-current');
                                $(o).addClass('slide-trigger-item-current');
                            }
                        });
                    };

                    /**
                     * 播放器按钮
                     */
                    var controlPlayer = function() {
                        var btnWrap = $('<div>'); // 按钮包围层
                        btnWrap.addClass('slide-trigger slide-trigger-player').appendTo(slideWrap);

                        var prevBtn = $('<a href="javascript:;" class="button-player-prev"></a>');
                        var nextBtn = $('<a href="javascript:;" class="button-player-next"></a>');
                        var playBtn = $('<a href="javascript:;" class="button-play"></a>');
                        prevBtn.click(function() {
                            autoStart();
                            prevSlide();
                        });
                        nextBtn.click(function() {
                            autoStart();
                            nextSlide();
                        });
                        playBtn.each(function() {
                            if (defaults.autoPlay) {
                                this.className = 'button-pause';
                            } else {
                                this.className = 'button-play';
                            }
                            $(this).click(function() {
                                if (defaults.autoPlay) {
                                    defaults.autoPlay = false;
                                    this.className = 'button-play';
                                } else {
                                    defaults.autoPlay = true;
                                    this.className = 'button-pause';
                                }
                                autoStart();
                            });
                        });
                        btnWrap.append(prevBtn, playBtn, nextBtn);
                    };

                    /**
                     * 上一张下一张按钮
                     */
                    var controlSwitch = function() {
                        var btnWrap = $('<div>'); // 按钮包围层
                        btnWrap.addClass('slide-trigger slide-trigger-switch').appendTo(slideWrap);

                        var prevBtn = $('<a href="javascript:;" class="button-prev icon-button"></a>');
                        var nextBtn = $('<a href="javascript:;" class="button-next icon-button"></a>');

                        prevBtn.click(function() {
                            autoStart();
                            prevSlide();
                        });
                        nextBtn.click(function() {
                            autoStart();
                            nextSlide();
                        });
                        btnWrap.append(prevBtn, nextBtn);
                    };

                    /**
                     * 根据设置返回相应的按钮方案
                     */
                    return function() {
                        var btnStyleArr = defaults.switchBtn.split(' ');
                        for (var i = 0, len = btnStyleArr.length; i < len; i++) {
                            switch (btnStyleArr[i]) {
                                case 'controlNum':
                                    controlNum();
                                    break;
                                case 'controlImg':
                                    controlImg();
                                    break;
                                case 'controlPlayer':
                                    controlPlayer();
                                    break;
                                case 'controlSwitch':
                                    controlSwitch();
                                    break;
                            }
                        }
                    };

                };

                /**
                 * 切换效果方案
                 * 支持自定义添加新的方案
                 * showImg:将要显示的图片
                 * hideImg:将要隐藏的图片
                 */
                var effect = function() {
                    /**
                     * 无过度效果
                     */
                    var auto = function(showImg, hideImg) {
                        showImg.show();
                        hideImg.hide();
                    };

                    /**
                     * 渐隐过度
                     */
                    var fade = function(showImg, hideImg) {
                        showImg.add(hideImg).stop(true, true);
                        showImg.fadeIn(500);
                        hideImg.fadeOut(500);
                    };

                    /**
                     * 上下翻页
                     */
                    var TBslide = function(showImg, hideImg) {
                        var prevSlide = function() {
                            showImg.add(hideImg).stop(true, true);
                            showImg.css('zIndex', 1);
                            hideImg.css('zIndex', 0);
                            showImg.show().css('top', '100%').stop().animate({ 'top': 0 }, 500, function() {
                                hideImg.hide();
                            });
                        };
                        var nextSlide = function() {
                            showImg.add(hideImg).stop(true, true);
                            showImg.css('zIndex', 0).show();
                            hideImg.css('zIndex', 1);
                            hideImg.stop().animate({ 'top': '-100%' }, 500, function() {
                                hideImg.hide().css('top', 0);
                            });
                        };

                        if (playMethod == 'prevSlide') {
                            prevSlide();
                        } else {
                            nextSlide();
                        }
                    };

                    /**
                     * 左右翻页
                     */
                    var LRslide = function(showImg, hideImg) {
                        var nextSlide = function() {
                            showImg.add(hideImg).stop(true, true);
                            showImg.add(hideImg).stop();
                            showImg.show().css('left', '100%');
                            showImg.animate({ 'left': 0 }, 500);
                            hideImg.animate({ 'left': '-100%' }, 500, function() {
                                hideImg.hide().css('left', 0);
                            })
                        };
                        var prevSlide = function() {
                            showImg.add(hideImg).stop(true, true);
                            showImg.add(hideImg).stop();
                            showImg.show().css('left', '-100%');
                            showImg.animate({ 'left': 0 }, 500);
                            hideImg.animate({ 'left': '100%' }, 500, function() {
                                hideImg.hide().css('left', 0);
                            });
                        };

                        if (playMethod == 'prevSlide') {
                            prevSlide();
                        } else {
                            nextSlide();
                        }
                    };

                    /**
                     * 根据设置返回相应的切换效果方案
                     */
                    switch (defaults.effect) {
                        case 'auto':
                            return auto;
                            break;
                        case 'fade':
                            return fade;
                            break;
                        case 'TBslide':
                            return TBslide;
                            break;
                        case 'LRslide':
                            return LRslide;
                            break;
                        default:
                            return fade;
                    }
                };

                /**
                 * 播放设置
                 */
                // 轮播效果总控【按钮样式】【标题显示】...
                var slideControl = function(method) {
                    playMethod = method;
                    $.each(controlEventArr, function(i, o) {
                        o.element.eq(imgPlayIndex).each(o.events);
                    });
                };

                // 显示标题
                var showTitle = function() {
                    if (defaults.title) {
                        var titleWrap = $('<div>');
                        titleWrap.addClass('slide-title').appendTo(slideWrap);

                        slideItem.each(function() {
                            var title = $(this).attr('alt') || $(this).find('img').attr('alt') || '';
                            var p = $('<p>');
                            p.html(title).appendTo(titleWrap);
                        });

                        // 添加轮播公共事件
                        controlEventArr.push({
                            element: titleWrap.children(),
                            events: function(i, o) {
                                titleWrap.children().hide();
                                $(o).show();
                            }
                        });
                    } else {
                        return true;
                    }
                };

                // 显示播放序号/总数
                var showIndexNum = (function() {
                    if (defaults.indexNum) {
                        var numberEle = $('<div class="slide-trigger slide-trigger-number"></div>');
                        numberEle.appendTo(slideWrap);
                        return function() {
                            numberEle.text((imgPlayIndex + 1) + '/' + itemLen).appendTo(slideWrap);
                        };
                    } else {
                        return function() {};
                    }
                })();

                // 下一张
                var nextSlide = function() {
                    var hideImg = slideItem.eq(imgPlayIndex);
                    imgPlayIndex++;
                    if (imgPlayIndex >= itemLen) {
                        imgPlayIndex = 0;
                    }
                    var showImg = slideItem.eq(imgPlayIndex);
                    slideControl('nextSlide');
                    showIndexNum();
                    defaults.slideEvent(showImg, hideImg);
                    autoEffectProgram(showImg, hideImg);
                };

                // 上一张
                var prevSlide = function() {
                    var hideImg = slideItem.eq(imgPlayIndex);
                    imgPlayIndex--;
                    if (imgPlayIndex < 0) {
                        imgPlayIndex = itemLen - 1;
                    }
                    var showImg = slideItem.eq(imgPlayIndex);
                    slideControl('prevSlide');
                    showIndexNum();
                    defaults.slideEvent(showImg, hideImg);
                    autoEffectProgram(showImg, hideImg);
                };

                // 指定查看
                var showIndex = function(index) {
                    if (index === imgPlayIndex) {
                        return true;
                    }
                    var hideImg = slideItem.eq(imgPlayIndex);
                    var showImg = slideItem.eq(index);
                    imgPlayIndex = index;
                    slideControl('showIndex');
                    showIndexNum();
                    defaults.slideEvent(showImg, hideImg);
                    autoEffectProgram(showImg, hideImg);
                };

                // 初始化
                var init = function() {
                    slideWrap.hover(autoEnd, autoStart);
                    slideItem.css({
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }).hide().eq(imgPlayIndex).show();

                    if (itemLen > 1) {
                        autoEffectProgram = effect(); // 切换效果方案
                        autoBtnProgram = btnStyle(); // 按钮方案
                        autoBtnProgram();
                    } else {
                        autoEffectProgram = function() {};
                    }
                    showTitle(); // 显示标题
                    showIndexNum(); // 显示播放序号/总数
                    slideControl('nextSlide');
                    autoStart(); // 自动播放
                };
                init();
            });
        }
    });
})(jQuery);
