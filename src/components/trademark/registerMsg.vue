<template>
    <div class="register-msg">
        <nav-header title="注册信息" fixed></nav-header>
        <div class="register-msg-main">
            <div class="register-msg-top f_bgf">{{ data.domainName }}</div>
            <div class="main-data-list">
                <div class="main-data-item">
                    <div class="title">常规信息</div>
                    <div class="item-con f_bgf">
                        <div class="main-data-item-msg f_bdb">
                            <div class="msg">注册商 Sponsoring Registrar</div>
                            <div class="text">{{ data.registrar }}</div>
                        </div>
                        <div class="main-data-item-msg f_bdb">
                            <div class="msg">注册日期 Registration Date(EDT)</div>
                            <div v-if="data.regDate" class="text">{{ data.regDate | dateFormat }}</div>
                        </div>
                        <div class="main-data-item-msg f_bdb">
                            <div class="msg">到期日期 Expiration Date(EDT)</div>
                            <div v-if="data.expDate" class="text">{{ data.expDate | dateFormat }}</div>
                        </div>
                    </div>
                </div>
                <div class="main-data-item">
                    <div class="title">域名状态 Domain Status</div>
                    <div class="item-con f_bgf">
                        <div class="main-data-item-msg f_bdb" v-for="(item, index) in data.status" :key="index">
                            <div class="text">{{ item }}</div>
                        </div>
                    </div>
                </div>
                <div class="main-data-item">
                    <div class="title">DNS服务器 Name server</div>
                    <div class="item-con f_bgf">
                        <div class="main-data-item-msg f_bdb" v-for="(item, index) in data.ns" :key="index">
                            <div class="text">{{ item }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'registerMsg',
    data() {
        return {
            data: {}, //whios数据
        };
    },
    created() {
        //初始化获取whios数据
        this.init();
    },
    methods: {
        //初始化
        init() {
            this.$axios
                .post('index.php?c=App&a=whois', {
                    domain: '互易.商标',
                })
                .then(res => {
                    let data = res.data;
                    if (data.errcode == 0) {
                        console.log(data);
                        this.data = data.content;
                    }
                });
        },
    },
};
</script>
