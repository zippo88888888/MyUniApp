import MsgUtil from "@/util/msg.js";
let Utils = {
	checkMobile: function(phone) { // 判定手机号
		var regPhone = /^1[3456789]\d{9}$/
		if (regPhone.test(phone)) {
			return true
		}
		return false
	},
	isNumber: function(number) { // 判断是数字
		let regTest = /(^[0-9]*[1-9][0-9]*$)/
		if (!regTest.test(number)) {
			return false
		}
		return true
	},
	checkValue: function(value, msg, show) { // 检查是否为空，特殊符号、emoji表情
		if (Utils.isNull(value)) {
			if (show) MsgUtil.toast("请输入" + msg)
			return true
		}
		if (Utils.hasSpecialKey(value)) {
			if (show) MsgUtil.toast(msg + "不能输入特殊符号！")
			return true
		}
		if (Utils.hasEmoji(value)) {
			if (show) MsgUtil.toast(msg + "不能输入emoji表情！")
			return true
		}
		return false
	},
	hasSpecialKey: function(value) { // 判断是否含有特殊符号
		let reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im
		// 如果为true，字符串含有特殊符号，false不含
		return reg.test(value)
	},
	hasEmoji: function(value) { // 判断是否含有emoji表情
		let reg =
			/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig
		// 如果为true，字符串含有emoji表情，false不含
		return reg.test(value)
	},
	keepPoint: function(x) { // 强制保留2位小数，不足补 0
		var f = parseFloat(x)
		if (isNaN(f)) {
			return ''
		}
		f = Math.round(x * 100) / 100
		var s = f.toString()
		var rs = s.indexOf('.')
		if (rs < 0) {
			rs = s.length
			s += '.'
		}
		while (s.length <= rs + 2) {
			s += '0'
		}
		return s
	},
	isNull: function(obj) {
		if (obj == null) {
			return true
		}
		if (obj == undefined) return true
		if (typeof obj == 'undefined') return true
		if (obj == '') return true
		if (obj.length == 0) return true
		if (obj.replace(/(^s*)|(s*$)/g, '').length === 0) return true
		if (obj.replace(' ', '').length === 0) return true
		return false
	}
}

export default Utils
