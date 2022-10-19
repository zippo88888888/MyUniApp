import MsgUtil from "@/util/msg.js";

let UserUtil = {
	isLogin: function() {
		try {
			var isLogin = uni.getStorageSync("isLogin")
			if (isLogin == '' || isLogin == undefined || isLogin == null) {
				isLogin = '0'
			}
			MsgUtil.log("isLogin ---> " + isLogin)
			return isLogin == '1'
		} catch (e) {
			MsgUtil.log("isLogin error!!!")
			return false;
		}
	},
	saveLoginData: function(data) { // 0：未登录；1：已登录
		uni.setStorageSync("isLogin", data)
	},
	saveUserData: function(data) {
		uni.setStorageSync("userInfo", data)
	},
	getUserInfo: function() {
		try {
			var userInfoStr = uni.getStorageSync("userInfo")
			if (userInfoStr == '' || userInfoStr == undefined || userInfoStr == null) {
				userInfoStr = '{}'
			}
			MsgUtil.log("userInfoStr ---> " + userInfoStr)
			return userInfoStr
		} catch (e) {
			MsgUtil.log("getUserInfo error!!!")
			return false;
		}
	},
	exitLogin: function() {
		uni.removeStorageSync("isLogin")
	},
	removeUserData: function() {
		uni.removeStorageSync("userInfo")
	},
	removeAll: function () {
		uni.clearStorageSync()
	}
}

export default UserUtil
