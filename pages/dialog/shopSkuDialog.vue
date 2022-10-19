<template>
	<view class="sku-layout">
		<view class="layout1">
			<image class="pic" src="../../static/pic/my_header.jpg" mode="aspectFill"></image>
			<view class="arc-layout">
				<view class="info-layout">
					<text class="price">139999猿币</text>
					<text class="count">库存：2</text>
					<text class="selected-txt">{{selectedGGAndColorStr}}</text>
					<image class="close" src="../../static/pic/close2.png" @click="colseDialog()"></image>
				</view>
			</view>
		</view>
		<view class="layout2">
			<view class="line m-t"></view>
			<text class="txt m-t m-l">规格</text>
			<view class="sku-item-layout">
				<text class="sku-item" @click="ggItemClick(item,index)" v-bind:class="'sku-selected-' + item.state" v-for="(item,index) in ggList" :key="item.code">{{item.title}}</text>
			</view>
			<text class="txt m-t m-l">颜色</text>
			<view class="sku-item-layout">
				<text class="sku-item" @click="colorItemClick(item,index)" v-bind:class="'sku-selected-' + item.state" v-for="(item,index) in colorList" :key="item.code">{{item.title}}</text>
			</view>
			<view class="count-layout">
				<text class="txt m-l">购买数量</text>
				<uni-number-box class="m-r" @change="countChange" v-model="count" :min="1" :max="max"/>
			</view>
			<view class="btn-layout">
				<text @click="buy()" class="btn" v-bind:class="[isBuy ? 'btn-buy-color' : 'btn-add-car-color']">{{isBuy ? '立即购买' : '加入购物车'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import MsgUtil from '../../util/msg.js';
	import Utils from '../../util/utils.js';
	export default {
		props: {
			isBuy: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				btnTitle: '加入购物车',
				count: 1,
				max: 2,
				skuList: [
					{code: "3050Ti", skus:["黑色","银色"]},
					{code: "3060", skus:["黑色"]},
					{code: "3070", skus:["黑色"]},
					{code: "3080", skus:["黑色","灰色"]},
					{code: "3080S", skus:["黑色","白色","灰色"]},
					{code: "3080Ti", skus:["黑色","黑色-SRGB"]},
					{code: "3090", skus:["黑色","白色","白色-高达定制-SRGB"]},
					{code: "黑色", skus:["3050Ti","3060","3070","3080","3080S","3080Ti","3090"]},
					{code: "银色", skus:["3050Ti"]},
					{code: "灰色", skus:["3080", "3080S"]},
					{code: "白色", skus:["3080S", "3090"]},
					{code: "黑色-SRGB", skus:["3080Ti"]},
					{code: "白色-高达定制-SRGB", skus:["3090"]},
				],
				ggList: [
					{title: "RTX-3050Ti", code: "3050Ti", state: 0},
					{title: "RTX-3060", code: "3060", state: 0},
					{title: "RTX-3070", code: "3070", state: 0},
					{title: "RTX-3080", code: "3080", state: 0},
					{title: "RTX-3080S", code: "3080S", state: 0},
					{title: "RTX-3080Ti", code: "3080Ti", state: 0},
					{title: "RTX-3090", code: "3090", state: 0},
				],
				colorList: [
					{title: "黑色", code: "黑色", state: 0},
					{title: "银色", code: "银色", state: 0},
					{title: "灰色", code: "灰色", state: 0},
					{title: "白色", code: "白色", state: 0},
					{title: "黑色-SRGB", code: "黑色-SRGB", state: 0},
					{title: "白色-高达定制-SRGB", code: "白色-高达定制-SRGB", state: 0},
				],
				ggSelectedIndex: -1, // 规格选中的下标
				colorSelectedIndex: -1, // 颜色选中的下标
				selectedGGAndColorStr: '请选择规格和颜色',
			}
		},
		methods: {
			ggItemClick: function(item, index) { // 规格 item 点击
				if (item.state == 2) {
					MsgUtil.log("不能选中的状态")
					return
				}
				var lastSelectedIndex = this.getLastSelectedForGGList()
				if (lastSelectedIndex == index) {
					var lastBean = this.ggList[lastSelectedIndex]
					if (lastBean.state == 0) { // 未选中变为选中
						this.ggSelectedIndex = index
						lastBean.state = 1
						this.getColorListByGGItem(lastBean)
					} else {  // 选中变为未选中
						this.ggSelectedIndex = -1
						lastBean.state = 0
						this.getColorListByGGItem(null)
					}
				} else {
					if (lastSelectedIndex != -1) { // 之前有选中，变为未选中
						this.ggList[lastSelectedIndex].state = 0
					}
					this.ggSelectedIndex = index
					var nowBean = this.ggList[index]
					nowBean.state = 1
					this.getColorListByGGItem(nowBean)
				}
			},
			getColorListByGGItem: function(item)  { // 根据规格选中的item计算出 对应颜色数据
				var that = this
				if (item == null) { // 规格未选择，颜色全部可选
					for (var j = 0; j < that.colorList.length; j++) {
						// 判断之前是否选中了颜色
						if (that.colorSelectedIndex == j) {
							that.colorList[j].state = 1
						} else {
							that.colorList[j].state = 0
						}
					}
				} else {
					// 当前选中规格对应的颜色数据
					var colorSkus = []
					that.skuList.every((bean) => {
						if (item.code == bean.code) {
							colorSkus = bean.skus
							return false
						} else {
							return true
						}
					})
					// 先将之前的颜色数据 全部变为不可点击状态 方便后续只判断一次即可
					for (var j = 0; j < that.colorList.length; j++) {
						that.colorList[j].state = 2
					}
					// 与颜色数据进行比对
					for (var i = 0; i < colorSkus.length; i++) {
						
						var colorItem = colorSkus[i]
						for (var j = 0; j < that.colorList.length; j++) {
							var colorBean = that.colorList[j]
							if (colorBean.code == colorItem) {
								
								// 判断之前是否已经选中了颜色数据
								if (that.colorSelectedIndex == j) {
									colorBean.state = 1
								} else {
									colorBean.state = 0
								}
								
								break
							}
						}
					}
					
					// that.colorList.forEach(item=> {
					// 	MsgUtil.log("title:" + item.title + "state:" + item.state)
					// })
				}
				this.getSelectedGGAndColor()
			},
			colorItemClick: function(item,index) { // 颜色 item 点击
				if (item.state == 2) {
					MsgUtil.log("不能选中的状态")
					return
				}
				var lastSelectedIndex = this.getLastSelectedForColorList()
				if (lastSelectedIndex == index) {
					var lastBean = this.colorList[lastSelectedIndex]
					if (lastBean.state == 0) { // 未选中变为选中
						this.colorSelectedIndex = index
						lastBean.state = 1
						this.getGGListByColorItem(lastBean)
					} else {  // 选中变为未选中
					this.colorSelectedIndex = -1
						lastBean.state = 0
						this.getGGListByColorItem(null)
					}
				} else {
					if (lastSelectedIndex != -1) { // 之前有选中，变为未选中
						this.colorList[lastSelectedIndex].state = 0
					}
					this.colorSelectedIndex = index
					var nowBean = this.colorList[index]
					nowBean.state = 1
					this.getGGListByColorItem(nowBean)
				}
			},
			getGGListByColorItem: function(item) { // 根据颜色选中的item计算出 对应规格数据
				var that = this
				if (item == null) { // 颜色未选择，规格全部可选
					for (var j = 0; j < that.ggList.length; j++) {
						// 判断之前是否选中了规格
						if (that.ggSelectedIndex == j) {
							that.ggList[j].state = 1
						} else {
							that.ggList[j].state = 0
						}
					}
				} else {
					// 当前选中颜色对应的规格数据
					var ggSkus = []
					that.skuList.every((bean) => {
						if (item.code == bean.code) {
							ggSkus = bean.skus
							return false
						} else {
							return true
						}
					})
					// 先将之前的规格数据 全部变为不可点击状态 方便后续只判断一次即可
					for (var j = 0; j < that.ggList.length; j++) {
						that.ggList[j].state = 2
					}
					// 与规格数据进行比对
					for (var i = 0; i < ggSkus.length; i++) {
						var colorItem = ggSkus[i]
						
						for (var j = 0; j < that.ggList.length; j++) {
							var ggBean = that.ggList[j]
							if (ggBean.code == colorItem) {
								
								// 判断之前是否已经选中了规格数据
								if (that.ggSelectedIndex == j) {
									ggBean.state = 1
								} else {
									ggBean.state = 0
								}
								
								break
							}
						}
					}
					
					// that.ggList.forEach(item=> {
					// 	MsgUtil.log("title:" + item.title + "state:" + item.state)
					// })
				}
				this.getSelectedGGAndColor()
			},
			countChange: function(count) {
				
			},
			buy: function() {
				if (this.ggSelectedIndex == -1) {
					MsgUtil.toast("请选择规格")
					return
				}
				if (this.colorSelectedIndex == -1) {
					MsgUtil.toast("请选择颜色")
					return
				}
				if (this.isBuy) { // 立即购买
					uni.navigateTo({
						url:"../shop/confirm_order"
					})
				} else {
					MsgUtil.toast("加入购物车成功")
				}
				this.colseDialog()
			},
			getSelectedGGAndColor: function() { // 获取已选中的规格和颜色
				var str = ""
				if (this.ggSelectedIndex != -1) {
					str += this.ggList[this.ggSelectedIndex].title + " "
				} 
				if (this.colorSelectedIndex != -1) {
					str += this.colorList[this.colorSelectedIndex].title
				}
				if (Utils.isNull(str)) {
					str = "请选择规格和颜色"
				} else {
					str = "已选：" + str
				}
				this.selectedGGAndColorStr = str
			},
			colseDialog: function() {
				this.$emit('colseSkuDialog')
			},
			getLastSelectedForGGList: function() { // 获取上次规格List选中的 index
				var lastSelectedIndex = -1
				this.ggList.every((item, i) => {
					if (item.state == 1) {
						 lastSelectedIndex = i
						 return false
					} else {
						return true
					}
				})
				return lastSelectedIndex
			},
			getLastSelectedForColorList: function() { // 获取上次颜色List选中的 index
				var lastSelectedIndex = -1
				this.colorList.every((item, i) => {
					if (item.state == 1) {
						 lastSelectedIndex = i
						 return false
					} else {
						return true
					}
				})
				return lastSelectedIndex
			},
		}
	}
</script>

<style lang="scss">
	$imageHeight: 110px;

	.sku-layout {
		display: flex;
		flex-direction: column;
	}

	.sku-selected-0 {
		color: #91919C;
		border-color: #91919C;
	}

	.sku-selected-1 {
		color: #007AFF;
		border-color: #007AFF;
	}
	
	.sku-selected-2 {
		color: #E5E5E5;
		border-color: #E5E5E5;
	}

	.layout1 {
		display: flex;
		position: relative;
		flex-direction: column;
		// background-color: #4CD964;
		height: 120px;
		justify-content: flex-end;

		.pic {
			width: $imageHeight;
			height: $imageHeight;
			left: 13px;
			top: 0;
			position: absolute;
			border-radius: 3px;
		}

		.arc-layout {
			background-color: #FFFFFF;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			width: 100%;

			.info-layout {
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: 135px;
				height: 80px;
				// background-color: #2C405A;

				.price {
					color: #007AFF;
					font-size: 16px;
					font-weight: bold;
				}

				.count {
					color: #000000;
					font-size: 14px;
					margin-top: 3px;
				}

				.selected-txt {
					color: #91919C;
					font-size: 13px;
					margin-top: 3px;
				}

				.close {
					position: absolute;
					right: 5px;
					top: 45px;
					width: 20px;
					height: 20px;
				}
			}

		}

	}

	.layout2 {
		background-color: #FFFFFF;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		
		.sku-item-layout {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			padding-left: 13px;
			padding-right: 8px;
			margin-top: 10px;
			
			.sku-item {
				font-size: 12px;
				padding: 3px 7px;
				margin-right: 5px;
				margin-top: 5px;
				border-radius: 3px;
				border-width: 1px;
				border-style: solid;
			}
		}

		.count-layout {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
			align-items: center;
			height: 50px;
		}

		.btn-layout {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 75px;
			
			.btn {
				position: absolute;
				text-align: center;
				left: 15px;
				right: 15px;
				height: 45px;
				line-height: 45px;
				font-size: 15px;
				color: #FFFFFF;
				border-radius: 5px;
			}
			
		}
		
	}
	
	.btn-buy-color {
		background-color: #007AFF;
	}
	.btn-add-car-color {
		background-color: #00AAFF;
	}
</style>
