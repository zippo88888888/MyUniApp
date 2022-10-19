<template>
	<view class="pay-layout">
		<image class="close" src="../../static/pic/close2.png" v-on:click="closeDialog()"></image>
		<text class="price">￥{{orderPrice}}元</text>
		<view class="pay-type-layout m-t" v-on:click="payClick(0)">
			<image class="logo m-l" src="../../static/pic/ic_confirm_alipay.png"></image>
			<text class="pay">支付宝支付</text>
			<image class="radio m-r" v-bind:src="payType == 0 ? radioYes : radioNo"></image>
		</view>
		<view class="pay-type-layout" v-on:click="payClick(1)">
			<image class="logo m-l" src="../../static/pic/ic_confirm_wechat.png"></image>
			<text class="pay">微信支付</text>
			<image class="radio m-r" v-bind:src="payType == 1 ? radioYes : radioNo"></image>
		</view>
		<text v-on:click="pay()" class="btn" v-bind:class="[payType == -1 ? 'can-not-btn':'can-btn']">支付</text>
	</view>
</template>

/**
* 选择支付方式 Dialog
* @description 选择支付方式
* @property {String} orderNo 订单编号
* @property {String} orderPrice 订单金额
* @event {Function} dismissPayDialog 弹窗销毁
*/
<script>
	export default {
		emits: ['dismissPayDialog'],
		props: {
			orderNo: {
				type: String,
				default: ''
			},
			orderPrice: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				radioNo: "../../static/pic/radio_n.png",
				radioYes: "../../static/pic/radio_y.png",
				payType: -1 // 0支付宝；1微信
			}
		},
		methods: {
			payClick: function(type) {
				if (this.payType == type) return
				this.payType = type
			},
			pay: function() {
				if (this.payType == -1) return
				console.log(this.orderNo + " <===> " + this.payType)
				var that = this
				uni.showToast({
					icon: 'none',
					title: that.orderNo
				})
			},
			closeDialog: function() {
				this.$emit('dismissPayDialog', true)
			},
		}
	}
</script>

<style lang="scss">
	.pay-layout {
		height: 260px;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		.close {
			width: 20px;
			height: 20px;
			align-self: flex-end;
			margin-top: 5px;
			margin-right: 5px;
		}

		.price {
			color: #007AFF;
			font-size: 17px;
			font-weight: bold;
			margin-top: 15px;
			align-self: center;
		}

		.pay-type-layout {
			height: 50px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			border-bottom-color: #F2F2F2;
			border-bottom-width: 0.5px;
			border-bottom-style: solid;

			.logo {
				width: 20px;
				height: 20px;
			}

			.pay {
				font-size: 14px;
				color: #000000;
				flex: 1;
				margin-left: 10px;
			}

			.radio {
				width: 18px;
				height: 18px;
			}
		}

		.btn {
			margin-top: 20px;
			height: 40px;
			line-height: 40px;
			border-radius: 3px;
			text-align: center;
			margin-left: 10px;
			margin-right: 10px;
			color: #FFFFFF;
			font-size: 14px;
		}
	}

	.can-btn {
		background-color: #007AFF;
	}

	.can-not-btn {
		background-color: #5791FE;
	}
</style>
