<template>
    <div class="product-details analysis-list">
        <mt-header title="解析列表" class="header" fixed>
            <mt-button slot="left" icon="back" @click="goback"></mt-button>
            <mt-button slot="right"></mt-button>
        </mt-header>
        <div class="product-dt-main containerView-main">
            <div class="pd-record">
                <ul class="pd-main pd-record-right pd-bd" @click="dnsRecord(0, list.id)" v-for="(list, i) of recordList" :key="i">
                    <li class="pd-main-item">
                        <label>记录类型</label>
                        <p class="icons-box">
                            {{ list.record_type }} <span class="icons-status">{{ list.status_name }}</span>
                        </p>
                    </li>
                    <li class="pd-main-item">
                        <label>主机记录</label>
                        <p>{{ list.host }}</p>
                    </li>
                    <li class="pd-main-item">
                        <label>记录值</label>
                        <p>{{ list.data }}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="analysis-list-btn">
            <button @click="dnsRecord(1)">新增解析</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 页码
            page: 0,
            // dns列表
            recordList: [],
        };
    },
    created() {
        // 获取dns记录
        this.getDNSRecordList();
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
            this.$router.push({
                path: '/orderdetails',
                query: {
                    id: JSON.parse(sessionStorage.analysisInfo).id,
                },
            });
            sessionStorage.removeItem('analysisInfo');
            history.pushState(null, null, document.URL);
        },
        // 添加解析
        dnsRecord: function(type, id) {
            if (type == 1) {
                this.$router.push({
                    path: '/analysis',
                    query: {
                        dnsStatus: type,
                    },
                });
            } else if (type == 0) {
                this.$router.push({
                    path: '/analysis',
                    query: {
                        dnsStatus: type,
                        id: id,
                    },
                });
            }
        },
        // 获取dns记录
        getDNSRecordList: function() {
            const that = this;
            that.$axios
                .post('index.php?c=App&a=getDNSRecordList', {
                    domain: JSON.parse(sessionStorage.analysisInfo).domain,
                    p: that.page,
                })
                .then(function(response) {
                    let _data = response.data;
                    if (_data.errcode === 0) {
                        that.recordList = _data.content.list;
                    }
                });
        },
    },
};
</script>
