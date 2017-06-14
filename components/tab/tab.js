/**
 * 
 * @authors Wind (windspeech@qq.com)
 * @date    2017-06-14 17:41:03
 * @version 1.0.0
 */
/**
 * 切换卡
 * param @cls组件容器，以jc-开头
 * param @current,当前显示类，默认以jc-开头
 */

(function($) {
	function getUrlParam(name, url) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        if (!!url) {
            if (url.indexOf('?') > 1) {
                url = url.substr(url.indexOf('?') + 1);
            }
        }
        var r = (url ? url : window.location.search.substr(1)).match(reg);
        if (r !== null) {
            return decodeURI(r[2]);
        }
        return null;
    }
	function tab(cls, current) {
	    var cls = /^jc-/.test(cls) ? cls : 'jc-' + cls;
	    // 判断是否传值触发器选择类，如没采用默认值（用于处理内嵌选项卡）
	    var current = current ? /^jc-/.test(current) ? current : current : 'jc-current';
	    if ($('.' + cls).length) {
	        $('.' + cls).each(function(i, el) {
	            var type = getUrlParam('tab-type'),
	                i = type ? Number(type) : 0,
	                $container = $(el).find('.' + cls + '-container .' + cls + '-container-item'),
	                $trigger = $(el).find('.' + cls + '-trigger .' + cls + '-trigger-item');
	            $container.addClass('c_hide');
	            if (type) $trigger.removeClass(current);
	            $trigger.each(function(index, ele) {
	                if (!type && $(ele).hasClass(current)) i = index;
	                $(ele).click(function() {
	                    if ($(ele).attr('data-noclick') == 'true') return;
	                    if ($trigger.hasClass(current)) {
	                        $trigger.removeClass(current);
	                    }
	                    $(ele).addClass(current);
	                    if ($container.eq(index).hasClass('c_hide')) {
	                        $container.addClass('c_hide');
	                        $container.eq(index).removeClass('c_hide');
	                    }
	                });
	            });
	            $container.eq(i).removeClass('c_hide');
	            $trigger.eq(i).addClass(current);
	        });
	    }
	};
	window.TAB = tab;
})(jQuery);
