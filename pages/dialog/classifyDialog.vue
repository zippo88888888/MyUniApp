<template>
	<view class="list-root" v-if="show"  @touchmove.stop.prevent="moveHandle">
		<view class="list-layout">
			<view class="list" v-if="listIndex == 1">
				<view class="list-item" v-for="(item,index) in list1" @click="itemClick(1,item,index)">
					<text class="item-txt"
						v-bind:class="[index == index1 ? 'selected-txt' : 'un-selected-txt']">{{item.value}}</text>
					<image class="item-icon" src="../../static/pic/gou2.png" v-if="index == index1"></image>
				</view>
			</view>
			<view class="list" v-if="listIndex == 2">
				<view class="list-item" v-for="(item,index) in list2" @click="itemClick(2,item,index)">
					<text class="item-txt"
						v-bind:class="[index == index2 ? 'selected-txt' : 'un-selected-txt']">{{item.value}}</text>
					<image class="item-icon" src="../../static/pic/gou2.png" v-if="index == index2"></image>
				</view>
			</view>
			<view class="list" v-if="listIndex == 3">
				<view class="list-item" v-for="(item,index) in classifyList" @click="itemClick(3,item,index)">
					<text class="item-txt"
						v-bind:class="[index == index3 ? 'selected-txt' : 'un-selected-txt']">{{item.value}}</text>
					<image class="item-icon" src="../../static/pic/gou2.png" v-if="index == index3"></image>
				</view>
			</view>
		</view>
		<view class="list-bottom" @click="close()"></view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			listIndex: { // 1：综合；2：价格；3：分类
				type: Number,
				default: 1
			},
			selectedIndex1: { // 综合选择的下标
				type: Number,
				default: 0
			},
			selectedIndex2: { // 价格选择的下标
				type: Number,
				default: -1
			},
			selectedIndex3: { // 分类选择的下标
				type: Number,
				default: 0
			},
			classifyList: { // 分类数据，通过接口访问的
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				list1: [{
					type: 1,
					value: "综合"
				}, {
					type: 2,
					value: "人气"
				}, {
					type: 3,
					value: "成交数"
				}],
				list2: [{
					type: -1,
					value: "全部"
				},
				{
					type: 1,
					value: "价格从低到高"
				}, {
					type: 2,
					value: "价格从高到低"
				}],
				index1: this.selectedIndex1,
				index2: this.selectedIndex2,
				index3: this.selectedIndex3,
			}
		},
		methods: {
			moveHandle: function() {
				// 禁止蒙层下面的视图滚动
			},
			itemClick: function(listIndex, item, index) {
				switch (listIndex) {
					case 1:
						this.index1 = index
						break;
					case 2:
						this.index2 = index
						break;
					case 3:
						this.index3 = index
						break;
				}
				this.$emit('onClassifySelected', listIndex, index, item)
				this.close()
			},
			close: function() {
				this.$emit('closeClassifyDialog')
			}
		},
	}
</script>

<style lang="scss">
	.list-root {
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		top: 124px;
		/* #endif */
		/* #ifndef H5 */
		top: 80px;
		/* #endif */
		bottom: 0;
		z-index: 100;
		background-color: rgba($color: #000000, $alpha: 0.5);
		
		display: flex;
		flex-direction: column;
	}

	.list-layout {
		display: flex;
		flex-direction: column;
	}
	
	.list-bottom {
		display: flex;
		flex-direction: row;
		flex: 1;
	}

	.list {
		background-color: #FFFFFF;

		.list-item {
			height: 35px;
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			align-items: center;
			border-bottom-color: #F2F2F2;
			border-bottom-width: 0.5px;

			.item-txt {
				font-size: 14px;
				margin-left: 20px;
			}

			.item-icon {
				width: 17px;
				height: 17px;
				margin: 20px;
			}
		}
	}

	.selected-txt {
		color: #007AFF;
	}

	.un-selected-txt {
		color: #91919C;
	}
</style>
