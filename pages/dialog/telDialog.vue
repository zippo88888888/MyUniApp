<template>
	<view class="tel-root" v-bind:class="[setMargin ? 'm-bottom-45' : 'm-bottom-0']">
		<view class="tel-layout">
			<text class="tel-txt" v-on:click="tel()">拨打客服热线：4008-823-823</text>
		</view>
		<view class="space"></view>
		<view class="tel-layout" v-on:click="closeDialog()">
			<text class="cancel">取消</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			needSetMarginBottom: {
				type: Boolean,
				default: true
			}
		},
		emits: ['dissmisTelDialog'],
		data () {
			return {
				setMargin: true,
			}
		},
		methods: {
			tel: function() {
				uni.makePhoneCall({
					phoneNumber: '4008823823'
				});
				this.$emit('dissmisTelDialog', true)
			},
			closeDialog: function() {
				this.$emit('dissmisTelDialog', true)
			},
		},
		mounted: function(m) {
			// #ifdef H5
			if (this.needSetMarginBottom) { // H5 商品详情页面不需要设置 margin-bottom
				this.setMargin = true
			} else {
				this.setMargin = false
			}
			console.log("" + this.setMargin)
			// #endif
			// #ifndef H5
			this.setMargin = false
			// #endif
		}
	}
</script>

<style lang="scss">
	
	.m-bottom-45 {
		margin-bottom: 45px;
	}
	
	.m-bottom-0 {
		margin-bottom: 0;
	}
	
	.tel-root {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		/* #ifdef H5 */
		// margin-bottom: 45px;

		/* #endif */
		.tel-layout {
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.tel-txt {
			font-size: 13px;
			color: #000000;
		}

		.cancel {
			font-size: 13px;
			color: #91919C;
		}

		.space {
			height: 10px;
			background-color: #F2F2F2;
		}
	}
</style>
