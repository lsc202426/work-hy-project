<template>
    <div id="about" class="about">
        <nav-header title="关于我们"></nav-header>
        <div class="about-box containerView-main">
            <div class="about-top">
                <img class="about-img" src="../../assets/images/user/aboutUs_logo.png" alt />
                <div class="about-top-right">
                    <p class="title">互易品牌管理</p>
                    <p class="version">{{ configs.api.version }}</p>
                </div>
            </div>
            <div class="about-bot">
                <a href="http://huyi.cn/mob/index.php/Index/company">
                    <div class="about-list">
                        <img class="icons" src="../../assets/images/user/aboutus_mission.png" alt="" />
                        <span class="text">我们的使命</span>
                    </div>
                </a>
                <a href="http://huyi.cn/mob/index.php/Index/business">
                    <div class="about-list">
                        <img class="icons" src="../../assets/images/user/aboutus_product.png" alt="" />
                        <span class="text">我们的产品</span>
                    </div>
                </a>
                <a href="http://huyi.cn/mob/index.php/Index/news">
                    <div class="about-list">
                        <img class="icons" src="../../assets/images/user/aboutus_news.png" alt="" />
                        <span class="text">新闻动态</span>
                    </div>
                </a>
                <a href="http://huyi.cn/mob/index.php/Index/support">
                    <div class="about-list">
                        <img class="icons" src="../../assets/images/user/aboutus_contact.png" alt="" />
                        <span class="text">联系方式</span>
                    </div>
                </a>
            </div>
            <div class="copyright">
                <p class="copytight-text">{{ copyright }}</p>
                <p class="copyright-tech">{{ copyright_tech }}</p>
            </div>
        </div>
    </div>
</template>

<script>
// import { Toast } from 'mint-ui';
export default {
    name: 'about',

    data() {
        return {
            copyright: '',
            copyright_tech: '',
        };
    },
    created() {
        this.getCopyRight();
    },
    methods: {
        // 获取copyright
        getCopyRight: function() {
            const that = this;
            this.$axios
                .post('index.php?c=App&a=getIndex', {
                    dpi_version: 'H5',
                })
                .then(function(response) {
                    if (response.data.errcode == 0) {
                        that.copyright = response.data.content.copyright;
                        that.copyright_tech = response.data.content.copyright_tech;
                    }
                });
        },
    },
};
</script>
<style lang="scss"></style>
