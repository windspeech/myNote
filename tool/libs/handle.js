;
(function() {
    var Handle = {
        isIE: !/opera/.test(navigator.userAgent.toLowerCase()) && /msie/.test(navigator.userAgent.toLowerCase()),
        // 请求文件
        loadFile: function(url, cb, noFile) {
            var dataType = {
                js: 'script',
                txt: 'text',
                css: 'text',
                tpl: 'html',
                html: 'html',
                xml: 'xml',
                json: 'json'
            };
            $.ajax({
                async: false,
                url: url,
                dataType: dataType[url.split('.')[url.split('.').length - 1]],
                success: function(data) {
                    cb && cb(data);
                },
                statusCode: {
                    404: noFile
                }
            });
        },
        /* 获取浏览器参数
         *  @param name 获取目标值key
         *  @param url 为空时获取当前页面url
         */
        getUrlParam: function(name, url) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
            if (!AID.isEmpty(url)) {
                if (url.indexOf('?') > 1) {
                    url = url.substr(url.indexOf('?') + 1);
                }
            }
            var r = (url ? url : window.location.search.substr(1)).match(reg);
            if (r !== null) {
                return decodeURI(r[2]);
            }
            return null;
        },
        /* 
         * url 目标url 
         * arg 需要替换的参数名称 
         * arg_val 替换后的参数的值 
         * return url 参数替换后的url 
         */
        changeURLArg: function(url, arg, arg_val) {
            var pattern = arg + '=([^&]*)';
            var replaceText = arg + '=' + arg_val;
            if (url.match(pattern)) {
                var tmp = '/(' + arg + '=)([^&]*)/gi';
                tmp = url.replace(eval(tmp), replaceText);
                return tmp;
            } else {
                if (url.match('[\?]')) {
                    return url + '&' + replaceText;
                } else {
                    return url + '?' + replaceText;
                }
            }
            return url + '\n' + arg + '\n' + arg_val;
        },
        loadScript: function(packObj, callback) {
            if (packObj.loaded) { //已加载过
                callback();
            } else {
                var jsVersion = getResourceVersion(packObj.src) || (new Date()).dateFormat("yyyyMMdd");
                var param = {
                    id: packObj.key,
                    src: SiteConfig.rpath + packObj.src + "?v=" + jsVersion,
                    charset: "utf-8"
                };
                if (packObj.failed) {
                    param.src += "&rnd=" + Math.random();
                }
                var timerId;
                Handle.creatScript(param,
                    function(success) {
                        if (success == false) {
                            packObj.failed = true
                            var msg = "ScriptLoadError!" + param.src + "!RequireJs加载脚本失败";
                            LOG.log("error", msg );
                            return;
                        }
                        window.clearTimeout(timerId); //清除加载失败检测timer
                        packObj.loaded = true;
                        !packObj.invoked && callback(); //避免重试后，原来的脚本又加载成功造成两次回调
                    }
                );

                timerId = window.setTimeout(function() { //检测加载失败后重试一次
                    packObj.failed = true;
                    param.src += "&timeout=1";
                    Handle.creatScript(param,
                        function(success) {
                            if (success == false) {
                                var msg = "ScriptLoadError!" + param.src + "!重试加载失败！！";
                                LOG.log("error", msg );
                                return;
                            }
                            packObj.loaded = true;
                            packObj.invoked = true; //已执行标记
                            callback();
                        }
                    );
                    var msg = "ScriptLoadError!" + param.src + "!RequireJs加载脚本超时，自动重试1次";
                    LOG.log("error", msg);
                }, 4000);

            }
        },
        /**
        *动态加载script标签
        *@param {Object} options 配置
        *@param {Stirng} options.id script标签的id ; 
        *@param {Stirng} options.src JS文件地址（完整路径）; 
        *@param {Stirng} options.charset 给script标签加charset属性
        *@param {Function} callback 加载完成的回调
        *@example
        *creatScript(
             {
                id:"examplejs",
                src:"http://images.139cm.com/m2012/richmail/js/example.js",
                charset:"utf-8"
             },
             function(){
                 alert("文件加载完毕");
             }
        *);
        */
        creatScript: function(options, callback) {
            var This = this;
            if (callback) {
                var _callback = callback;
                var callback = function(e) {
                    _callback.call(This, e);
                }
            }
            var scriptId = options.id;
            var dataHref = options.src;
            var charset = options.charset;
            var isReady = false;
            var head = document.getElementsByTagName("head")[0];
            var objScript = scriptId && document.getElementById(scriptId);
            //是否移出脚本DOM(非IE9时处理)
            var isRemoveScriptDom = !document.all && true || false,
                browserVersion = ["trident/7.0", "msie 10.0", "msie 9.0", "chrome", "firefox"],
                i = 0,
                bvLenght = browserVersion.length - 1,
                currVersion = window.navigator.userAgent.toLowerCase() || "";
            //IE9、chrome、firefox时处理
            while (i <= bvLenght) {
                isRemoveScriptDom = currVersion.indexOf(browserVersion[i]) > -1 && true || false;
                if (isRemoveScriptDom) {
                    break;
                }
                i++;
            }
            browserVersion = null;
            try {
                if (objScript && isRemoveScriptDom) {
                    objScript.src = "";
                    objScript.parentNode.removeChild(objScript);
                    objScript = null;
                }
            } catch (e) {}
            if (objScript != null) {
                if (dataHref.indexOf("?") == -1) dataHref += "?";
                dataHref += "&" + Math.random();
                objScript.src = dataHref;
                var dataScript = objScript;
            } else {
                var dataScript = document.createElement("script");
                if (scriptId) {
                    dataScript.id = scriptId;
                }
                if (charset) {
                    dataScript.charset = charset;
                }
                dataScript.src = dataHref;
                dataScript.defer = true;
                dataScript.type = "text/javascript";
                head.appendChild(dataScript);
            }
            if (document.all) {
                dataScript.onreadystatechange = function() {
                    if (dataScript.readyState == "loaded" || dataScript.readyState == "complete") {
                        isReady = true;
                        if (callback) callback();
                    }
                }
            } else {
                dataScript.onload = function() {
                    isReady = true;
                    if (callback) callback();
                }
                dataScript.onerror = function() {
                    isReady = true;
                    if (callback) callback(false);
                }
            }
        },
        // 动态添加css到页面头部style
        addStyle: function(code) {
            code += '\n';
            var head = document.getElementsByTagName("head")[0];
            var styles = head.getElementsByTagName("style");
            if (styles.length == 0) { //如果不存在style元素则创建
                if (document.createStyleSheet) { //ie
                    document.createStyleSheet();
                } else {
                    var s = document.createElement('style'); //w3c
                    s.setAttribute("type", "text/css");
                    head.appendChild(s);
                }
            }
            var style = styles[0];
            style.setAttribute('type', 'text/css');
            if (style.styleSheet) { // ie
                style.styleSheet.cssText += code;
            } else if (document.getBoxObjectFor) {
                styleElement.innerHTML += code; // FF
            } else {
                style.appendChild(document.createTextNode(code));
            }
        },
        // 网络检测
        netCheck: function() {
            NetHealthCheck.check(function(isOnline) {
                if (!isOnline) {
                    var ele = document.createElement('span');
                    ele.setAttribute('id', 'tipmsg');
                    ele.setAttribute('class', 'netWorkMsg netWorkTip');
                    ele.innerHTML = '连接中断，请检查网络状况';
                    document.getElementsByTagName("body")[0].appendChild(ele);
                    return false;
                }
            });
            return true;
        },
        // Json转Array
        encodeJsonDataToArray: function(data) {
            var arr = [];
            for (i in data) {
                arr.push(data[i]);
            }
            return arr;
        },
        // url特殊字符转码
        htmlDecode: function(url) {
            if (typeof url != "string")
                return "";
            var map = html_decodes = {
                '&amp;': '&',
                '&quot;': '"',
                '&lt;': '<',
                '&gt;': '>',
                "&nbsp;": " ",
                "&#39;": "'"
            };
            //多个replace会有bug
            return url.replace(/(&quot;|&lt;|&gt;|&amp;|&nbsp;|&#39;)/g, function(str, item) {
                return map[item];
            });
            return url;
        },
        /**
         * html编码<br>
         * "<" -> &lt; <br>
         * ">" -> &gt; <br>
         * @return {string} html编码以后的字符串
         */
        encodeHTML: function(s) {

            if (typeof(s) !== "string") return '';

            s = s.replace(/&/g, "&amp;");
            s = s.replace(/</g, "&lt;");
            s = s.replace(/>/g, "&gt;");
            s = s.replace(/\"/g, "&quot;");
            s = s.replace(/ /g, "&nbsp;");
            s = s.replace(/\'/g, "&#39;");
            return s;
        },
        //对比两个对象是否一模一样
        isEqual: function(x, y) {
            if (x === y) {
                return true;
            }
            if (!(x instanceof Object) || !(y instanceof Object)) {
                return false;
            }
            if (x.constructor !== y.constructor) {
                return false;
            }
            for (var p in x) {
                if (x.hasOwnProperty(p)) {
                    if (!y.hasOwnProperty(p)) {
                        return false;
                    }
                    if (x[p] === y[p]) {
                        continue;
                    }
                    if (typeof(x[p]) !== "object") {
                        return false;
                    }
                    if (!this.isEqual(x[p], y[p])) {
                        return false;
                    }
                }
            }

            for (p in y) {
                if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                    return false;
                }
            }
            return true;
        },
        getCookie: function(name) {
            var arr = null;
            arr = document.cookie.match(new RegExp("(^|\\W)" + name + "=([^;]*)(;|$)"));
            if (arr != null) return unescape(arr[2]);
            return "";
        },
        /**
         *@param {Object} options 参数配置
         *@param {String} options.name cookie的名称
         *@param {String} options.value cookie的值
         *@param {String} options.domain cookie访问权限域名，默认为当前域名
         *@param {String} options.path 默认为 /
         *@param {Date} options.expires 如果不设置，则默认为会话cookie
         *@returns {void}
         */
        setCookie: function(options) {
            var name = options.name;
            var value = options.value;
            var path = options.path || "/";
            var domain = options.domain;
            var expires = options.expires;
            var exdate = new Date()
            exdate.setDate(exdate.getDate() + expires)
            var str = name + "=" + escape(value) + "; ";
            str += "path=" + path + "; ";
            if (domain) str += "domain=" + domain + "; ";
            if (expires) str += "expires=" + exdate.toGMTString() + "; ";
            document.cookie = str;
        },
        getScrollTop: function() {
            return document.documentElement.scrollTop || document.body.scrollTop;
        },
        getClientHeight: function() {
            return document.documentElement.clientHeight;
        },
        temp: function(source, data) {
            return template.compile(source)(data)
        },
        easeout: function (A, B, rate, cb) {
            if (A === B || typeof A != 'number') {
                return;
            }
            B = B || 0;
            rate = rate || 2;

            var step = function () {
                A = A + (B - A) / rate;

                if (A < 1) {
                    cb(B, true);
                    return;
                }
                cb(A, false);
                this.requestAnimationFrame(step);
            };
            step();
        },
        requestAnimationFrame: function() {
            if (!window.requestAnimationFrame) {
                requestAnimationFrame = function(fn) {
                    setTimeout(fn, 17);
                }
            }
        }

    }
    window.H = window.HAND = Handle;
})();
