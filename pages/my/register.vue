<template>
	<view class="register-root">
		<image class="logo" src="../../static/pic/logo_g.png"></image>
		<text class="title">Hi 欢迎来到猿家店</text>
		<view class="icons">
			<image class="icon" v-for="(item,index) in iconList" :key="index" v-bind:src="item"></image>
		</view>
		<view class="layout m-t">
			<text class="r-txt">昵称</text>
			<input class="input" v-model="uName" confirm-type="next" maxlength="15" type="text" placeholder="请输入昵称" />
		</view>
		<view class="layout">
			<text class="code-btn" style="visibility: hidden;">{{timerStr}}</text>
			<text class="r-txt">手机号</text>
			<input class="input" v-model="uPhone" confirm-type="next" maxlength="11" type="number"
				placeholder="请输入手机号" />
			<text class="code-btn" @click="getCode()">{{timerStr}}</text>
		</view>
		<view class="layout">
			<text class="r-txt">验证码</text>
			<input class="input" v-model="uCode" confirm-type="next" maxlength="6" type="number" placeholder="请输入验证码" />
		</view>
		<view class="layout">
			<text class="r-txt">密码</text>
			<input class="input" v-model="uPwd" confirm-type="done" maxlength="20" type="password"
				placeholder="请输入密码" />
		</view>
		<text class="register-btn" @click="register()">注册</text>
	</view>
</template>

<script>
	import MsgUtil from '../../util/msg.js';
	import Utils from '../../util/utils.js';
	export default {
		data() {
			return {
				iconList: [
					'../../static/pic/r_1.png',
					'../../static/pic/r_2.png',
					'../../static/pic/r_3.png',
					'../../static/pic/r_4.png',
					'../../static/pic/r_5.png',
				],
				codeStr: '',
				uName: '',
				uPhone: '',
				uCode: '',
				uPwd: '',
				timer: '',
				timerIsRun: false,
				timerCount: 60,
				timerStr: '验证码'
			}
		},
		methods: {
			getCode: function() {
				if (this.timerIsRun) return
				if (!Utils.checkMobile(this.uPhone)) {
					MsgUtil.toast("手机号输入有误！")
					return
				}
				this.timerStr = "60s"
				this.timerIsRun = true
				this.startTime()
			},
			register: function() {

			},
			startTime: function() {
				var that = this
				this.timer = setInterval(() => {
					if (that.timerCount <= 0) {
						clearInterval(that.timer)
						that.timerStr = "验证码"
						that.timerIsRun = false
						that.timerCount = 60
					} else {
						that.timerCount --
						that.timerStr = that.timerCount + "s"
					}
				}, 1000)
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.register-root {
		display: flex;
		flex-direction: column;

		.logo {
			width: 60px;
			height: 60px;
			margin-top: 40px;
			align-self: center;
		}

		.title {
			color: #007AFF;
			font-size: 18px;
			font-weight: bold;
			margin-top: 15px;
			align-self: center;
		}

		.icons {
			display: flex;
			flex-direction: row;
			height: 60px;
			justify-content: center;
			align-items: center;

			.icon {
				width: 20px;
				height: 20px;
				margin-right: 10px;
			}
		}

		.layout {
			display: flex;
			flex-direction: row;
			height: 50px;
			justify-content: center;
			align-items: center;

			.r-txt {
				font-size: 14px;
				color: #000000;
				width: 50px;
				text-align: right;
				margin-right: 20px;
			}

			.code-btn {
				color: #FFFFFF;
				background-color: #007AFF;
				border-radius: 3px;
				font-size: 12px;
				padding: 4px 8px;
				margin-left: 3px;
			}

			.input {
				height: 40px;
				width: 110px;
				font-size: 14px;
				border-bottom-color: #F2F2F2;
				border-bottom-width: 1px;
				border-bottom-style: solid;
			}
		}

		.register-btn {
			background-color: #2C405A;
			font-size: 14px;
			color: #FFFFFF;
			border-radius: 3px;
			height: 35px;
			width: 80px;
			text-align: center;
			line-height: 35px;
			margin-top: 35px;
			align-self: center;
		}
	}
</style>
