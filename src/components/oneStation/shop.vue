<template>
    <div class="website">
        <nav-header title="网站" fixed></nav-header>
        <div class="content containerView-main">
            <img src="../../assets/images/oneStation/list_bg2.png" class="top_img" alt="" />
            <div class="text">
                <div class="text_top">
                    <div class="text_top_l">
                        <p class="title">品牌网店</p>
                        <p class="no-after">
                            费用：<span>￥{{ price }}</span>
                        </p>
                        <p class="msg">适合个体淘宝店主或小型企业</p>
                    </div>
                    <div class="text_top_r">
                        <div class="apply" @click="apply()">立即申请</div>
                    </div>
                </div>
                <div class="text_con">
                    <div class="title">特点：</div>
                    <p class="msg">空间：10G</p>
                    <p class="msg">月流量：50G</p>
                    <p class="msg">风格：PC+手机</p>
                </div>
                <div class="text_con">
                    <div class="title">核心功能</div>
                    <p class="msg msg_s">商品发布：</p>
                    <p class="pl_t">
                        发布商品，设置商品分类、商品价格及库存等，导入 导出商品管理，适用于商品展示等多维度图文展示类 栏目使用。
                    </p>
                    <p class="msg msg_s">会员功能：</p>
                    <p class="pl_t">注册成为网站会员，选购商品并在线支付。会员积分 升级，会员消费可获得积分或优惠等。</p>
                    <p class="msg msg_s">订单管理：</p>
                    <p class="pl_t">查看会员购买的订单信息，并根据订单的处理进度设 置订单的状态，如：收款订单，发货订单等。</p>
                    <p class="msg msg_s">支付管理：</p>
                    <p class="pl_t">网店可接入的第三方支付接口，目前支持支付宝及微 信支付。</p>
                    <p class="msg msg_s">优惠券管理：</p>
                    <p class="pl_t">可根据节日或活动设置的代金券，用户通过消费时可 使用优惠券代部分现金。</p>
                    <p class="msg msg_s">秒杀管理：</p>
                    <p class="pl_t">设置某些产品参与秒杀活动、产品秒杀的时间及产品 的数量等。</p>
                    <p class="msg msg_s">团购管理：</p>
                    <p class="pl_t">设置某些产品购达到指定购买人数，才享受团购的价 格，及团购结构时间等。</p>
                    <p class="msg msg_s">配套服务：</p>
                    <p class="pl_t">
                        提供8个以内栏目结构设计，50条信息录入，50条产 品图片发布，6个通栏广告banner设计，每年提供6
                        次网站数据库备份。提供7*24的电话及在线(QQ、微 信)咨询服务支持。
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            price: this.$route.query.price,
        };
    },
    created() {},
    methods: {
        apply() {
            let mark = this.$route.query.mark;
            let fee_verify = this.$route.query.fee_verify;
            let id = this.$route.query.id;
            let price = this.$route.query.price;
            let title = this.$route.query.title;
            this.$router.push({
                //跳转品牌官网
                path: '/restaurantWeb',
                query: {
                    mark: mark,
                    fee_verify: fee_verify,
                    id: id,
                    price: price,
                    title: title,
                },
            });
        },
    },
};
</script>
