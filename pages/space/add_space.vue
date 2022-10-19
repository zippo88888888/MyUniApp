<template>
	<view class="space-layout">
		<view class="txt-area-layout">
			<textarea class="txt-area" @input="inputing" placeholder="请输入内容(300字以内)" placeholder-style="color:#91919C"
				maxlength="300" v-model="inputValue"></textarea>
			<text class="txt-length">还可输入{{maxLength}}字</text>
		</view>
		<ImagePic9 @getPicList="getPicList"></ImagePic9>
		<!-- 登录弹窗 -->
		<view>
			<uni-popup ref="loginDialog">
				<LoginDialog @loginSuccess="loginSuccess()" @dissmisDialog="dissmisDialog()" />
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import UserUtil from '../../util/userUtil.js';
	import MsgUtil from '../../util/msg.js';
	import Utils from '../../util/utils.js';
	import LoginDialog from '../dialog/loginDialog.vue';
	import ImagePic9 from '../../components/ImagePic9.vue';
	export default {
		components: {
			LoginDialog,
			ImagePic9
		},
		data() {
			return {
				inputValue: "",
				maxLength: 300,
			}
		},
		methods: {
			inputing: function(option) {
				var length = option.detail.value.length
				this.maxLength = 300 - length
			},
			getPicList: function(picList) {
				if (picList == null || picList == undefined || picList.length <= 0) {
					MsgUtil.log("picList is empty")
				} else {
					MsgUtil.log(JSON.stringify(picList))
				}
			},
			addSpace: function() { // 发布动态
				if (!UserUtil.isLogin()) {
					MsgUtil.toast("请先去登录！")
					this.$refs.loginDialog.open("center")
					return
				}
				if (Utils.isNull(this.inputValue)) {
					MsgUtil.toast("内容不能为空!")
					return
				}
				MsgUtil.toast("模拟发布成功")
				uni.navigateBack({})
			},
			loginSuccess: function() {
				MsgUtil.toast("模拟登录成功！")
				this.dissmisDialog()
			},
			dissmisDialog: function() {
				this.$refs.loginDialog.close()
			},
		},
		onNavigationBarButtonTap() {
			this.addSpace()
		},
	}
</script>

<style lang="scss">
	$l-r: 13px;
	$l-r-real-need: 10px;

	.space-layout {
		display: flex;
		flex-direction: column;

		.txt-area-layout {
			background-color: #FFFFFF;
			display: flex;
			flex-direction: row;
			padding-left: 10px;
			padding-right: 10px;
			position: relative;

			.txt-area {
				height: 150px;
				font-size: 14px;
				flex: 1;
				color: #000000;
				padding-top: 3px;
				padding-bottom: 30px;

			}

			.txt-length {
				color: #91919C;
				font-size: 12px;
				position: absolute;
				right: 10px;
				bottom: 5px;
			}

		}

	}
</style>
