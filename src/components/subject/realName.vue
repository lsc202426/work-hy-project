<template>
    <div class="add-subject realName head_box">
        <nav-header></nav-header>
        <div class="add-subject-main">
            <h1 class="add-subject-main-title">实名</h1>
            <div class="add-subject-main-txt" v-if="tips == ''">
                按照工信部要求，域名申请人必须实名；<br />
                提交实名信息后，将进入3-5个工作日的实名审核期
            </div>
            <div class="add-subject-main-txt" v-else>
                {{ tips }}
            </div>
            <div class="add-subject-main-list">
                <label>申请人名称</label>
                <input type="text" v-model="name" readonly="readonly" placeholder="请输入主体名称" />
            </div>
            <div class="add-subject-main-list">
                <label>申请人类型</label>
                <input type="text" v-model="corptype_name" readonly="readonly" placeholder="请输入申请人类型" />
                <!-- <select v-model="corptype" @change="switchType()" class="select-box" v-if="status !== '1'">
					<option v-for="option in options" v-bind:value="option.key" :key="option.key">
						{{ option.name }}
					</option>
				</select> -->
                <!-- <input type="text" readonly="readonly" v-model="options[corptype].name" v-if="status === '1'" /> -->
            </div>
            <div class="add-subject-main-list">
                <label>证件类型</label>
                <input
                    type="text"
                    v-model="cardtype_name"
                    readonly="readonly"
                    placeholder="请选择证件类型"
                    v-if="status == '1' || status == '2'"
                />
                <select v-model="cardtype_name" @change="switchType()" class="select-box" v-else>
                    <option v-for="option in cfg_cardtype" :value="option.name" :key="option.key">
                        {{ option.name }}
                    </option>
                </select>
            </div>
            <div class="add-subject-main-list">
                <label>证件号码</label>
                <input
                    type="text"
                    v-model.trim="card_no"
                    :readonly="status == '1' || status == '2' ? 'readonly' : false"
                    placeholder="请输入证件号码"
                />
            </div>
            <div class="upload">
                <p class="upload-title">上传证件图片</p>
                <div class="upload-main">
                    <div
                        class="upload-item upload-itemNew"
                        v-for="(value, index) in attachments"
                        :key="value + index"
                        @click="showVantImg(value, index)"
                        :style="{
                            backgroundImage: 'url(' + configs.api.public_domain + value + ')',
                        }"
                    >
                        <i class="cover" v-show="!value"></i>
                        <span class="close" @click.stop="closeBtn(index)" v-show="value && status != '1' && status != '2'"></span>
                        <p class="text" v-show="!value && parseInt(corptype) === 1 && index === 0">
                            上传正面
                        </p>
                        <p class="text" v-show="!value && parseInt(corptype) === 1 && index === 1">
                            上传反面
                        </p>
                        <p class="text" v-show="!value && parseInt(corptype) !== 1 && index === 0">
                            上传
                        </p>
                        <input
                            type="file"
                            @change="toBase64($event, index)"
                            v-show="!value"
                            class="upload-img"
                            :class="{ isUpFile: status == '1' || status == '2' }"
                        />
                    </div>
                </div>
            </div>
            <button class="submit" @click="submitBtn" v-show="parseInt(status) !== 1 && parseInt(status) !== 2">提交</button>
        </div>
        <!-- 图片预览 -->
        <van-image-preview v-model="vant_ImgShow" :images="vant_ImgArr" :start-position="vant_ImgIndex"></van-image-preview>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    name: 'realName',
    data() {
        return {
            options: [],
            isShow: false,
            // 主体类型
            corptype: '1',
            // 主体类型名称
            corptype_name: '个人',
            // 主体名称
            name: '',
            // 证件号码
            card_no: '',
            //证件类型
            card_type: '',
            //证件类型名字
            cardtype_name: '',
            // 上传图片
            attachments: ['', ''],
            //证件类型
            cfg_cardtype: [],
            //状态
            status: 1,
            //corptype	是	类型，1：个人，2：企业，3：组织机构，4：个体工商户
            //提示
            tips: '',
            // 订单细则id
            itemid: this.$route.query.itemid ? this.$route.query.itemid : 0,
            // 是否显示vant 图片预览组件
            vant_ImgShow: false,
            // vant 图片预览组件的index
            vant_ImgIndex: 0,
            // vatn 图片预览组件的数组
            vant_ImgArr: [],
        };
    },
    methods: {
        // 监听类型变化
        switchType: function() {
            if (this.cfg_cardtype.length <= 0) {
                return false;
            }
            for (let i = 0; i < this.cfg_cardtype.length; i++) {
                if (this.cfg_cardtype[i].name == this.cardtype_name) {
                    this.card_type = this.cfg_cardtype[i].key;
                }
            }
            if (!this.cardtype_name) {
                this.card_type = this.cfg_cardtype[0].key;
            }
            if (this.attachments[0] == '') {
                switch (parseInt(this.card_type)) {
                    case 1:
                        this.attachments = ['', ''];
                        break;
                    case 2:
                        this.attachments = [''];
                        break;
                    case 3:
                        this.attachments = [''];
                        break;
                    case 4:
                        this.attachments = [''];
                        break;
                    default:
                }
            }
        },
        // 隐藏
        hideBox: function() {
            this.isShow = false;
        },
        // 清除
        closeBtn: function(index) {
            this.attachments[index] = '';
            // 数据结果太深，强制渲染
            this.$forceUpdate();
        },
        // 上传图片
        toBase64(e, index) {
            var that = this;
            let files = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onload = function() {
                let imgcode = this.result.replace(/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/, '');
                that.$axios
                    .post('/index.php?c=App&a=uploadAttachment', {
                        filename: files.name,
                        file_base64: imgcode,
                    })
                    .then(function(response) {
                        let _data = response.data;
                        if (_data.errcode === 0) {
                            that.attachments[index] = _data.content.url;
                            // 数据结果太深，强制渲染
                            that.$forceUpdate();
                        }
                    });
            };
        },
        // 预览图片
        showVantImg: function(value, index) {
            if (!value) {
                return false;
            }
            this.vant_ImgShow = true;
            this.vant_ImgIndex = index;
            this.vant_ImgArr = [];
            this.attachments.map(item => {
                if (item) {
                    this.vant_ImgArr.push(this.configs.api.public_domain + item);
                }
            });
        },
        //获取申请人信息
        init() {
            this.$axios
                .post('/index.php?c=App&a=getCorporationRealIndex', {
                    id: this.$route.query.id,
                    itemid: this.itemid,
                })
                .then(res => {
                    if (res.data.errcode == 0) {
                        this.attachments = res.data.content.attachments;
                        this.name = res.data.content.name;
                        this.card_no = res.data.content.cardno;
                        this.card_type = res.data.content.cardtype;
                        this.corptype = res.data.content.corptype;
                        this.status = res.data.content.status;
                        this.cfg_cardtype = res.data.content.cfg_cardtype;
                        this.cardtype_name = res.data.content.cardtype_name || this.cfg_cardtype[0].name;
                        this.corptype_name = res.data.content.corptype_name;
                        this.tips = res.data.content.tips;
                        this.switchType();
                        // switch (parseInt(this.corptype)) {
                        // 	case 1:
                        // 		this.corptype_name = "个人";
                        // 		break;
                        // 	case 2:
                        // 		this.corptype_name = "企业";
                        // 		break;
                        // 	case 3:
                        // 		this.corptype_name = "组织机构";
                        // 		break;
                        // 	case 4:
                        // 		this.corptype_name = "个体工商户";
                        // 		break;
                        // 	default:
                        // }
                        //this.options = res.data.content;
                        //this.corptype = this.options[0].key;
                    } else {
                        Toast({
                            message: res.data.errmsg,
                            duration: 1500,
                        });
                    }
                });
        },
        // 提交
        submitBtn: function() {
            const that = this;
            if (that.status == 1) {
                Toast({
                    message: '申请人已实名',
                    duration: 1500,
                });
                return;
            } else if (that.status == 2) {
                Toast({
                    message: '实名审核中,请勿重复提交',
                    duration: 1500,
                });
                return;
            } else {
                if (that.card_no == '') {
                    Toast({
                        message: '请输入证件号码',
                        duration: 1500,
                    });
                    return;
                }
                let upImg = false;
                for (let i = 0; i < that.attachments.length; i++) {
                    if (that.attachments[i] == '') {
                        upImg = true;
                    }
                }
                if (upImg) {
                    Toast({
                        message: '请上传证件图片',
                        duration: 1500,
                    });
                    return;
                }
                that.$axios
                    .post('/index.php?c=App&a=checkCorporationReal', {
                        id: that.$route.query.id,
                        itemid: that.itemid,
                        cardtype: that.card_type,
                        cardno: that.card_no,
                        attachments: that.attachments,
                    })
                    .then(res => {
                        if (res.data.errcode == 0) {
                            Toast({
                                message: res.data.errmsg,
                                duration: 2000,
                            });
                            setTimeout(() => {
                                let path = that.$route.query.path;
                                let orderId = that.$route.query.orderId;
                                if (orderId) {
                                    that.$router.push({
                                        path: path,
                                        query: {
                                            id: orderId,
                                        },
                                    });
                                } else {
                                    that.$router.push({
                                        path: path,
                                    });
                                }
                            }, 2000);
                        } else {
                            Toast({
                                message: res.data.errmsg,
                                duration: 1500,
                            });
                        }
                    });
            }
        },
    },
    created() {
        this.init(); //获取实名信息
    },
};
</script>
