let MsgUtil = {
	log: function(msg) {
		console.log(msg)
	},
	toast: function(msg) {
		uni.showToast({
			icon: 'none',
			title: msg,
			position: 'bottom'
		})
	},
	confirmDialog: function(content, confirmText, successR) {
		uni.showModal({
			title: "温馨提示",
			content: content,
			confirmText: confirmText,
			confirmColor: "#007AFF",
			success: (option) => {
				if (option.confirm) {
					successR()
				}
			}
		})
	}
}
export default MsgUtil
