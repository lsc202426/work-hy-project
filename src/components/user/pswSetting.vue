<template>
  <div id="pswSetting" class="pswSetting">
    <nav-header title="密码设置"></nav-header>
    <div class="psw">
        <div class="psw-block">
            <div class="psw-list">
                <span>原密码</span>
                <input type="text" placeholder="请输入原密码" v-model="oldPsw">
            </div>
            <div class="psw-list">
                <span>新密码</span>
                <input type="text" placeholder="请输入新密码" v-model="newPsw">
            </div>
            <div class="psw-list">
                <span>确认密码</span>
                <input type="text" placeholder="请再次输入新密码" v-model="moreNewPsw">
            </div>
        </div>
        <div class="psw-submit" @click="submitMsg()">
            <span>提交</span>
        </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  name: "pswSetting",

  data() {
    return {
        oldPsw: '',
        newPsw: '',
        moreNewPsw: '',
    };
  },
  created() {
    // this.getMsg();
  },
  methods: {
    submitMsg() {
        var _this = this;
        
        if(_this.oldPsw == ''){
            Toast({
                message: '请输入原密码',
                duration: 3000
            });
            return false;
        }
        if(_this.newPsw == ''){
            Toast({
                message: '请输入新密码',
                duration: 3000
            });
            return false;
        }
        if(_this.moreNewPsw == ''){
            Toast({
                message: '请输入确认密码',
                duration: 3000
            });
            return false;
        }
        if(_this.newPsw != _this.moreNewPsw){
            Toast({
                message: '输入的新密码与确认密码不一致',
                duration: 3000
            });
            return false;
        }

      this.$axios.post("index.php?c=App&a=setNewPwd", {
            pwd: _this.oldPsw,
            password: _this.newPsw 
        })
        .then(function(response) {
          console.log(response.data.errcode);
            if(response.data.errcode == '-1'){
                Toast({
                    message: '原密码不正确',
                    duration: 3000
                });
                
            }else{
                Toast({
                    message: '修改成功',
                    duration: 3000
                });
                setTimeout(() => {
                    _this.$router.push("/setting")
                }, 3000);
            }
            // return;
        })
        .catch(function(error) {
            
            console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
</style>
