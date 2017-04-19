/**
 * 
 * @authors wind (windspeech@qq.com)
 * @date    2017-04-19 10:04:53
 * @version 1.0.0
 */

// 策略对象
var strategys = {
	isNotEmpty: function(value, errorMsg) {
		if (value === '') {
			return errorMsg || "不能为空";
		}
	},
	// 最小长度
	minLength: function(value, length, errorMsg) {
		if (value.length < length) {
			return errorMsg;
		}
	},
	// 手机号码
	mobileFormat: function(value, errorMsg) {
		var phoneReg = /^13[0-9]{9}$|^15[012356789][0-9]{8}$|^178[0-9]{8}$|^170[0-9]{8}$|^177[0-9]{8}$|^176[0-9]{8}$|^18[0-9]{9}$|^14[57][0-9]{8}$|^160[0-9]{8}$/;
		if (!phoneReg.test(value)) {
			return errorMsg;
		}
	}
};


var Validator = function() {
	// 保存校验规则
	this.cache = [];
};
Validator.prototype.add = function(dom, rule, errorMsg) {
	var str = rule.split(':');
	this.cache.push(function() {
		//
		var strategy = str.shift();

		str.unshift(dom.value); // input的value添加到参数列表
		str.push(errorMsg);

		return strategys[strategy].apply(dom, str);
	});
};

Validator.prototype.start = function() {
	for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
		var msg = validatorFunc(); // 开始校验，并取得返回信息
		if (msg) {
			return msg;
		}
	}
};

var validateFunc = function() {
	var validator = new Validator();
	validator.add(registerForm.userName, 'isNotEmpty', '用户名不能为空');
	validator.add(registerForm.password, 'minLength:6', '密码长度不能小于6位');
	validator.add(registerForm.phoneNumber, 'mobileFormat', '手机号码格式不正确');

	var errorMsg = validator.start();
	return errorMsg;
};

var registerForm = document.getElementById('registerForm');
var btn = document.getElementById('btn');

// elements 集合可返回包含表单中所有元素的数组
console.log(registerForm.elements);

btn.onclick = function() {
	var errorMsg = validateFunc();
	if (errorMsg) {
		alert(errorMsg)
		return false;
	}
}