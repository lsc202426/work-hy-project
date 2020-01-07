<template>
    <div class="register-msg">
        <nav-header title="注册信息" fixed></nav-header>
        <div class="register-msg-main" v-if="domainInfo && Object.keys(domainInfo).length > 0">
            <div class="register-msg-top f_bgf">{{ domainInfo.domainName }}</div>
            <div class="main-data-list">
                <div class="main-data-item">
                    <div class="title">常规信息</div>
                    <div class="item-con f_bgf">
                        <div class="main-data-item-msg f_bdb">
                            <div class="msg">注册商 Sponsoring Registrar</div>
                            <div class="text">{{ domainInfo.registrar }}</div>
                        </div>
                        <div class="main-data-item-msg f_bdb">
                            <div class="msg">注册日期 Registration Date(EDT)</div>
                            <div v-if="domainInfo.regDate" class="text">{{ domainInfo.regDate | dateFormat }}</div>
                        </div>
                        <div class="main-data-item-msg f_bdb">
                            <div class="msg">到期日期 Expiration Date(EDT)</div>
                            <div v-if="domainInfo.expDate" class="text">{{ domainInfo.expDate | dateFormat }}</div>
                        </div>
                    </div>
                </div>
                <div class="main-data-item">
                    <div class="title">域名状态 Domain Status</div>
                    <div class="item-con f_bgf">
                        <div class="main-data-item-msg f_bdb" v-for="(item, index) in domainInfo.status" :key="index">
                            <div class="text">{{ item }}</div>
                        </div>
                    </div>
                </div>
                <div class="main-data-item">
                    <div class="title">DNS服务器 Name server</div>
                    <div class="item-con f_bgf">
                        <div class="main-data-item-msg f_bdb" v-for="(item, index) in domainInfo.ns" :key="index">
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
            domainInfo: {}, //whios数据
            domainName: this.$route.query.name,
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
                    domain: this.domainName,
                })
                .then(res => {
                    let data = res.data;
                    if (data.errcode == 0) {
                        this.domainInfo = data.content;
                    }
                });
        },
    },
};
</script>
