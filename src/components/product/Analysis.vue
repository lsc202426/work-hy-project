<template>
    <div class="product-details">
        <nav-header title="添加解析" gobackurl="/productone"></nav-header>
        <div class="product-dt-main containerView-main">
            <div class="pd-analysis">
                <p class="pd-analysis-title">解析记录</p>
                <!-- 添加解析 -->
                <div class="pd-analysis-list" v-if="type === 'edit'">
                    <div class="pd-analysis-list-item">
                        <label>主机名</label>
                        <div class="right">
                            <input type="text" placeholder="请输入主机名" />
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>记录类型</label>
                        <div class="right">
                            <select v-model="selected">
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
                            <input type="text" placeholder="请输入主机值" />
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>MX优先级</label>
                        <div class="right">
                            <input type="text" placeholder="请输入MX优先级" />
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>TTL</label>
                        <div class="right">
                            <input type="text" placeholder="请输入TTL" />
                        </div>
                    </div>
                </div>
                <!-- 解析详情 -->
                <div class="pd-analysis-list" v-else>
                    <div class="pd-analysis-list-item">
                        <label>主机名</label>
                        <div class="right">
                            WWW
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>记录类型</label>
                        <div class="right">
                            A
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>记录值</label>
                        <div class="right">
                            12323412
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>MX优先级</label>
                        <div class="right">
                            -
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>TTL</label>
                        <div class="right edit-status" @click="changeStatus">
                            有效
                        </div>
                    </div>
                </div>
            </div>
            <div class="pd-big-btn" v-show="type === 'edit'">
                <button>确定</button>
            </div>
        </div>
        <div class="box-bottom" v-show="isShow">
            <div class="box-bottom-change">
                <div class="change-item" @click="selectItem(0)">修改</div>
                <div class="change-item" @click="selectItem(1)">暂停</div>
                <div class="change-item delete" @click="selectItem(2)">删除</div>
                <div class="change-item" @click="selectItem(3)">取消</div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            type: this.$route.query.dnsStatus, // 判断修改还是查看
            isShow: false,
            id: '', //传过来的id
            dnsRecord: {}, //获取的dns详情
            selected: '',
        };
    },
    methods: {
        // 如果查看详情
        // 更改状态
        changeStatus: function() {
            this.isShow = true;
        },
        // 选中状态值
        selectItem: function() {
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
                });
        },
    },
};
</script>
