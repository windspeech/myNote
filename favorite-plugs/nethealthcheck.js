/**
 * @fileOverview 弱网络检测组件，不依赖其它类库
 */

;
(function(ctx) {
    var checkUrl = "http://m.1.139cm.com:8001/images/netloading.gif"; //700多字节的小图片
    //警报值
    var alertValue = 0;
    var timer;
    var fnQueue = [];
    var img;

    function refreshImg() {
        if (fnQueue.length == 0) {
            return;
        }
        var img = getImg();
        img.src = checkUrl + "?rnd=" + Math.random();
        clearTimeout(timer);
        timer = setTimeout(onTimeout, 3000);
    }

    function onLoad() {
        if (img.complete || img.width) {
            alertValue = 0;
            clearTimeout(timer);
            callFn(true);
            window.console && console.log("net check onload");
        }
    }

    function onError() {
        alertValue++;
        if (alertValue >= 2) {
            callFn(false);
        } else {
            refreshImg();
        }
        window.console && console.log("net check onerror");
    }

    function onTimeout() {
        onError();
    }

    function callFn(isSucc) {
        while (fnQueue.length > 0) {
            var fn = fnQueue.shift();
            try {
                fn(isSucc);
            } catch (e) {}
        }
        alertValue = 0;
    }

    function getImg() {
        if (!img) {
            img = new Image();
            img.id = "imgHealthCheck";
            img.onload = onLoad;
            img.onerror = onError;
        }
        return img;
    }
    ctx.NetHealthCheck = {
        check: function(fn) {
            fnQueue.push(fn);
            if (fnQueue.length == 1) {
                //没有正在检查的任务才发起刷图片
                refreshImg();
            }
        }
    };
})(window);

NetHealthCheck.check(function(isOnline) {
    if (!isOnline) {
        console.log("连接中断，请检查网络状况");
        // M139.UI.TipMessage.show("连接中断，请检查网络状况", {
        //     className: "msgRed"
        // });
    }
});
