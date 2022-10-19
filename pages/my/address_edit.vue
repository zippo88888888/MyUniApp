<template>
	<view>
		<view class="layout">
			<text class="lab m-l">收货人：</text>
			<input class="input m-r" v-model="item.name" placeholder-class="placeholder-class" type="text"
				confirm-type="next" maxlength="20" placeholder="请输入收货人姓名" />
		</view>
		<view class="layout">
			<text class="lab m-l">手机号：</text>
			<input class="input m-r" v-model="item.phone" type="number" placeholder-class="placeholder-class"
				confirm-type="next" maxlength="11" placeholder="请输入收货人手机号" />
		</view>
		<view class="layout" v-on:click="openPicker()">
			<text class="lab m-l">地区：</text>
			<text class="lab-unselected"
				v-bind:class="[ item.area != '请选择地区' ? 'lab-selected' : '' ]">{{item.area}}</text>
			<image class="jt m-r" src="../../static/pic/right_jt.png"></image>
		</view>
		<view class="layout layout2">
			<text class="info-lab m-l">详细地址：</text>
			<textarea class="info-text" v-model="item.address" confirm-type="next" placeholder-class="placeholder-class"
				placeholder="请输入详细地址"></textarea>
		</view>
		<view class="layout">
			<text class="lab m-l">邮编：</text>
			<input class="input m-r" v-model="item.code" type="number" placeholder-class="placeholder-class"
				confirm-type="done" maxlength="6" placeholder="请输入邮编(非必填项)" />
		</view>
		<view class="layout-switch">
			<text class="lab m-l">默认地址：</text>
			<switch class="m-r" @change="switchChange" color="#007AFF" style="transform: scale(0.7);"
				v-bind:checked="item.isDefault"></switch>
		</view>
		<view class="add-layout">
			<text class="add-btn" v-on:click="submit()">{{btnTitle}}</text>
		</view>
		<lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
	</view>
</template>

<script>
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	export default {
		components: {
			"lotus-address": lotusAddress
		},
		data() {
			return {
				isAdd: 0,
				btnTitle: "新增",
				item: {
					id: "",
					name: "",
					phone: "",
					area: "请选择地区",
					address: "",
					code: "",
					isDefault: false
				},
				lotusAddressData: { // 省市区数据 
					visible: false,
					provinceName: '',
					cityName: '',
					townName: '',
				},
				region: ''
			}
		},
		methods: {
			openPicker() { // 打开picker
				this.lotusAddressData.visible = true;
				// this.lotusAddressData.provinceName = '广东省'
				// this.lotusAddressData.cityName = '广州市'
				// this.lotusAddressData.townName = '白云区'
			},
			choseValue(res) { // 回传已选的省市区的值
				console.log(res);
				// visible为显示与关闭组件标识true显示false隐藏
				this.lotusAddressData.visible = res.visible;
				// res.isChose = 1省市区已选 res.isChose = 0;未选
				if (res.isChose) {
					this.lotusAddressData.provinceName = res.province //省
					this.lotusAddressData.cityName = res.city //市
					this.lotusAddressData.townName = res.town //区
					this.region = res.province + res.city + res.town 
					this.item.area = this.region
				}
			},
			switchChange: function(s) {
				this.item.isDefault = s.detail.value
				uni.showToast({
					icon: 'none',
					title: "" + this.item.isDefault
				})
			},
			submit: function() {
				this.setResult()
			},
			getEventChannel: function() { // 获取 eventChannel
				// #ifdef APP-NVUE
				const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
				// #endif
				// #ifndef APP-NVUE
				const eventChannel = this.getOpenerEventChannel();
				// #endif
				return eventChannel
			},
			getLastPageData: function() { // 获取上一个界面传递的值
				var oldItem = this.item
				// 监听getAddressBean事件，获取上一页面通过eventChannel传送到当前页面的数据
				this.getEventChannel().on('getAddressBean', function(item) {
					var newItem = JSON.parse(item)
					oldItem.id = newItem.id
					oldItem.name = newItem.name
					oldItem.phone = newItem.phone
					oldItem.area = newItem.area
					oldItem.address = newItem.address
					oldItem.code = newItem.code
					oldItem.isDefault = newItem.isDefault
					if (oldItem.area === null || oldItem.area === undefined || oldItem.area.length <= 0) {
						oldItem.area = "请选择地区"
					}
				})
			},
			setResult: function(intent) { // 将值传递给上个页面
				// 通过 eventChannel 将值 传递给上个页面，类似 Activity 中的 setResult
				this.getEventChannel().emit('onActivityResult', {
					data: 'test'
				});
			}
		},
		onLoad: function(option) {
			this.getLastPageData()
			this.isAdd = option.isAdd
		},
		onReady: function() {
			var newTitle = ""
			if (this.isAdd == 1) {
				newTitle = "新增地址"
				this.btnTitle = "新增"
			} else {
				newTitle = "编辑地址"
				this.btnTitle = "编辑"
			}
			uni.setNavigationBarTitle({
				title: newTitle
			});
		}
	}
</script>

<style lang="scss">
	.placeholder-class {
		color: #91919C;
	}

	.layout {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 50px;
		background-color: #FFFFFF;
		margin-bottom: 1px;
	}

	.layout2 {
		height: 100px;
	}

	.lab {
		width: 100px;
		color: #000000;
		font-size: 14px;
		text-align: left;
	}

	.lab-unselected {
		flex: 1;
		font-size: 14px;
		color: #91919C;
	}

	.lab-selected {
		color: #000000;
	}

	.info-lab {
		width: 100px;
		height: 87px;
		color: #000000;
		margin-top: 13px;
		font-size: 14px;
		text-align: left;
	}

	.info-text {
		height: 74px;
		margin-top: 13px;
		margin-bottom: 13px;
		font-size: 14px;
		flex: 1;
	}

	.jt {
		width: 13px;
		height: 13px;
	}

	.input {
		flex: 1;
		font-size: 14px;
		color: #000000;
	}

	.layout-switch {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		background-color: #FFFFFF;
	}

	.add-layout {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 60px;
		border-top-color: $uni-bg-color;
		border-top-width: 1px;
		background-color: #FFFFFF;

		.add-btn {
			position: absolute;
			left: 13px;
			right: 13px;
			top: 10px;
			bottom: 10px;
			color: #FFFFFF;
			font-size: 14px;
			background-color: #007AFF;
			border-radius: 3px;
			text-align: center;
			line-height: 40px;
		}
	}
</style>
