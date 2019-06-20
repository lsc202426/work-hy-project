<template>
	<div id="editmsg" class="editmsg">
        <nav-header title="编辑资料"></nav-header>
        <div class="edit-msg">
            <div class="edit-list edit-head-port">
                <span>头像</span>
                <div class="user-avatar">
                    <div class="user-avatar">
                        <div class="user-minus">  
                            <!-- <img class="head-port" src="../../assets/images/user/head-portairt.png" alt="" v-show="!images"> -->
                            <div class="head-port" :style="{backgroundImage: 'url(' + images + ')' }" v-show="!images"></div>
                            <div class="head-port" :style="{backgroundImage: 'url(' + images + ')' }" v-show="images"></div>
                            <!-- <img class="head-port" :src="images" alt="" v-show="images"> -->
                        </div>
                    </div>
                    <input type="file" class="change_img" @change="changeImage($event)">
                    <!-- <input type="file" class="change_img" @change="changeImg()"> -->
                </div>
            </div>
            <div class="edit-list">
                <span>昵称</span>
                <p>{{msgArr.nickname}}</p>
            </div>
            <div class="edit-list username">
                <span>用户名</span>
                <p>{{msgArr.username}}</p>
            </div>
        </div>
                
        
    </div>
</template>

<script>
    export default{
        name: "editmsg",

        data(){
            return {
                images: require("@/assets/images/user/head-portairt.png"),
                msgArr: [],
                images: ''
            }
        },
        created() {
            this.getMsg();
            this.getRouter();
		},
        methods: {
            // 更换头像
            changeImage(e){
                var _this = this;
                var files = e.target.files[0];
                var images = new Image();
                var reader = new FileReader();
                reader.readAsDataURL(files);
                reader.onload = e => {
                    var imgcode = e.target.result;
                    // console.log(imgcode); //这个就是base64编码
                    
                    this.$axios.post('index.php?c=App&a=setPortrait', {
                        userid: 1,
                        filename: files.name,
                        portrait: imgcode
					})
					.then(function(response) {
                        _this.images = response.data.content.url;
						
					})
					.catch(function(error) {
						// console.log(error);
					});
                    reader.readAsDataURL(files[0]);
                };
                
            },
            
            getRouter(){
                // console.log(this.$route.query)
                this.msgArr = this.$route.query
                this.images = this.msgArr.headPort
            },
            getMsg() {
				let _this=this;
				this.$axios.post('', {
						
					})
					.then(function(response) {
                        // console.log(response.data.content)
						
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
