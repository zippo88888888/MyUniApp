<template>
	<view class="login-bg">
		<view class="logo-layout">
			<image v-on:click="closeDialog()" class="close" src="../../static/pic/close2.png"></image>
			<image class="logo" src="../../static/pic/logo_g.png"></image>
			<text class="title">Hi 欢迎来到猿家店</text>
		</view>
		<view class="bg2">
			<view class="layout-left">
				<text class="lable">用户名</text>
				<text class="lable">密码</text>
			</view>
			<view class="layout-right">
				<input class="input-name" v-model="uName" confirm-type="next" maxlength="15" type="text"
					placeholder="请输入用户名" />
				<input class="input-name" v-model="uPwd" confirm-type="done" maxlength="20" type="password"
					placeholder="请输入密码" />
			</view>
		</view>
		<view class="btn-layout">
			<text class="btn-layout-btn" v-on:click="login()">立即登录</text>
		</view>
		<view class="fwxy">
			<text class="xhx1">登录即同意</text>
			<text class="xhx1 xhx">猿家店服务协议</text>
		</view>
	</view>
</template>

<script>
	import UserUtil from '../../util/userUtil.js';
	import MsgUtil from '../../util/msg.js';
	import Utils from '../../util/utils.js';
	export default {
		emits: ['dissmisDialog', 'loginSuccess'],
		data() {
			return {
				uName: '',
				uPwd: '',
			}
		},
		methods: {
			login: function() {
				if (Utils.checkValue(this.uName, "用户名", true)) {
					return
				}
				if (Utils.checkValue(this.uPwd, "密码", true)) {
					return
				}
				UserUtil.saveLoginData("1")
				this.$emit('loginSuccess')
			},
			closeDialog: function() {
				this.$emit('dissmisDialog', true)
			},
		}
	}
</script>

<style lang="scss">
	$dialogWidth: 280px;

	.login-bg {
		width: $dialogWidth;
		padding-bottom: 15px;
		background-color: #FFFFFF;
		border-radius: 5px;

		.bg2 {
			display: flex;
			flex-direction: row;
		}
	}

	.logo-layout {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.logo {
			width: 38px;
			height: 38px;
		}

		.title {
			color: #007AFF;
			font-size: 18px;
			font-weight: bold;
			height: 35px;
			line-height: 35px;
			margin-top: 13px;
		}

		.close {
			width: 20px;
			height: 20px;
			align-self: flex-end;
			margin-top: 5px;
			margin-right: 5px;
		}
	}

	.layout-left {
		flex: 2;
		display: flex;
		margin-left: 13px;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;

		.lable {
			color: #000000;
			font-size: 14px;
			height: 40px;
			line-height: 40px;
			margin-right: 13px;
			margin-top: 13px;
		}
	}

	.layout-right {
		display: flex;
		flex: 3;
		flex-direction: column;
		justify-content: end;

		.input-name {
			height: 40px;
			width: 110px;
			font-size: 14px;
			margin-top: 13px;
			border-bottom-color: #F2F2F2;
			border-bottom-width: 1px;
			border-bottom-style: solid;
		}
	}

	.btn-layout {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		padding-bottom: 20px;

		.btn-layout-btn {
			height: 28px;
			line-height: 28px;
			font-size: 13px;
			padding-left: 10px;
			padding-right: 10px;
			border-radius: 3px;
			background-color: #007AFF;
			color: #FFFFFF;
			border-style: none;
		}

		.register {
			background-color: #369c47;
			margin-left: 20px;
		}
	}

	.fwxy {
		flex-direction: row;
		display: flex;
		justify-content: center;

		.xhx1 {
			color: #d1d1d1;
			font-size: 12px;
			text-align: center;
		}

		.xhx {
			text-decoration: underline;
			margin-left: 2px;
		}
	}
</style>
