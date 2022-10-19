<template>
	<view class="sd-layout">
		<view class="edit-layout">
			<!-- placeholder 可以写死 :placeholder 可以使用变量  -->
			<textarea class="textarea" v-model="inputValue" @input="inputing" maxlength="500" :placeholder="placeholderStr"
				placeholder-style="color:#91919C"></textarea>
			<text class="max-txt">还可输入{{maxLength}}字</text>
		</view>
		<view class="btn-layout">
			<text class="down" @click="down()">确认</text>
			<text class="auto" @click="random()">随机一条</text>
		</view>
	</view>
</template>

<script>
	import MsgUtil from '../../util/msg.js';
	export default {
		props: {
			placeholderStr: {
				type: String,
				default: "说点什么吧"
			}
		},
		data() {
			return {
				inputValue: "",
				maxLength: 300,
				randomList: [
					"感觉好厉害的亚子啊，我都有点心动了！",
					"这个需求做不了",
					"这个价格i了i了，还有货吗",
					"你妈妈叫你回家吃饭",
					"我感觉这条评论要火",
					"我感觉这条动态要火",
					"一键三连",
					"点我看详情",
				]
			}
		},
		methods: {
			inputing: function(option) {
				var length = option.detail.value.length
				this.maxLength = 300 - length
			},
			down: function() {
				this.$emit('closeSpeakDialog', this.inputValue)
			},
			random: function() {
				var min = 0
				var max = this.randomList.length - 1
				var randomIndex = Math.round(Math.random() * (max - min)) + min
				var value = this.randomList[randomIndex]
				MsgUtil.log(value)
				this.inputValue = value
				this.maxLength = 300 - value.length
			}
		}
	}
</script>

<style lang="scss">
	.sd-layout {
		height: 120px;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;

		.edit-layout {
			flex: 1;
			display: flex;
			flex-direction: column;

			.textarea {
				height: 90px;
				padding-left: 5px;
				margin-top: 3px;
				font-size: 14px;
				color: #000000;
			}

			.max-txt {
				height: 20px;
				font-size: 12px;
				color: #91919C;
				margin-right: 10px;
				justify-content: flex-end;
				align-items: center;
				display: flex;
				flex-direction: row;
			}
		}

		.btn-layout {
			width: 70px;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.down {
				flex: 1;
				font-size: 14px;
				color: #FFFFFF;
				background-color: #007AFF;
				justify-content: center;
				align-items: center;
				display: flex;
			}

			.auto {
				height: 40px;
				background-color: #F2F2F2;
				justify-content: center;
				align-items: center;
				display: flex;
				font-size: 12px;
			}
		}
	}
</style>
