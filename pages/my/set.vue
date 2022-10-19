<template>
	<view class="set-root">
		<!-- #ifdef APP || APP-PLUS -->
		<view class="set-layout" @click="versionClick()">
			<text class="txt m-l">版本 V1.0.2</text>
			<image class="set-jt m-r" src="../../static/pic/right_jt.png"></image>
		</view>
		<view class="set-layout">
			<text class="txt m-l">消息推送</text>
			<switch @change="switchChange" color="#007AFF" style="transform: scale(0.7);"
				v-bind:checked="isOpen"></switch>
		</view>
		<!-- #endif -->
		<view class="set-layout" @click="exitClick()">
			<text class="txt m-l">退出登录</text>
			<image class="set-jt m-r" src="../../static/pic/right_jt.png"></image>
		</view>
	</view>
</template>

<script>
	import UserUtil from '../../util/userUtil.js';
	import MsgUtil from '../../util/msg.js';
	export default {
		data() {
			return {
				isOpen: true
			}
		},
		methods: {
			versionClick: function() {
			},
			switchChange: function() {

			},
			exitClick: function() {
				MsgUtil.confirmDialog("确定要退出登录吗？", "退出", () => {
					UserUtil.exitLogin()
					this.getEventChannel().emit("exitLogin", false)
					uni.navigateBack({})
				})
			},
			getEventChannel: function() { // 获取 eventChannel
				// #ifdef APP-NVUE
				const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
				// #endif
				// #ifndef APP-NVUE
				const eventChannel = this.getOpenerEventChannel();
				// #endif
				return eventChannel
			}
		}
	}
</script>

<style lang="scss">
	.set-root {
		display: flex;
		flex-direction: column;
	}

	.set-layout {
		display: flex;
		flex-direction: row;
		height: 45px;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		border-bottom-color: #F2F2F2;
		border-bottom-width: 1px;
		border-bottom-style: solid;

		.set-jt {
			width: 15px;
			height: 15px;
		}
	}
</style>
