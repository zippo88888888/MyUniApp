<template>
	<view>
		<view class="status-layout">
			<image class="status-pic" src="../../static/svg/svg_order_logo.svg"></image>
			<text class="status-txt m-l">待收货</text>
			<text class="status-info-txt m-l">剩余6天23小时59分59秒自动收货</text>
		</view>
		<view class="address-layout">
			<image class="address-pic" src="../../static/pic/order_info_address.png"></image>
			<view class="address-layout2">
				<view class="address-layout3">
					<text class="uname">张三</text>
					<text class="uphone">17789654123</text>
				</view>
				<text class="address max">上海上海市黄浦区淮海中路98号金钟广场33楼中消在线</text>
			</view>
		</view>
		<view style="height: 60px;background-color: #FFFFFF;"></view>
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
			<text class="txt m-l">优惠</text>
			<text class="txt m-r">100猿币</text>
		</view>
		<view class="shop-l-r">
			<text class="txt m-l">运费</text>
			<text class="txt m-r">0猿币</text>
		</view>
		<view class="shop-l-r">
			<text class="txt m-l">实付</text>
			<text class="price m-r">900猿币</text>
		</view>
		<view class="order-layout">
			<text class="order-txt m-l">订单信息</text>
			<view class="white-layout"></view>
			<view class="order-l-r">
				<text class="txt order-l-r-left m-l">订单号</text>
				<text class="txt order-l-r-right m-r">50045451202</text>
			</view>
			<view class="order-l-r">
				<text class="txt order-l-r-left m-l">支付方式</text>
				<text class="txt order-l-r-right m-r">支付宝</text>
			</view>
			<view class="order-l-r">
				<text class="txt order-l-r-left m-l">订单时间</text>
				<text class="txt order-l-r-right m-r">2021-11-11 13:02:11</text>
			</view>
			<view class="order-l-r">
				<text class="txt order-l-r-left m-l">付款时间</text>
				<text class="txt order-l-r-right m-r">2021-11-11 13:05:43</text>
			</view>
			<view class="white-layout"></view>
		</view>
		<view style="height: 90px;"></view>
		<view class="bottom-layout">
			<text class="btn btn1">取消订单</text>
			<text class="btn btn2">确认收货</text>
			<text class="btn btn1">删除订单</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	$statusHeight: 100px;
	$shopItemHeight: 95px;
	$shopLRHeight: 30px;
	$bottomHeight: 40px;

	.white-layout {
		height: 10px;
		background-color: #FFFFFF;
	}

	.status-layout {
		height: 100px;
		background-color: #007AFF;
		display: flex;
		flex-direction: column;

		.status-pic {
			position: absolute;
			top: 45px;
			right: 0;
			width: 50px;
			height: 50px;
		}

		.status-txt {
			color: #FFFFFF;
			margin-top: 3px;
			font-size: 22px;
			font-weight: bold;
		}

		.status-info-txt {
			color: #FFFFFF;
			font-size: 15px;
			margin-top: 5px;
		}
	}

	.address-layout {
		height: 80px;
		background-color: #FFFFFF;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 70px;
		left: 0;
		right: 0;
		margin-left: 13px;
		margin-right: 13px;
		z-index: 1;
		box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 0.15);

		.address-pic {
			width: 33px;
			height: 33px;
			margin-left: 10px;
		}

		.address-layout2 {
			display: flex;
			flex-direction: column;
			flex: 1;
			height: 70px;
			justify-content: center;
			margin-left: 10px;
			margin-right: 10px;

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
				font-size: 14px;
				margin-top: 4px;
			}
		}
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
		.price {
			color: #007AFF;
			font-size: 15px;
			font-weight: bold;
		}
	}
	.order-layout {
		margin-top: 10px;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		.order-txt {
			font-size: 15px;
			color: #000000;
			margin-top: 13px;
		}
		.order-l-r {
			height: $shopLRHeight;
			display: flex;
			flex-direction: row;
			align-items: center;
			
			.order-l-r-left {
				width: 100px;
			}
			.order-l-r-right {
				color: #91919C;
			}
		}
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
		justify-content: flex-end;
		align-items: center;
		border-top-color: #F2F2F2;
		border-top-width: 0.5px;
		border-top-style: solid;
	}
	.btn {
		padding: 3px 7px;
		border-radius: 3px;
		border-width: 0.5px;
		border-style: solid;
		font-size: 12px;
		margin-right: 10px;
	}
	.btn1 {
		border-color: #91919C;
		color: #91919C;
	}
	.btn2 {
		border-color: #007AFF;
		color: #007AFF;
	}
</style>
