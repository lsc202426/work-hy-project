<template>
    <div class="product-details">
        <nav-header title="添加解析" gobackurl="/myproduct"></nav-header>
        <div class="product-dt-main containerView-main">
            <div class="pd-analysis">
                <p class="pd-analysis-title">解析记录</p>
                <!-- 添加解析 -->
                <div class="pd-analysis-list" v-if="type === 'edit'">
                    <div class="pd-analysis-list-item">
                        <label>主机名</label>
                        <div class="right">
                            <input type="text" />
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>记录类型</label>
                        <div class="right">
                            <select name="" id="">
                                <option value="1">11111</option>
                            </select>
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>记录值</label>
                        <div class="right">
                            <input type="text" />
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>MX优先级</label>
                        <div class="right">
                            <input type="text" />
                        </div>
                    </div>
                    <div class="pd-analysis-list-item">
                        <label>TTL</label>
                        <div class="right">
                            <input type="text" />
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
export default {
    data() {
        return {
            type: 'edit', // 判断修改还是查看
            isShow: false,
        };
    },
    methods: {
        changeStatus: function() {
            this.isShow = true;
        },
        selectItem: function() {
            this.isShow = false;
        },
    },
};
</script>
