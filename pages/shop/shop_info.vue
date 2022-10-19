<template>
	<view class="info-layout">
		<swiper class="swiper" :circular="true" :autoplay="false" :indicator-dots="true"
			:indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor">
			<swiper-item v-for="(item,index) in bannerList" :key="index">
				<view class="swiper-item">
					<image class="swiper-item-image" v-bind:src="item.url"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="price-layout">
			<text class="price">139999猿币</text>
			<text class="tip-price">注：1元=10猿币</text>
		</view>
		<text class="txt m-l m-r">华硕 ASUS TUF-RTX3090-O24G-GAMING 1740-1770MHz</text>
		<text class="content m-l m-r">赛博朋克电竞游戏专业独立显卡 可支持8K显示器</text>
		<view class="layout1">
			<text class="gf" v-if="isGF">官方</text>
			<text style="color: #007AFF;" class="m-l txt" v-if="!isGF">来源：meimei</text>
			<text class="time m-r">发布于 2021-10-31</text>
		</view>
		<view class="layout2">
			<text class="m-l txt">运费: 包邮</text>
			<text class="m-r txt">库存：2</text>
		</view>
		<text class="info-txt m-l">商品详情</text>
		<view class="pic-layout">
			<image class="pic-info" v-for="(item,index) in infoList" :key="index" v-bind:src="item" mode="widthFix"></image>
		</view>
		<view class="bottom-mm">
			<NoLoadMoreView></NoLoadMoreView>
		</view>
		<view class="like-layout" @click="likeClick()">
			<image class="like-icon" v-bind:src="isLike ? yesLike : noLike"></image>
		</view>
		<view class="car" @click="toCar()">
			<view class="car-layout">
				<image class="car-pic" src="../../static/pic/car3.png"></image>
			</view>
			<text class="car-txt">购物车</text>
		</view>
		<text class="car-num">12</text>
		<view class="bottom-layout">
			<view class="service-layout" @click="serviceClick()">
				<image class="service-icon" src="../../static/pic/service.png"></image>
				<text class="service-txt">客服</text>
			</view>
			<view class="btn-layout">
				<text class="add" @click="buy(false)">加入购物车</text>
				<text class="add buy" @click="buy(true)">立即购买</text>
			</view>
		</view>
		<!-- 登录弹窗 -->
		<view>
			<uni-popup ref="loginDialog">
				<LoginDialog @loginSuccess="loginSuccess()" @dissmisDialog="dissmisLoginDialog()"/>
			</uni-popup>
		</view>
		<!-- 客服弹窗  -->
		<view>
			<uni-popup ref="tel">
				<TelDialog @dissmisTelDialog="dissmisTelDialog()" :needSetMarginBottom="false"/>
			</uni-popup>
		</view>
		<!-- 商品SKU弹窗  -->
		<view>
			<uni-popup ref="sku">
				<ShopSkuDialog :isBuy="isBuy" @colseSkuDialog="dissmisSkuDialog()"/>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import TelDialog from '../dialog/telDialog.vue';
	import LoginDialog from '../dialog/loginDialog.vue';
	import ShopSkuDialog from '../dialog/shopSkuDialog.vue';
	import NoLoadMoreView from '../../components/no_load_more.vue';
	import MsgUtil from '../../util/msg.js';
	import UserUtil from '../../util/userUtil.js';
	export default {
		components: {TelDialog,LoginDialog,ShopSkuDialog,NoLoadMoreView},
		data() {
			return {
				indicatorColor: '#FFFFFF',
				indicatorActiveColor: '#007AFF',
				bannerList: [
					{ url: "https://img13.360buyimg.com/mobilecms/s710x334_jfs/t1/213708/30/1992/177988/6177f1ddEb1f03f67/413dc2563534e2a4.jpg!cc_710x334!q70.dpg.webp", content: "LOL-莲华-手办" },
					{ url: "https://img13.360buyimg.com/mobilecms/s710x334_jfs/t1/210133/17/5922/347509/616e545cE57009ebd/269fe4701eea6d98.jpg!cc_710x334!q70.dpg.webp", content: "外星人游戏本" },
					{ url: "https://img13.360buyimg.com/mobilecms/s710x334_jfs/t1/155620/18/23267/88144/617f8f47Ec7d18095/47e9cfcc896c5a0a.jpg!cc_710x334!q70.dpg.webp", content: "鼠标" },
					{ url: "https://img12.360buyimg.com/n2/s240x240_jfs/t1/132711/10/11289/111649/5f73f06fEdbe1e80c/b58c0f2e4694914d.jpg!q70.jpg", content: "牙膏" }
				],
				isGF: true, // 是否是官方
				isLike: false,
				noLike: '../../static/pic/like.png',
				yesLike: '../../static/pic/like2.png',
				isBuy: false, // true：立即购买；false：加入购物车
				infoList: [
					"https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/rtx-3090/geforce-rtx-3090-product-gallery-full-screen-3840-1.jpg",
					"https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/rtx-3090/geforce-rtx-3090-product-gallery-full-screen-3840-2.jpg",
					"https://images.nvidia.com/aem-dam/Solutions/geforce/ampere/rtx-3090/geforce-rtx-3090-product-gallery-full-screen-3840-3.jpg"
				]
			}
		},
		methods: {
			likeClick: function() {
				if (UserUtil.isLogin()) {
					this.isLike = !this.isLike
				} else {
					this.$refs.loginDialog.open("center")
					MsgUtil.toast("请先去登录！")
				}
			},
			toCar: function() {
				if (UserUtil.isLogin()) {
					uni.switchTab({
						url:"../bnv/car"
					})
				} else {
					this.$refs.loginDialog.open("center")
					MsgUtil.toast("请先去登录！")
				}
			},
			buy: function(isBuy) {
				if (UserUtil.isLogin()) {
					this.isBuy = isBuy
					this.$refs.sku.open("bottom")
				} else {
					this.$refs.loginDialog.open("center")
					MsgUtil.toast("请先去登录！")
				}
			},
			serviceClick: function() {
				this.$refs.tel.open("bottom")
			},
			dissmisTelDialog: function() {
				this.$refs.tel.close()
			},
			dissmisLoginDialog: function() {
				this.$refs.loginDialog.close()
			},
			loginSuccess: function() {
				this.dissmisLoginDialog()
			},
			dissmisSkuDialog: function() {
				this.$refs.sku.close()
			}
		}
	}
</script>

<style lang="scss">
	$bottomHeight: 50px;
	.info-layout {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
	}
	
	.swiper {
		/* #ifdef H5 */
		width: 100%;
		/* #endif */
		height: 200px;
		
		.swiper-item {
			background-color: $uni-bg-color;
		}
		.swiper-item-image {
			width: 100%;
			height: 200px;
		}
	}
	
	.content {
		color: #91919C;
		font-size: 13px;
		margin-top: 5px;
	}
	
	.price-layout {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		margin-top: 3px;
		padding-left: 13px;
		padding-right: 13px;
		
		.price {
			color: #007AFF;
			font-size: 16px;
			font-weight: bold;
		}
		
		.tip-price {
			color: #91919C;
			font-size: 12px;
		}
	}
	
	.layout1 {
		display: flex;
		flex-direction: row;
		height: 40px;
		align-items: center;
		justify-content: space-between;
		
		.gf {
			background-color: #007AFF;
			font-size: 12px;
			padding: 3px 8px;
			color: #FFFFFF;
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
		}
		
		.time {
			font-size: 13px;
			color: #91919C;
		}
	}
	
	.layout2 {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	
	.info-txt {
		color: #000000;
		font-size: 15px;
		font-weight: bold;
		height: 40px;
		line-height: 40px;
		margin-top: 3px;
	}
	
	.pic-layout {
		display: flex;
		flex-direction: column;
		margin-top: 0.5px;
		justify-content: center;
		align-items: center;
		
		.pic-info {
			width: 100%;
			margin-top: 1px;
		}
	}
	
	.bottom-mm {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-bottom: 50px;
		height: 50px;
		background-color: #F2F2F2;
	}
	
	// .no-more-txt {
	// 	color: #91919C;
	// 	height: 50px;
	// 	line-height: 50px;
	// 	font-size: 12px;
	// 	text-align: center;
	// 	background-color: #F2F2F2;
	// 	margin-bottom: $bottomHeight;
	// }
	
	.like-layout {
		width: 40px;
		height: 40px;
		background-color: #007AFF;
		border-radius: 20px;
		position: absolute;
		right: 13px;
		top: 180px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 0.15);
		
		.like-icon {
			width: 25px;
			height: 25px;
		}
		 
	}
	
	.car-num {
		position: fixed;
		left: 40px;
		z-index: 1;
		bottom: $bottomHeight;
		font-size: 12px;
		background-color: #dc0000;
		padding: 1px 5px;
		color: #FFFFFF;
		border-radius: 10px;
	}
	
	.car {
		position: fixed;
		left: 15px;
		z-index: 1;
		bottom: 8px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.car-layout {
			width: 40px;
			height: 40px;
			background-color: #007AFF;
			border-radius: 23px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 0.15);
			
			.car-pic {
				width: 25px;
				height: 25px;
			}
		}
		
		.car-txt {
			color: #91919C;
			font-size: 12px;
			margin-top: 3px;
		}
	}
	
	.bottom-layout {
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: fixed;
		height: $bottomHeight;
		background-color: #FFFFFF;
		border-top-color: #F2F2F2;
		border-top-width: 0.5px;
		border-top-style: solid;
		
		.service-layout {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 55px;
			height: $bottomHeight;
			margin-left: 65px;
			
			.service-icon {
				width: 20px;
				height: 20px;
			}
			
			.service-txt {
				color: #91919C;
				font-size: 12px;
				margin-top: 3px;
			}
		}
		
		.btn-layout {
			display: flex;
			flex-direction: row;
			
			.add {
				height: $bottomHeight;
				line-height: $bottomHeight;
				font-size: 14px;
				color: #FFFFFF;
				background-color: #00AAFF;
				padding-left: 13px;
				padding-right: 13px;
			}
			
			.buy {
				background-color: #007AFF;
			}
			
		}
		
	}
	
</style>
