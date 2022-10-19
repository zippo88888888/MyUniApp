<template>
	<view>
		<view class="top-layout"></view>
		<view class="address-layout" v-on:click="selecteAddress()">
			<image class="address-pic" src="../../static/pic/order_info_address.png"></image>
			<view class="address-layout2" v-if="hasAddressData()">
				<view class="address-layout3">
					<text class="uname">{{addressBean.name}}</text>
					<text class="uphone">{{addressBean.phone}}</text>
				</view>
				<text class="address max">{{addressBean.area}}{{addressBean.address}}</text>
			</view>
			<text class="no-address-txt" v-if="!hasAddressData()">请选择收货地址</text>
			<image class="address-jt" src="../../static/pic/right_jt.png"></image>
		</view>
		<view v-bind:class="[hasAddressData() ? 'has-address-layout' : 'no-address-layout']"></view>
		<view class="list-item-shop" v-for="(item,index) in 3" :key="index">
			<image class="shop-pic m-l" src="../../static/pic/my_header.jpg"></image>
			<view class="shop-right m-r">
				<text class="txt txt-max-1">我是商品标题</text>
				<view class="sku-layout">
					<text class="sku txt-max-1">我是sku</text>
					<view style="flex: 1;"></view>
				</view>
				<view style="flex: 1;"></view>
				<view class="price-layout">
					<text class="txt">900猿币</text>
					<text class="txt">×1</text>
				</view>
			</view>
		</view>
		<view class="white-layout"></view>
		<view class="line"></view>
		<view class="white-layout"></view>
		<view class="shop-l-r">
			<text class="txt m-l">总数量</text>
			<text class="txt m-r">×3</text>
		</view>
		<view class="shop-l-r">
			<text class="txt m-l">总价格</text>
			<text class="txt m-r">1000猿币</text>
		</view>
		<view class="shop-l-r">
			<text class="txt m-l">运费</text>
			<text class="txt m-r">0猿币</text>
		</view>
		<view class="shop-l-r" v-on:click="selectedTicker()">
			<text class="txt m-l">优惠券</text>
			<view class="yhq-layout">
				<text v-if="hasTicker" v-bind:class="[tickerBean.id == -1 ? 'ticker-unselected' : 'ticker-selected']">{{tickerBean.content}}</text>
				<text v-else class="ticker-unselected">暂无可用优惠券</text>
				<image class="yhq-jt m-r" src="../../static/pic/right_jt.png"></image>
			</view>
		</view>
		<view class="shop-l-r">
			<text class="txt m-l">优惠</text>
			<text class="txt m-r">100猿币</text>
		</view>
		<view class="shop-l-r">
			<text class="txt m-l">合计</text>
			<text class="price m-r">900猿币</text>
		</view>
		<view class="order-no-layout">
			<text class="tip">注：1元=10猿币</text>
		</view>
		<!--  部分浏览器不识别 order-no-layout 中的margin-bottom，必须在其下面加个控件 -->
		<view class="line"></view>
		<view class="bottom-layout">
			<view class="bottom-price-layout">
				<text class="bottom-count m-l">共3件物品 需付：</text>
				<text class="price">￥90元</text>
			</view>
			<text class="bottom-pay" v-on:click="payNow()">立即付款</text>
		</view>
		<view>
			<uni-popup ref="payDialog" :maskClick="false">
				<PayDialog :orderNo="orderNo" :orderPrice="orderPrice" @dismissPayDialog="closePayDialog()" />
			</uni-popup>
		</view>
		<view>
			<uni-popup ref="tickerDialog">
				<TickerDialog :orderNo="orderNo" @dismissTickerDialog="closeTickerDialog" />
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import MsgUtil from '../../util/msg.js';
	import PayDialog from '../dialog/payDialog.vue';
	import TickerDialog from '../dialog/tickerDialog.vue';
	export default {
		components: {
			PayDialog,
			TickerDialog
		},
		data() {
			return {
				hasTicker: true,
				orderNo: '',
				orderPrice: '',
				addressBean: {
					id: "",
					name: "",
					phone: "",
					area: "",
					address: "",
					code: ""
				},
				tickerBean: {
					id: "-1",
					status: 0,
					jianPrice: 0,
					manPrice: 0,
					type: 0,
					time: "",
					content: "请选择",
				},
			}
		},
		methods: {
			hasAddressData: function() {
				var addressId = this.addressBean.id
				if (addressId == "" || addressId.length <= 0 || addressId == undefined) {
					return false
				}
				return true
			},
			selecteAddress: function() {
				var that = this.addressBean
				uni.navigateTo({
					url: "../my/address?from=1",
					events: {
						onAddressResult: function(resultData) {
							console.log("onAddressResult ---> " + resultData.name)
							that.id = resultData.id
							that.name = resultData.name
							that.phone = resultData.phone
							that.area = resultData.area
							that.address = resultData.address
							that.code = resultData.code
						}
					}
				})
			},
			selectedTicker: function() {
				if (!this.hasTicker) return
				this.$refs.tickerDialog.open("bottom")
			},
			payNow: function() {
				if (!this.hasAddressData()) {
					MsgUtil.toast("请选择收货地址")
					return
				}
				this.orderNo = '10204864512'
				this.orderPrice = '90'
				this.$refs.payDialog.open("bottom")
			},
			closePayDialog: function() {
				this.$refs.payDialog.close()
			},
			closeTickerDialog: function(tickerData) {
				if (tickerData == null || tickerData == undefined) {
					console.log("closeTickerDialog ---> cancel")
				} else {
					var bean = this.tickerBean
					bean.id = tickerData.id
					bean.status = tickerData.status
					bean.jianPrice = tickerData.jianPrice
					bean.manPrice = tickerData.manPrice
					bean.type = tickerData.type
					bean.time = tickerData.time
					bean.content = "已选择满" + bean.manPrice + "减" + bean.jianPrice + "猿币"
					MsgUtil.log("closeTickerDialog ---> " + bean.id)
				}
				this.$refs.tickerDialog.close()
			}
		}
	}
</script>

<style lang="scss">
	$shopItemHeight: 95px;
	$shopLRHeight: 30px;
	$bottomHeight: 45px;

	.white-layout {
		height: 10px;
		background-color: #FFFFFF;
	}

	.top-layout {
		background-color: #007AFF;
		height: 50px;
	}

	.address-layout {
		background-color: #FFFFFF;
		padding-top: 10px;
		padding-bottom: 10px;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 20px;
		left: 0;
		right: 0;
		margin-left: 13px;
		margin-right: 13px;
		z-index: 1;
		box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 0.15);

		.address-pic {
			width: 30px;
			height: 30px;
			margin-left: 10px;
		}

		.no-address-txt {
			display: flex;
			flex-direction: column;
			flex: 1;
			margin-left: 15px;
			margin-right: 3px;
			color: #000000;
			font-size: 16px;
		}

		.address-layout2 {
			display: flex;
			flex-direction: column;
			flex: 1;
			justify-content: center;
			margin-left: 10px;
			margin-right: 3px;

			.address-layout3 {
				display: flex;
				flex-direction: row;
				align-items: flex-end;

				.uname {
					color: #000000;
					font-size: 15px;
				}

				.uphone {
					color: #91919C;
					font-size: 12px;
					margin-left: 10px;
				}

			}

			.address {
				color: #000000;
				font-size: 13px;
				margin-top: 3px;
			}
		}

		.address-jt {
			width: 13px;
			height: 13px;
			margin-right: 10px;
		}
	}

	.has-address-layout {
		height: 50px;
		background-color: #FFFFFF;
	}

	.no-address-layout {
		height: 30px;
		background-color: #FFFFFF;
	}

	.list-item-shop {
		display: flex;
		flex-direction: row;
		height: $shopItemHeight;
		align-items: center;
		background-color: #FFFFFF;

		.shop-pic {
			width: 100px;
			height: 75px;
		}

		.shop-right {
			display: flex;
			flex-direction: column;
			margin-left: 10px;
			height: 75px;
			flex: 1;

			.sku-layout {
				display: flex;
				flex-direction: row;
				margin-top: 3px;

				.sku {
					background-color: #F2F2F2;
					padding-left: 5px;
					padding-right: 5px;
					padding-top: 2px;
					padding-bottom: 2px;
					color: #91919C;
					font-size: 14px;
				}
			}

			.price-layout {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}
		}
	}

	.shop-l-r {
		height: $shopLRHeight;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		.yhq-layout {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;

			.yhq-jt {
				width: 12px;
				height: 12px;
			}
		}
	}

	.ticker-unselected {
		color: #91919C;
		font-size: 13px;
		margin-right: 3px;
	}

	.ticker-selected {
		color: #007AFF;
		font-size: 14px;
		margin-right: 3px;
	}

	.order-no-layout {
		height: 40px;
		margin-bottom: $bottomHeight;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.tip {
			color: #91919C;
			font-size: 12px;
		}
	}

	.price {
		color: #007AFF;
		font-size: 15px;
		font-weight: bold;
	}

	.bottom-layout {
		height: $bottomHeight;
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-top-color: #F2F2F2;
		border-top-width: 0.5px;
		border-top-style: solid;

		.bottom-price-layout {
			display: flex;
			flex-direction: row;
			flex: 1;
			align-items: center;

			.bottom-count {
				color: #000000;
				font-size: 12px;
			}
		}

		.bottom-pay {
			width: 90px;
			height: $bottomHeight;
			line-height: $bottomHeight;
			color: #FFFFFF;
			font-size: 13px;
			background-color: #007AFF;
			text-align: center;
		}
	}
</style>
