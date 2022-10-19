<template>
	<view class="cc-layout">
		 <view class="comment-item">
		 	<view class="comment-item-u">
		 		<image class="comment-item-pic m-l" src="../../static/pic/my_header.jpg"
		 			@click="childUserIconClick()"></image>
		 		<view class="comment-item-r" @click="childClick()">
		 			<text class="txt">{{childItemBean}}</text>
		 			<text class="comment-item-time">2021-12-3 20:09:12</text>
		 		</view>
		 		<view class="comment-item-zan" @click="childDz()">
		 			<image class="comment-item-zan-pic" src="../../static/pic/dz.png"></image>
		 			<text class="comment-item-zan-count">100</text>
		 		</view>
		 	</view>
		 	<view class="comment-item-content-n" @click="childClick()">
		 		<text class="comment-item-txt txt m-r">论的内容我是评论的内容论的内容我是评论的内容</text>
		 	</view>
		 </view>
		 <view class="top-line"></view>
		 <view class="comment-item" v-for="(item,index) in childList" :key="index">
		 	<view class="comment-item-u">
		 		<image class="comment-item-pic m-l" src="../../static/pic/my_header.jpg"
		 			@click="itemUserIconClick(item)"></image>
		 		<view class="comment-item-r" @click="itemClick(item)">
		 			<text class="txt">{{item}}</text>
		 			<text class="comment-item-time">2021-12-3 20:09:12</text>
		 		</view>
		 		<view class="comment-item-zan" @click="itemDz(item,index)">
		 			<image class="comment-item-zan-pic" src="../../static/pic/dz.png"></image>
		 			<text class="comment-item-zan-count">100</text>
		 		</view>
		 	</view>
		 	<view class="comment-item-content" @click="itemClick(item)">
		 		<text class="comment-item-txt txt m-r">论的内容我是评论的内容论的内容我是评论的内容</text>
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
	import SpeakDialog from '../dialog/speakDialog.vue'
	import MsgUtil from '../../util/msg.js';
	export default {
		components: {
			SpeakDialog
		},
		data () {
			return {
				zanPic: "../../static/pic/dz.png",
				zanPic2: "../../static/pic/dz2.png",
				isDz: false,
				placeholderStr: "说点什么吧",
				childItemBean: "孤独的赶鸭人",
				childList: ["好大一个月", "浩淇好像会飞", "大眼睛维克兹", "好大一个月", "浩淇好像会飞", "大眼睛维克兹"]
			}
		},
		methods: {
			childUserIconClick: function() {
				MsgUtil.toast("头像" + this.childItemBean)
			},
			childDz: function() {
				MsgUtil.toast("点赞" + this.childItemBean)
			},
			childClick: function() {
				this.placeholderStr = "回复 [" + this.childItemBean + "]"
				this.showSpeakDialog()
			},
			dz: function() {
				this.isDz = !this.isDz
			},
			itemUserIconClick: function(item) {
				MsgUtil.toast("头像" + item)
			},
			itemClick: function(item) {
				this.placeholderStr = "回复 [" + item + "]"
				this.showSpeakDialog()
			},
			itemDz: function(item,index) {
				MsgUtil.toast("点赞" + item)
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
	.cc-layout {
		background-color: #FFFFFF;
	}
	
	.top-line {
		height: 15px;
		background-color: #F2F2F2;
	}
	
	
</style>
