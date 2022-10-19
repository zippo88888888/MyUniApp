<template>
	<view class="ticker-layout">
		<view class="btn-layout">
			<text class="cancel" v-on:click="close()">取消</text>
			<text class="down" v-on:click="selectTicker()">确认</text>
		</view>
		<scroll-view class="list" scroll-y="true">
			<view class="list-item" v-for="(item,index) in tickerList" :key="index" v-on:click="itemClick(item,index)">
				<view class="left-layout" v-bind:class="[item.status == 1 ? 'yes-layout' : 'failed-layout']">
					<text class="price">{{item.jianPrice}}</text>
					<text class="jian-price">满{{item.manPrice}}猿币</text>
				</view>
				<view class="center-layout">
					<text class="txt m-l" v-bind:class="[item.status == 1 ? 'yes-color' : 'failed-color']">{{getTypeByType(item.type)}}</text>
					<text class="time m-l">{{item.time}}</text>
				</view>
				<image class="radio m-r" v-bind:src="index == selectedIndex ? radioYes : radioNo"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const TYPE_ANY = 0;
	const TYPE_DIAN = 1;
	const TYPE_XL = 2;
	const TYPE_TS = 3;
	const TYPE_JK = 4;
	
	export default {
		emits: ['dismissTickerDialog'],
		props: {
			orderNo: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				radioNo: "../../static/pic/radio_n.png",
				radioYes: "../../static/pic/radio_y.png",
				selectedIndex: -1,
				tickerList: [
					{ id: "11", status: 1, jianPrice: 20, manPrice: 100, type: 0, time: "2021/12/1 23:59:59前使用" },
					{ id: "12", status: 1, jianPrice: 50, manPrice: 5000, type: 1, time: "2021/12/1 23:59:59前使用" },
					{ id: "13", status: 0, jianPrice: 10, manPrice: 100, type: 2, time: "2021/12/1 23:59:59前使用" },
					{ id: "14", status: 0, jianPrice: 20, manPrice: 500, type: 3, time: "2021/12/1 23:59:59前使用" },
					{ id: "15", status: 0, jianPrice: 30, manPrice: 1000, type: 4, time: "2021/12/1 23:59:59前使用" },
				]
			}
		},
		methods: {
			itemClick: function(item,index) {
				if (this.selectedIndex == index) return
				if (item.status == 0) return
				this.selectedIndex = index
			},
			selectTicker: function() {
				if (this.selectedIndex == -1) {
					uni.showToast({
						icon: 'none',
						title: "请选择一张优惠券！"
					})
					return
				}
				var item = this.tickerList[this.selectedIndex]
				this.$emit('dismissTickerDialog', item)
			},
			getTypeByType: function(type) {
				var str = ""
				switch (type) {
					case TYPE_ANY:
						str = "全品类使用"
						break;
					case TYPE_DIAN:
					 str = "限购买电子产品使用"
						break;
					case TYPE_XL:
						str = "限购买虚拟物品使用"
						break;
					case TYPE_TS:
						str = "限购买图书物品使用"
						break;
					case TYPE_JK:
						str = "限购买健康产品使用"
						break;
				}
				return str
			},
			close: function() {
				this.$emit('dismissTickerDialog')
			}
		}
	}
</script>

<style lang="scss">
	$btnHeight: 45px;
	$itemHeight: 80px;
	$radius: 10px;

	

	.ticker-layout {
		background-color: #F2F2F2;
		display: flex;
		flex-direction: column;

		.btn-layout {
			display: flex;
			flex-direction: row;
			height: $btnHeight;
			justify-content: space-between;
			align-items: center;

			.cancel {
				width: 60px;
				height: $btnHeight;
				line-height: $btnHeight;
				text-align: center;
				color: #91919C;
			}

			.down {
				width: 60px;
				height: $btnHeight;
				line-height: $btnHeight;
				text-align: center;
				color: #007AFF;
			}
		}

		.list {
			max-height: 360px;
		}

		.list-item {
			display: flex;
			flex-direction: row;
			height: $itemHeight;
			border-radius: $radius;
			background-color: #FFFFFF;
			margin-left: 13px;
			margin-right: 13px;
			align-items: center;
			margin-bottom: 10px;

			.left-layout {
				width: 110px;
				height: $itemHeight;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-top-left-radius: $radius;
				border-bottom-left-radius: $radius;

				.price {
					color: #FFFFFF;
					font-size: 22px;
					font-weight: bold;
				}

				.jian-price {
					color: #FFFFFF;
					font-size: 14px;
					margin-top: 3px;
				}

			}

			.center-layout {
				height: $itemHeight;
				display: flex;
				flex-direction: column;
				justify-content: center;
				flex: 1;

				.time {
					color: #91919C;
					font-size: 12px;
					margin-top: 5px;
				}
			}

			.radio {
				width: 17px;
				height: 17px;
			}
		}
	}
	
	.yes-layout {
		background-color: #007AFF;
	}
	
	.failed-layout {
		background-color: #91919C;
	}
	
	.yes-color {
		color: #000000;
	}
	
	.failed-color {
		color: #91919C;
	}
</style>
