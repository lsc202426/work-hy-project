<template>
    <div class="product-details">
        <nav-header :title="topTitle" gobackurl="/myproduct"></nav-header>
        <div class="product-dt-main containerView-main">
            <div class="product-dt-main-top">
                <div class="pd-banner"><i class="left-line"></i>产品信息</div>
                <div class="product-dt-main-top-title">
                    <h1>互易.商标</h1>
                    <span v-show="mark !== 'domain'">证书</span>
                </div>
                <ul class="pd-main">
                    <li class="pd-main-item">
                        <label>年限</label>
                        <p>1年</p>
                    </li>
                    <li class="pd-main-item">
                        <label>注册日期</label>
                        <p>2019.03.08 18:00</p>
                    </li>
                    <li class="pd-main-item">
                        <label>过期日期</label>
                        <p>2019.03.08 18:00</p>
                    </li>
                    <li class="pd-main-item">
                        <label>状态</label>
                        <p>过期</p>
                    </li>
                </ul>
            </div>
            <div class="pd-infor" v-if="mark === 'tmd' || mark === 'dzp'">
                <div class="pd-banner"><i class="left-line"></i>资料信息</div>
                <p class="pd-infor-title">{{ detailsList.infor.typename }}</p>
                <div class="pd-infor-list">
                    <img :src="img.fileurl" v-for="(img, i) of detailsList.infor.url" :key="i" preview="1" />
                </div>
            </div>
            <div class="pd-subject">
                <div class="pd-banner"><i class="left-line"></i>持有人信息</div>
                <ul class="pd-main">
                    <li class="pd-main-item">
                        <label>申请人名称</label>
                        <p>陈小姐</p>
                    </li>
                    <li class="pd-main-item">
                        <label>申请人类型</label>
                        <p>企业</p>
                    </li>
                    <li class="pd-main-item">
                        <label>联系人</label>
                        <p>陈小姐</p>
                    </li>
                    <li class="pd-main-item">
                        <label>联系电话</label>
                        <p>020-12345678</p>
                    </li>
                    <li class="pd-main-item">
                        <label>联系邮箱</label>
                        <p>12345678@qq.com</p>
                    </li>
                </ul>
            </div>
            <div class="pd-record">
                <div class="pd-banner"><i class="left-line"></i>解析记录</div>
                <ul class="pd-main pd-record-right" @click="dnsRecord('view')" v-for="(list, i) of detailsList.record" :key="i">
                    <li class="pd-main-item">
                        <label>记录类型</label>
                        <p>{{ list.type }}</p>
                    </li>
                    <li class="pd-main-item">
                        <label>主机类型</label>
                        <p>{{ list.host }}</p>
                    </li>
                    <li class="pd-main-item">
                        <label>记录值</label>
                        <p>{{ list.value }}</p>
                    </li>
                </ul>
            </div>
            <div class="pd-btn">
                <button class="add" @click="dnsRecord('edit')">添加解析</button>
                <button class="renewal">续费</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            mark: this.$route.query.mark,
            detailsList: {
                keyword: '互易.点商标',
                infor: {
                    typename: '商标权利证明',
                    url: [
                        {
                            fileurl: require('@/assets/images/myproduct/img1.jpg'),
                        },
                    ],
                },
                subject: {
                    id: '12312',
                    name: '陈小姐',
                    type: 'XXX类型',
                    linkname: '陈小姐',
                    phone: '020-12345678',
                    email: '123456@qq.com',
                },
                record: [
                    {
                        type: 'A',
                        host: '12.12.121',
                        value: '1222333',
                    },
                    {
                        type: 'A',
                        host: '12.12.121',
                        value: '1222333',
                    },
                ],
            },
        };
    },
    computed: {
        topTitle: function() {
            let text = '';
            if (this.mark === 'tmd') {
                text = '点商标';
            } else if (this.mark === 'dzp') {
                text = '点招聘';
            } else if (this.mark === 'dct') {
                text = '点餐厅';
            } else if (this.mark === 'domain') {
                text = '域名';
            }
            return text;
        },
    },
    methods: {
        // 添加解析
        dnsRecord: function(type) {
            this.$router.push({
                path: '/analysis',
                query: {
                    dnsStatus: type,
                },
            });
        },
    },
};
</script>
