let Bus = {
	getEventChannel: function() { // 获取 eventChannel
		// #ifdef APP-NVUE
		const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
		// #endif
		// #ifndef APP-NVUE
		const eventChannel = this.getOpenerEventChannel();
		// #endif
		return eventChannel
	},
	onActivityResult: function(emitName, value) {
		Bus.getEventChannel().emit(emitName, value)
	}
}

export default Bus
