;(function() {
	var Tool = {
        // 判断是否为空
        isEmpty: function(v, allowBlank) {
            return v === null || v === undefined || ((Tool.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
        },
        isPrimitive: function(v) {
            return this.isString(v) || this.isNumber(v) || this.isBoolean(v);
        },
        // 判断是否是对象
        isObject: function (v) {
            return !!v && Object.prototype.toString.call(v) === '[object Object]';
        },
        // 判断是否是字符串
        isString: function (v) {
            return typeof v === 'string';
        },
        // 判断是否是数字
        isNumber: function (v) {
            return typeof v === 'number';
        },
        // 判断是否是日期
        isDate: function (v) {
            return v instanceof Date;
        },
        // 判断是否是数组
        isArray: function (v) {
            return v instanceof Array;
        },
        // 判断是否是boolean值
        isBoolean: function (v) {
            return typeof v === 'boolean';
        },
        // 判断是否是函数
        isFunction: function (v) {
            return typeof v === 'function';
        },
        // 判断是否是日期
        isDate: function(v) {
            return toString.call(v) === "[object Function]"
        },
        isElement: function(v) {
            return v ? !!v.tagName : false;
        },
        isDefined: function(v) {
            return typeof v !== 'undefined';
        }

    }
    window.AID = window.TOOL = Tool;
})();