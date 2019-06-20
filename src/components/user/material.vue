<template>
	<div id="material" class="material">
        <!-- <nav-header title="注册资料管理"></nav-header> -->
        <mt-header title="注册资料管理" class="header" fixed>
            <router-link to="" slot="left">
                <mt-button icon="back" @click.native="$router.back(-1)"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right" @click="change('0')" v-show="checkAll">选择</mt-button>
            <mt-button icon="more" slot="right" @click="change('1')" v-show="!checkAll">全选</mt-button>
        </mt-header>         
        <div class="capiral-bottom">
            <ul>   
                <li>
                    <input type="checkbox" v-show="!checkAll">
                    <img class="mater-img" src="../../assets/images/user/capital.png" alt="">
                </li>
                <li>
                    <input type="checkbox" v-show="!checkAll">
                    <img @click="checkImg()" class="mater-img" src="../../assets/images/user/datum.png" alt="">
                </li>
                <li>
                    <input type="checkbox" v-show="!checkAll">
                    <img class="mater-img" src="../../assets/images/user/user_bg.png" alt="">
                </li>
                <li>
                    <input type="checkbox" v-show="!checkAll">
                    <img class="mater-img" src="../../assets/images/user/capital.png" alt="">
                </li>
                <li>
                    <input type="checkbox" v-show="!checkAll">
                    <img class="mater-img" src="../../assets/images/user/support.png" alt="">
                </li>
            </ul>
        </div>
        <div class="save-img" v-show="!checkAll" @click="saveImg()">
            <span>保存到相册</span>
        </div>
    </div>
</template>

<script>
    export default{
        name: "material",

        data(){
            return {
                checkAll: true,
                page: 1
            }
        },
        created() {
            this.getMsg();
		},
        methods: {
            // 保存图片
            saveImg(){
                
            },
            // 选中图片
            checkImg(){

            },
            // 切换选择，全选按钮
            change(num){
                if(num == '0'){
                    this.checkAll = false;
                }else{
                    // this.checkAll = true;
                }
            },
            // 获取图片
            getMsg() {
				let _this=this;
				this.$axios.post('index.php?c=App&a=getAttachments', {
						userid: 1,
                        p: _this.page
					})
					.then(function(response) {
                        console.log(response.data.content)
						
					})
					.catch(function(error) {
						// console.log(error);
					});
			},
        },
    }
</script>

<style lang="scss">
</style>
