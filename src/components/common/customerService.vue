<template>
    <div class="customer-service">
        <!-- 联系客服 -->
        <a :href="'tel:' + configs.api.link_phone" class="phone">
            <img src="../../assets/images/user/consumer-hotline.png" alt="" />
            <span>如有疑问，可联系客服</span>
        </a>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
.customer-service {
    margin: 0.56rem 0;
    .phone {
        display: block;
        margin: 0 auto;
        width: fit-content;
        text-align: center;
        color: #0086ff;
        font-size: 0.24rem;
        img {
            display: block;
            margin: 0 auto 0.1rem;
            width: 0.48rem;
            height: 0.48rem;
        }
    }
}
</style>
