<template>
	<view class="comment-layout">
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
		<view class="comment-list"></view>
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
	</view>
</template>

<script>
	import SpeakDialog from '../dialog/speakDialog.vue';
	import MsgUtil from '../../util/msg.js';
	export default {
		components: {
			SpeakDialog
		},
		data() {
			return {
				zanPic: "../../static/pic/dz.png",
				zanPic2: "../../static/pic/dz2.png",
				isDz: false,
				placeholderStr: "说点什么吧",
				commentList: ["好大一个月", "浩淇好像会飞", "大眼睛维克兹", "好大一个月", "浩淇好像会飞", "大眼睛维克兹"],
			}
		},
		methods: {
			userIconitemClick: function(item) {
				MsgUtil.toast(item + " 头像")
			},
			itemClick: function(item) {
				this.placeholderStr = "回复 [" + item + "]"
				this.showSpeakDialog()
			},
			itemDz: function(item, index) {
				MsgUtil.toast(item + "点赞")
			},
			itemChildClick: function(item) {
				uni.navigateTo({
					url: "./comment_child?id=1"
				})
			},
			speak: function() {
				this.placeholderStr = "说点什么吧"
				this.showSpeakDialog()
			},
			dz: function() {
				this.isDz = !this.isDz
			},
			showSpeakDialog: function() {
				this.$refs.speakDialog.open("bottom")
			},
			closeThisSpeakDialog: function(value) {
				MsgUtil.toast(value)
				this.$refs.speakDialog.close()
			}
		},
		onPullDownRefresh: function(option) {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 500)
		}
	}
</script>

<style lang="scss">
	@import '../../util/comment.css';

	.comment-layout {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
	}
	
	.comment-list {
		margin-bottom: 50px;
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
