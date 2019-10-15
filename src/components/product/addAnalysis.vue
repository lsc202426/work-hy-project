<template>
    <div class="product-details">
        <!-- <nav-header title="开通" gobackurl="/analysislist"></nav-header> -->
        <mt-header class="header" title="开通" fixed>
            <mt-button slot="left" icon="back" @click="goback()"></mt-button>
            <mt-button slot="right" @click="viewHistory()">历史开通记录</mt-button>
        </mt-header>
        <div class="product-dt-main containerView-main">
            <div class="pd-analysis pd-top">
                <p class="pd-analysis-tips">
                    熟悉域名解析，请直接填写下面相关内容进行域名解析；<br />不熟悉以下内容，请拨打我们的客服电话
                    <span>{{ configs.api.link_phone }}</span>
                </p>
                <p class="pd-analysis-title">开通记录</p>
                <!-- 添加 -->
                <div class="pd-analysis-list">
                    <div class="pd-analysis-list-item">
                        <label>主机名</label>
                        <div class="right">
                            <input type="text" v-model="dns_host" placeholder="如：www.商标" />
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>记录类型</label>
                        <div class="right">
                            <select class="news-color" v-model="dns_type" :class="{ 'chang-color': dns_type }">
                                <option disabled value="">选择记录类型</option>
                                <option>A</option>
                                <option>CNAME</option>
                                <option>MX</option>
                                <option>TXT</option>
                                <option>SRV</option>
                                <option>NS</option>
                                <option>AAAA</option>
                            </select>
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>记录值</label>
                        <div class="right">
                            <input type="text" v-model="dns_data" placeholder="如：120.10.10.2" />
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>MX优先级</label>
                        <div class="right">
                            <input type="number" v-enterNumber v-model="dns_mx" placeholder="如：-" />
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>TTL</label>
                        <div class="right">
                            <input type="number" v-enterNumber v-model="dns_ttl" placeholder="如：45" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="pd-big-btn">
                <button @click="addDns">确定</button>
            </div>
            <div class="product-details-phone">
                <customer-service></customer-service>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    inject: ['reload'],
    data() {
        return {
            dnsRecord: {}, //获取的dns详情
            dns_host: '',
            dns_domain: JSON.parse(sessionStorage.analysisInfo),
            dns_type: '',
            dns_data: '',
            dns_mx: '',
            dns_ttl: '',
            titleText: '',
        };
    },
    mounted() {
        if (window.history && window.history.pushState) {
            // 向历史记录中插入了当前页
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goback, false);
        }
    },
    destroyed() {
        window.removeEventListener('popstate', this.goback, false);
    },
    methods: {
        // 返回
        goback: function() {
            if (this.dns_domain.url) {
                this.$router.push({
                    path: this.dns_domain.url,
                    query: {
                        id: this.dns_domain.id,
                    },
                });
                sessionStorage.removeItem('analysisInfo');
                return;
            }
            // this.$router.push({
            //     path: '/orderdetails',
            //     query: {
            //         id: this.dns_domain.id,
            //     },
            // });
            // sessionStorage.removeItem('analysisInfo');
            history.pushState(null, null, document.URL);
        },
        // 历史开通记录
        viewHistory: function() {
            this.$router.push({
                path: '/AnalysisList',
            });
        },
        // 新增
        addDns: function() {
            const that = this;
            let textTips = '';
            if (!that.dns_host) {
                textTips = '请输入主机名';
            } else if (!that.dns_type) {
                textTips = '请选择记录类型';
            } else if (!that.dns_data) {
                textTips = '请输入记录值';
            } else if (that.dns_type === 'MX' && !that.dns_mx) {
                textTips = '请输入MX优先级';
            } else if (!that.dns_ttl) {
                textTips = '请输入TTL';
            }
            if (textTips) {
                Toast({
                    message: textTips,
                    duration: 1500,
                });
                return false;
            }
            that.$axios
                .post('index.php?c=App&a=setDNSRecord', {
                    id: 0,
                    host: that.dns_host,
                    domain: that.dns_domain.domain,
                    record_type: that.dns_type,
                    data: that.dns_data,
                    mx_priority: that.dns_mx,
                    ttl: that.dns_ttl,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        Toast({
                            message: response.data.errmsg,
                            duration: 2000,
                        });
                        setTimeout(() => {
                            that.$router.push({
                                path: '/analysislist',
                            });
                        }, 2000);
                    }
                });
        },
    },
};
</script>
