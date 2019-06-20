<template>
  <mt-header :title="title" class="header" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click.native="$router.back(-1)"></mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
</template>

<style>
    #app .mint-header{
        background-color:#fff;
		height:0.9rem;
		border-bottom: 1px solid #F1F1F1;
    }
	#app .mint-header-title {
		color: #2C3852;
		font-family: PingFangHK-Regular;
		font-size: 0.34rem;
	}
	#app .mint-header-button.is-left {
		color: #2C3852;
	}
	#app .mint-header .mint-button {
		padding-left: 4px;
	}
</style>

<script>
export default {
    data() {
        return {
            
        }
    },
    //声明接受父组件参数
    props:['title']
}
</script>


