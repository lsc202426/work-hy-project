<template>
    <div class="contact">
        <nav-header title="联系互易"></nav-header>
        <div class="contact-main">
            <h2 class="contact-main-title">{{ contactInfo.name }}</h2>
            <div class="contact-main-code">
                <div class="code-list" v-if="contactInfo.huyi">
                    <div class="code-list-box">
                        <img :src="configs.api.public_domain + contactInfo.huyi.img" />
                    </div>
                    <span>{{ contactInfo.huyi.name }}</span>
                </div>
                <div class="code-list" v-if="contactInfo.weixin">
                    <div class="code-list-box">
                        <img :src="configs.api.public_domain + contactInfo.weixin.img" />
                    </div>
                    <span>{{ contactInfo.weixin.name }}</span>
                </div>
            </div>
            <div class="contact-main-item hotline">
                <label class="left">服务热线：</label>
                <a :href="'tel:' + contactInfo.service_tel">
                    {{ contactInfo.service_tel }}
                    <i class="phone"></i>
                </a>
            </div>
            <div class="contact-main-item">
                <label>品牌官网：</label>
                <a
                    :href="'http://' + contactInfo.brands_website"
                    v-if="contactInfo.brands_website && contactInfo.brands_website.indexOf('http') === -1"
                >
                    {{ contactInfo.brands_website }}
                </a>
                <a :href="contactInfo.brands_website" v-else>
                    {{ contactInfo.brands_website }}
                </a>
            </div>
            <div class="contact-main-item">
                <label>英文域名：</label>
                <a :href="contactInfo.website">
                    {{ contactInfo.website }}
                </a>
            </div>
            <div class="contact-main-item">邮箱：{{ contactInfo.email }}</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            contactInfo: {},
        };
    },
    methods: {
        getContactUs: function() {
            const that = this;
            that.$axios.post('index.php?c=App&a=getContactUs').then(function(response) {
                let _data = response.data;
                if (_data.errcode == 0) {
                    that.contactInfo = _data.content;
                }
            });
        },
    },
    created() {
        this.getContactUs();
    },
};
</script>
