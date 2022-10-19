<template>
	<view class="pic-layout">
		<uni-grid :highlight="false" :column="3" :showBorder="false">
			<uni-grid-item v-for="(item,index) in picList" :key="index" :index="index">
				<view class="grid-item-box">
					<image class="box-image" :style="'width:' + itemNeedWH + 'px;' + 'height:' + itemNeedWH + 'px'"
						v-bind:src="item.picUrl" @click="picItemClick(item, index)" mode="aspectFill"></image>
					<image @click="delPic(index)" class="box-del" src="../static/pic/del-1.png"
						v-if="!item.isAdd && needShowDelPic"></image>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	import MsgUtil from '../util/msg.js';
	export default {
		props: {
			picLength: { // 图片最大个数
				type: Number,
				default: 9,
			},
			needShowAddPic: { // 是否需要显示 添加按钮图片
				type: Boolean,
				default: true,
			},
			needShowDelPic: { // 是否需要显示 删除按钮图片
				type: Boolean,
				default: true,
			},
			picData: { // 图片数据 格式为：[{ picUrl: "" }]
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				itemNeedWH: 0,
				maxPicLength: this.picLength,
				addBean: { // 添加图片的实体类型
					isAdd: true,
					picUrl: require("../static/pic/add_community_pic.png")
				},
				picList: this.picData
			}
		},
		methods: {
			picItemClick: function(item, index) {
				var that = this
				if (item.isAdd) { // 选择图片
					var needCount = this.maxPicLength - this.getPicListSize()
					uni.chooseImage({
						count: needCount,
						success: (resultData) => {
							var selectedList = resultData.tempFilePaths
							that.onPicResult(selectedList)
						}
					})
				} else { // 预览图片
					var preIndex = index
					if (this.findAddPicIndex() != -1) {
						preIndex = index - 1
					}
					uni.previewImage({
						current: preIndex,
						urls: this.getPicArray()
					})
				}
			},
			onPicResult: function(selectedList) { // 图片选择成功后
				for (var i = 0; i < selectedList.length; i++) {
					var selectedPicItem = selectedList[i]
					this.picList.push({
						isAdd: false,
						picUrl: selectedPicItem,
						needDel: true
					})
				}
				if (this.getPicListSize() == this.maxPicLength) {
					this.picList.shift() // 删除第一张 添加 的图片
				}
				this.$emit("getPicList", this.getPicArray())
			},
			delPic: function(index) { // 删除图片
				this.picList.splice(index, 1)
				if (this.findAddPicIndex() == -1) {
					this.picList.splice(0, 0, this.addBean)
				}
				this.$emit("getPicList", this.getPicArray())
			},
			findAddPicIndex: function() { // 找到 添加图片 的下标 没有为-1；
				var index = -1
				for (var i = 0; i < this.picList.length; i++) {
					if (this.picList[i].isAdd) {
						index = i
						break
					}
				}
				return index
			},
			getPicListSize: function() { // 获取 真正 的图片List Size
				if (this.findAddPicIndex() == -1) {
					return this.picList.length
				} else {
					return this.picList.length - 1
				}
			},
			getPicArray: function() { // 获取真正的图片数组
				var pics = []
				for (var i = 0; i < this.picList.length; i++) {
					var item = this.picList[i]
					if (!item.isAdd) {
						pics.push(item.picUrl)
					}
				}
				return pics
			},
			callItemWidth: function(screenWidth) { // 动态计算 宫格图片的宽和高
				// 13 为 $l-r；10为 $l-r-real-need；3 为 margin-right；一行显示3 个
				var needWH = (screenWidth - 13 - 10 - 3 * 3) / 3
				MsgUtil.log("screenWidth --- " + screenWidth + " needWH --- " + needWH)
				this.itemNeedWH = needWH
			}
		},
		mounted: function(m) {
			var that = this
			if (that.needShowAddPic) {
				that.picList.splice(0, 0, that.addBean)
			}
			uni.getSystemInfo({
				success: (systemInfo) => {
					that.callItemWidth(systemInfo.screenWidth)
				}
			})
		}
	}
</script>

<style lang="scss">
	$l-r: 13px;
	$l-r-real-need: 10px;

	.pic-layout {
		padding-left: $l-r;
		padding-right: $l-r-real-need;
		background-color: #FFFFFF;
		padding-top: 7px;
		padding-bottom: 10px;

		.grid-item-box {
			flex: 1;
			flex-direction: column;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 3px;
			margin-right: 3px;

			.box-image {
				border-radius: 5px;
			}

			.box-del {
				position: absolute;
				right: 7px;
				top: 7px;
				width: 20px;
				height: 20px;
			}
		}
	}
</style>
