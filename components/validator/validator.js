/**
 * 
 * @authors wind (windspeech@qq.com)
 * @date    2017-04-19 10:04:53
 * @version 1.0.0
 * @当前仅input/textarea支持验证，其他需要再扩展
 * 
 */

 /**
 *
 * @调用方法 validator(formEl, boolean)
 * @formel form表单id
 * @boolean 验证错误是否聚焦
 * 
 * <div class="controls error">
 *     <input type="text" name="userName" data-rule="required">
 *	   <span class="error-text">不能为空</span>
 * </div>
 *
 */

(function() {
	// 验证规则
	var regRule = {
		integer: /^[1-9]\d*/,
		username: /^[a-z0-9_-]{3,16}$/,
		pwd: /^[a-z0-9_-]{6,18}$/,
		phone: /^13[0-9]{9}$|^15[012356789][0-9]{8}$|^178[0-9]{8}$|^170[0-9]{8}$|^177[0-9]{8}$|^176[0-9]{8}$|^18[0-9]{9}$|^14[57][0-9]{8}$|^160[0-9]{8}$/,
		email: /^([\da-z\.-]+)+@([\da-z\.-]+)\.([a-z\.]{2,6})$/
	};

	// 默认的一些描述
	// 可抽取到公共文件
	var defaults = {
		required: "不能为空",
		integer: "必须是整数",
		username: "用户名格式不正确",
		phone: "手机号码格式不正确",
		email: "邮箱格式不正确",
		pwd: "密码长度不能小于6位"
	};

	// 策略对象
	var strategys = {
		required: function(value, errorMsg) {
			if (value === '') {
				return errorMsg;
			}
		},
		// 最小长度
		minLength: function(value, length, errorMsg) {
			if (value.length < length) {
				return errorMsg;
			}
		},
		// 正则规则，统一验证规则封装
		regExpTest: function(key, value, errorMsg) {
			if (!regRule[key].test(value)) {
				return errorMsg;
			}
		},
		// 正整数
		integer: function(value, errorMsg) {
			return strategys.regExpTest('integer', value, errorMsg);
		},
		// 用户名
		username: function(value, errorMsg) {
			return strategys.regExpTest('username', value, errorMsg);
		},
		// 密码
		pwd: function(value, errorMsg) {
			return strategys.regExpTest('pwd', value, errorMsg);
		},
		// 手机号码
		phone: function(value, errorMsg) {
			return strategys.regExpTest('phone', value, errorMsg);
		},
		// 邮箱
		email: function(value, errorMsg) {
			return strategys.regExpTest('email', value, errorMsg);
		}
	};


	var Validator = function() {
		// 保存校验规则
		this.cache = [];
		// 保存元素
		this.doms = [];
		// 保存值
		this.vals = [];
		// 保存表单ID
		this.ID = null;
	};
	// 添加 验证
	Validator.prototype.add = function(dom, rule, errorMsg) {
		var str = rule.split(':');
		this.doms.push(dom);
		this.cache.push(function() {
			//
			var strategy = str.shift();

			str.unshift(dom.value); // input的value添加到参数列表
			str.push(errorMsg);

			return strategys[strategy].apply(dom, str);
		});
	};

	// 开始验证
	Validator.prototype.start = function(focus) {
		this.vals = [];
		for (var i = 0, validatorFunc,ele; ele=this.doms[i], validatorFunc = this.cache[i++];) {
			var msg = validatorFunc() || ""; // 开始校验，并取得返回信息
			if (msg) {
				if (focus) {
					ele.focus();
				}
				return this.showTipErr(ele, msg);
			} else {
				this.hideTipErr(ele);
			}
		}
		// 收集表单信息，提交后台
		this.getFormValues();
	};

	// 弹出错误信息
	Validator.prototype.showTipErr = function(ele, msg) {
		
		var parentN = ele.parentNode; // ele父类
		if (parentN.className.indexOf('error') === -1) {
			parentN.className += ' error';
			var span = document.createElement('span');
				span.className = 'error-text';
				span.innerHTML = msg;
			parentN.appendChild(span);
		}
		return msg;
	}
	// 隐藏错误信息
	Validator.prototype.hideTipErr = function(ele) {
		var parentN = ele.parentNode; // ele父类
		parentN.className = 'controls';
		var errSpan = parentN.getElementsByTagName('span');
		if (errSpan.length > 0) {
			parentN.removeChild(errSpan[0])
		}
	}

	// 获取表单所有信息
	Validator.prototype.getFormValues = function() {
		var elements = this.ID.elements;
		for (var i = 0, ele; ele = elements[i++];) {
			this.vals.push({
				name: ele.name,
				value: ele.value
			})
		}
	}
	/* 
	* @formEle 验证表单id
	* @focus ture聚焦
	*/
	var validateFunc = function(formEle, focus) {
		var validator = new Validator();
		validator.ID = document.getElementById(formEle); // 保存ID
		var elements = validator.ID.elements;
		for (var i = 0, ele; ele = elements[i++];) {
			var rule = ele.getAttribute("data-rule");
			if (rule) {
				validator.add(ele, rule, defaults[rule] || "")
			}
		}

		// 错误验证信息为空验证通过
		return !validator.start(focus) && validator.vals;
	};

	// 导出接口，统一调用
	window.validator = validateFunc
})();