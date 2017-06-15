// String
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof(args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    result = result.replace(/{\w+}/g, '');
    return result;
};
/*
 * 在字符串右左边添加字符串(ch)个数
 * 字符串长度 小于 指定长度
 */
String.prototype.leftPad = function(size, ch) {
    var result = String(this);
    if (!ch) {
        ch = " ";
    }
    while (result.length < size) {
        result = ch + result;
    }
    return result;
};
/*
 * 在字符串右右边添加字符串(ch)个数
 * 字符串长度 小于 指定长度
 */
String.prototype.rightPad = function(size, ch) {
    var result = String(this);
    if (!ch) {
        ch = " ";
    }
    while (result.length < size) {
        result = result + ch;
    }
    return result;
};
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
// Array
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val)
            return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
// 对象是否在数组内
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

function isNumber(v) {
    return toString.call(v) === "[object Number]";
};
// Function
Function.prototype.createDelegate = function(scope, args, appendArgs) {
    var method = this;
    return function() {
        var callArgs = args || arguments;
        if (appendArgs === true) {
            callArgs = Array.prototype.slice.call(arguments, 0);
            callArgs = callArgs.concat(args);
        } else if (isNumber(appendArgs)) {
            callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
            var applyArgs = [appendArgs, 0].concat(args); // create method call params
            Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
        }
        return method.apply(scope || window, callArgs);
    };
};
Function.prototype.getName = function() {
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
};
Function.prototype.defer = function(millis, obj, args, appendArgs) {
    var fn = this.createDelegate(obj, args, appendArgs);
    if (millis > 0) {
        return setTimeout(fn, millis);
    }
    fn();
    return 0;
};

// Date
Date.prototype.dateFormat = function(format) {
    if (!format) {
        format = 'yyyy/MM/dd hh:mm:ss'
    }
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

//检测浏览器是否支持localStorage
// if (typeof localStorage == 'undefined') {
//     //创建localStorage
//     var localStorageClass = function() {
//         this.options = {
//             expires: 60 * 24 * 3600,
//             domain: "m.1.139cm.com"
//         }
//     }
//     localStorageClass.prototype = {
//         //初实化。添加过期时间
//         init: function() {
//             var date = new Date();
//             date.setTime(date.getTime() + 60 * 24 * 3600);
//             this.setItem('expires', date.toGMTString());
//         },
//         //内部函数 参数说明(key) 检查key是否存在
//         findItem: function(key) {
//             var bool = document.cookie.indexOf(key);
//             if (bool < 0) {
//                 return true;
//             } else {
//                 return false;
//             }
//         },
//         //得到元素值 获取元素值 若不存在则返回 null
//         getItem: function(key) {
//             var i = this.findItem(key);
//             if (!i) {
//                 var array = document.cookie.split(';')
//                 for (var j = 0; j < array.length; j++) {
//                     var arraySplit = array[j];
//                     if (arraySplit.indexOf(key) > -1) {
//                         var getValue = array[j].split('=');
//                         //将 getValue[0] trim删除两端空格
//                         getValue[0] = getValue[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '')
//                         if (getValue[0] == key) {
//                             return getValue[1];
//                         } else {
//                             return 'null';
//                         }
//                     }
//                 }
//             }
//         },
//         //重新设置元素
//         setItem: function(key, value) {
//             var i = this.findItem(key)
//             document.cookie = key + '=' + value;
//         },
//         //清除cookie 参数一个或多一
//         clear: function() {
//             for (var cl = 0; cl < arguments.length; cl++) {
//                 var date = new Date();
//                 date.setTime(date.getTime() - 100);
//                 document.cookie = arguments[cl] + "=a; expires=" + date.toGMTString();
//             }
//         }
//     }
//     var localStorage = new localStorageClass();
//     localStorage.init();
// }
