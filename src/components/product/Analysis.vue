<template>
    <div class="product-details">
        <nav-header :title="titleText" gobackurl="/analysislist"></nav-header>
        <div class="product-dt-main containerView-main">
            <div class="pd-analysis">
                <p class="pd-analysis-title">解析记录</p>
                <!-- 添加 -->
                <div class="pd-analysis-list" v-if="type == 1 || type == 2">
                    <div class="pd-analysis-list-item">
                        <label>主机名</label>
                        <div class="right">
                            <input type="text" v-model="dns_host" />
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>记录类型</label>
                        <div class="right">
                            <select v-model="dns_type">
                                <option disabled value="">请选择记录类型</option>
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
                            <input type="text" v-model="dns_data" />
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>MX优先级</label>
                        <div class="right">
                            <input type="number" v-enterNumber v-model="dns_mx" />
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>TTL</label>
                        <div class="right">
                            <input type="number" v-enterNumber v-model="dns_ttl" />
                        </div>
                    </div>
                </div>
                <!-- 详情 -->
                <div class="pd-analysis-list" v-if="type == 0">
                    <div class="pd-analysis-list-item">
                        <label>主机名</label>
                        <div class="right">
                            {{ dnsRecord.host }}
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>记录类型</label>
                        <div class="right">
                            {{ dnsRecord.record_type }}
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>记录值</label>
                        <div class="right">
                            {{ dnsRecord.data }}
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>MX优先级</label>
                        <div class="right">
                            {{ dnsRecord.mx_priority ? dnsRecord.mx_priority : '-' }}
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>TTL</label>
                        <div class="right">
                            {{ dnsRecord.ttl }}
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>状态</label>
                        <div class="right edit-status" @click="changeStatus">
                            {{ dnsRecord.status_name }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="pd-big-btn" v-if="type == 1 || type == 2">
                <button @click="addDns">确定</button>
            </div>
        </div>
        <div class="box-bottom" v-if="isShow">
            <div class="box-bottom-change">
                <div class="change-item edit" @click="selectItem(0)">修改</div>
                <div
                    class="change-item status"
                    @click="selectItem(1, dnsRecord.status)"
                    v-show="dnsRecord.status == '-1' || dnsRecord.status == '1'"
                >
                    {{ dnsRecord.status == '-1' ? '启用' : dnsRecord.status == '1' ? '暂停' : '' }}
                </div>
                <div class="change-item delete" @click="selectItem(2)">删除</div>
                <div class="change-item cancel" @click="selectItem(3)">取消</div>
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
            isShow: false,
            id: this.$route.query.id ? this.$route.query.id : '', //传过来的id
            dnsRecord: {}, //获取的dns详情
            dns_host: '',
            dns_domain: JSON.parse(sessionStorage.analysisInfo).domain,
            dns_type: '',
            dns_data: '',
            dns_mx: '',
            dns_ttl: '',
            titleText: '',
        };
    },
    created() {
        if (this.type == 0) {
            this.getDNSRecord();
        }
    },
    computed: {
        type: function() {
            const that = this;
            let type = parseInt(this.$route.query.dnsStatus); // 判断修改还是查看
            if (type == 2 && sessionStorage.editDns) {
                let _data = JSON.parse(sessionStorage.editDns);
                that.dns_host = _data.host;
                that.dns_domain = _data.domain;
                that.dns_type = _data.record_type;
                that.dns_data = _data.data;
                that.dns_mx = _data.mx_priority;
                that.dns_ttl = _data.ttl;
            }
            // 判断类型添加title
            if (type == 0) {
                that.titleText = '解析详情';
            } else if (type == 1) {
                that.titleText = '添加解析';
            } else if (type == 2) {
                that.titleText = '编辑解析';
            }
            return type;
        },
    },
    beforeDestroy() {
        sessionStorage.removeItem('editDns');
    },
    methods: {
        // 如果查看详情
        // 更改状态
        changeStatus: function() {
            this.isShow = true;
        },
        // 选中状态值
        selectItem: function(value, status) {
            const that = this;
            // 编辑
            if (value === 0) {
                that.$router.push({
                    path: '/analysis',
                    query: {
                        dnsStatus: 2,
                        id: that.id,
                    },
                });
                sessionStorage.editDns = JSON.stringify(that.dnsRecord);
            }
            // 删除
            if (value === 2) {
                that.delDNSRecord();
            }
            // 更改状态
            if (value === 1) {
                let _temptStatus;
                if (status == '1') {
                    _temptStatus = '-1';
                } else if (status == '-1') {
                    _temptStatus = '1';
                }
                that.setDNSRecordStatus(_temptStatus);
            }
            this.isShow = false;
        },
        // 获取详情
        getDNSRecord: function() {
            const that = this;
            that.$axios
                .post('index.php?c=App&a=getDNSRecord', {
                    id: that.id,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        that.dnsRecord = _data.content;
                    }
                });
        },
        // 更改状态
        setDNSRecordStatus: function(status) {
            const that = this;
            that.$axios
                .post('index.php?c=App&a=setDNSRecordStatus', {
                    id: that.id,
                    status: status,
                })
                .then(function(response) {
                    if (response.data.errcode === 0) {
                        that.reload();
                    }
                    Toast({
                        message: response.data.errmsg,
                        duration: 2000,
                    });
                });
        },
        // 删除状态
        delDNSRecord: function() {
            const that = this;
            that.$axios
                .post('index.php?c=App&a=delDNSRecord', {
                    id: that.id,
                })
                .then(function(response) {
                    Toast({
                        message: response.data.errmsg,
                        duration: 2000,
                    });
                    setTimeout(() => {
                        that.$router.push({
                            path: '/analysislist',
                        });
                    }, 2000);
                });
        },
        // 新增，编辑dns
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
                    id: that.id ? that.id : 0,
                    host: that.dns_host,
                    domain: that.dns_domain,
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
