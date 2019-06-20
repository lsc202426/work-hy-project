<template>
	<div id="support" class="support">
        <nav-header title="帮助支持"></nav-header>
        <div>
            <img src="" alt="">
            <p></p>
            <div>
                <img src="" alt="">
                <span></span>
            </div>
            <div>
                <img src="" alt="">
                <span></span>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<script>

    export default{
        name: "capiral",

        data(){
            return {
                
            }
        },
        created() {
			this.getMsg();
		},
        methods: {
            getMsg() {
				let _this=this;
				this.$axios.post('', {
                       
					})
					.then(function(response) {
                        
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
