<template>
	<view class="space-info-layout">
		<view class="list-header">
			<image class="icon" src="../../static/pic/my_header.jpg"></image>
			<view class="layout">
				<text class="name txt-max-1">用户名</text>
				<text class="time">2021-07-01 20:39</text>
			</view>
		</view>
		<ImagePic9 :picData="testPicList" :needShowAddPic="false" :needShowDelPic="false"></ImagePic9>
		<text class="content-txt">支持小红书多图剪裁微信多图选择单图剪裁多图批量剪裁大图预览支持自定义所有UI包括标题栏底部栏列表item文件夹item剪裁页面预览页面等支持13种视频图片格式混合加载支持过滤掉指定格式文件</text>
		<view class="linee m-t"></view>
		<view class="comment-t">
			<view class="lin"></view>
			<text class="txt">精彩评论</text>
		</view>
		<view class="comment-item" v-for="(item,index) in commentList" :key="index">
			<view class="comment-item-u">
				<image class="comment-item-pic m-l" src="../../static/pic/my_header.jpg"
					@click="userIconitemClick(item)"></image>
				<view class="comment-item-r" @click="itemClick(item)">
					<text class="txt">{{item}}</text>
					<text class="comment-item-time">2021-12-3 20:09:12</text>
				</view>
				<view class="comment-item-zan" @click="itemDz(item,index)">
					<image class="comment-item-zan-pic" src="../../static/pic/dz.png"></image>
					<text class="comment-item-zan-count">100</text>
				</view>
			</view>
			<view class="comment-item-content">
				<text class="comment-item-txt txt m-r" @click="itemClick(item)">论的内容我是评论的内容论的内容我是评论的内容</text>
				<view class="comment-item-child m-r" @click="itemChildClick(item)">
					<text class="cic-name">孤独的赶鸭人：<text class="cic-content">先天下之忧而忧，后天下之乐而乐</text></text>
					<text class="cic-name">楼上漏水：<text class="cic-content">你说得都对</text></text>
					<text class="cic-all">查看全部回复></text>
				</view>
			</view>
		</view>
		<view class="list-bottom" @click="allClick()">
			<text class="txt-empty" v-if="commentList.length <= 0">暂无评论</text>
			<text class="txt-all" v-else>查看全部评论</text>
		</view>
		<view class="bottom-layout">
			<text class="talk m-l" @click="speak()">说点什么吧</text>
			<view class="like-layout" @click="dz()">
				<image class="like-img" :src="isDz ? zanPic2 : zanPic"></image>
				<text class="like-count">100</text>
			</view>
		</view>
		<view>
			<uni-popup ref="speakDialog">
				<SpeakDialog :placeholderStr="placeholderStr" @closeSpeakDialog="closeThisSpeakDialog"></SpeakDialog>
			</uni-popup>
		</view>
		<!-- 登录弹窗 -->
		<view>
			<uni-popup ref="loginDialog">
				<LoginDialog @loginSuccess="loginSuccess()" @dissmisDialog="dissmisLoginDialog()"/>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import SpeakDialog from '../dialog/speakDialog.vue';
	import LoginDialog from '../dialog/loginDialog.vue';
	import ImagePic9 from '../../components/ImagePic9.vue';
	import UserUtil from '../../util/userUtil.js';
	import MsgUtil from '../../util/msg.js';
	export default {
		components: {
			ImagePic9,
			SpeakDialog,
			LoginDialog
		},
		data() {
			return {
				zanPic: "../../static/pic/dz.png",
				zanPic2: "../../static/pic/dz2.png",
				isDz: false,
				isEmptyComment: false,
				placeholderStr: "说点什么吧",
				testPicList: [
					{ picUrl: "../../static/pic/my_header.jpg", },
					{ picUrl: "../../static/pic/my_header.jpg", },
					{ picUrl: "../../static/pic/my_header.jpg", },
					{ picUrl: "../../static/pic/my_header.jpg", },
					{ picUrl: "../../static/pic/my_header.jpg", },
					{ picUrl: "../../static/pic/my_header.jpg", },
					{ picUrl: "../../static/pic/my_header.jpg", },
					{ picUrl: "../../static/pic/my_header.jpg", },
					{ picUrl: "../../static/pic/my_header.jpg", },
				],
				commentList: ["好大一个月", "浩淇好像会飞", "大眼睛维克兹"],
			}
		},
		methods: {
			userIconitemClick: function(item) { // 头像点击
				if (!UserUtil.isLogin()) {
					this.showLoginDialog()
				} else {
					MsgUtil.toast(item + " 头像")
				}
			},
			itemClick: function(item) { // item 点击
				if (!UserUtil.isLogin()) {
					this.showLoginDialog()
				} else {
					this.placeholderStr = "回复 [" + item + "]"
					this.showSpeakDialog()
				}
			},
			itemDz: function(item, index) { // item 点赞
				if (!UserUtil.isLogin()) {
					this.showLoginDialog()
				} else {
					MsgUtil.toast(item + "点赞")
				}
			},
			itemChildClick: function(item) { // 查看全部回复
				if (!UserUtil.isLogin()) {
					this.showLoginDialog()
				} else {
					uni.navigateTo({
						url: "./comment_child?id=1"
					})
				}
			},
			allClick: function() { // 查看全部评论
				if (!UserUtil.isLogin()) {
					this.showLoginDialog()
				} else {
					if (this.commentList.length > 0) {
						uni.navigateTo({
							url: "./comment?id=1"
						})
					}
				}
			},
			speak: function() { // 底部 发表评论
				if (!UserUtil.isLogin()) {
					this.showLoginDialog()
				} else {
					this.placeholderStr = "说点什么吧"
					this.showSpeakDialog()
				}
			},
			dz: function() { // 底部 点赞
				if (!UserUtil.isLogin()) {
					this.showLoginDialog()
				} else {
					this.isDz = !this.isDz
				}
			},
			showSpeakDialog: function() {
				this.$refs.speakDialog.open("bottom")
			},
			closeThisSpeakDialog: function(value) {
				MsgUtil.toast(value)
				this.$refs.speakDialog.close()
			},
			showLoginDialog: function() {
				this.$refs.loginDialog.open("center")
				MsgUtil.toast("请先去登录！")
			},
			dissmisLoginDialog: function() {
				this.$refs.loginDialog.close()
			},
			loginSuccess: function() {
				this.dissmisLoginDialog()
			}
		},
		onNavigationBarButtonTap: function(option) {
			if (!UserUtil.isLogin()) {
				this.showLoginDialog()
			} else {
				MsgUtil.log("option" + JSON.stringify(option))
				MsgUtil.toast("share")
			}
		}
	}
</script>

<style lang="scss">
	@import '../../util/comment.css';
	$l-r: 13px;
	$l-r-real-need: 10px;

	.space-info-layout {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
	}

	.list-header {
		flex-direction: row;
		display: flex;
		height: 55px;
		margin-top: 10px;
		align-items: center;
		padding-left: $l-r;
		padding-right: $l-r;

		.icon {
			width: 42px;
			height: 42px;
			border-radius: 21px;
		}

		.layout {
			flex: 1;
			margin-left: 15px;

			.name {
				color: #000000;
				font-size: 15px;
				font-weight: bold;
				margin-bottom: 3px;
			}

			.time {
				color: #91919C;
				font-size: 13px;
			}
		}
	}

	.content-txt {
		font-size: 14px;
		color: #000000;
		padding-left: 13px;
		padding-right: 13px;
	}

	.linee {
		background-color: #F2F2F2;
		height: 10px;
	}

	.comment-t {
		display: flex;
		flex-direction: row;
		height: 45px;
		align-items: center;
		border-bottom-color: #F2F2F2;
		border-bottom-width: 1px;
		border-bottom-style: solid;

		.lin {
			width: 5px;
			height: 30px;
			background-color: #007AFF;
			margin-right: 10px;
		}

	}

	.list-bottom {
		height: 40px;
		background-color: #F2F2F2;
		margin-bottom: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.txt-all {
			color: #007AFF;
			font-size: 12px;
		}

		.txt-empty {
			color: #91919C;
			font-size: 12px;
		}
	}

	.bottom-layout {
		position: fixed;
		flex-direction: row;
		align-items: center;
		display: flex;
		left: 0;
		right: 0;
		bottom: 0;
		height: 50px;
		border-top-color: #F2F2F2;
		border-top-width: 1px;
		border-top-style: solid;
		background-color: #FFFFFF;

		.talk {
			flex: 1;
			height: 30px;
			background-color: #F2F2F2;
			line-height: 30px;
			font-size: 12px;
			padding-left: 10px;
			color: #91919C;
			border-radius: 20px;
		}

		.like-layout {
			width: 80px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.like-img {
				width: 15px;
				height: 15px;
			}

			.like-count {
				color: #91919C;
				font-size: 13px;
				margin-left: 5px;
			}
		}
	}
</style>
