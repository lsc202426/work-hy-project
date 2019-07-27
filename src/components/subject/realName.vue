<template>
	<div class="add-subject realName head_box">
		<nav-header></nav-header>
		<div class="add-subject-main">
			<h1 class="add-subject-main-title">实名</h1>
			<div class="add-subject-main-txt">
				按照工信部要求，域名申请人必须实名；<br>
				提交实名信息后，将进入3-5个工作日的实名审核期
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
				<select v-model="card_type" @change="switchType()" class="select-box" v-if="status !== '1'||'2'">
					<option v-for="option in cfg_cardtype" v-bind:value="option.key" :key="option.key">
						{{ option.name }}
					</option>
				</select>
				<input type="text" v-model="cardtype_name" readonly="readonly" placeholder="请输入证件号码" v-if="status == '1'||status =='2'" />
			</div>
			<div class="add-subject-main-list">
				<label>证件号码</label>
				<input type="text" v-model.trim="card_no" :readonly="status == '1'||status == '2' ? 'readonly' : false" placeholder="请输入证件号码" />
			</div>
			<div class="upload">
				<p class="upload-title">上传证件图片</p>
				<div class="upload-main">
					<div class="upload-item upload-itemNew" v-for="(value, index) in attachments"
					 :key="value + index" v-bind:style="{
              backgroundImage: value
                ? 'url(' + 'http://oapi.huyi.cn:6180/' + value
                : '' + ')'
            }">
						<i class="cover" v-show="!value"></i>
						<span class="close" @click="closeBtn(index)" v-show="value"></span>
						<p class="text" v-show="!value && parseInt(corptype) === 1 && index === 0">
							上传正面
						</p>
						<p class="text" v-show="!value && parseInt(corptype) === 1 && index === 1">
							上传反面
						</p>
						<p class="text" v-show="!value && parseInt(corptype) !== 1 && index === 0">
							上传
						</p>
						<input type="file" :disabled="status == '1'||status =='2' ? 'disabled' : false" @change="toBase64($event, index)" class="upload-img" />
					</div>
				</div>
			</div>
			<button class="submit" @click="submitBtn">提交</button>
		</div>
	</div>
</template>
<script>
	import {
		Toast
	} from "mint-ui";
	export default {
		name: "realName",
		data() {
			return {
				options: [],
				isShow: false,
				// 主体类型
				corptype: "1",
				// 主体类型名称
				corptype_name:"个人",
				// 主体名称
				name: "",
				// 证件号码
				card_no: "",
				//证件类型
				card_type:"",
				//证件类型名字
				cardtype_name:"",
				// 上传图片
				attachments: ["", ""],
				//证件类型
				cfg_cardtype:[],
				//状态
				status:1,
				//corptype	是	类型，1：个人，2：企业，3：组织机构，4：个体工商户
			};
		},
		methods: {
			// 监听类型变化
			switchType: function() {
				switch (parseInt(this.card_type)) {
					case 1:
						this.attachments = ["", ""];
						break;
					case 2:
						this.attachments = [""];
						break;
					case 3:
						this.attachments = [""];
						break;
					case 4:
						this.attachments = [""];
						break;
					default:
				}
			},
			// 隐藏
			hideBox: function() {
				this.isShow = false;
			},
			// 清除
			closeBtn: function(index) {
				this.attachments[index] = "";
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
					let imgcode = this.result.replace(
						/^data:image\/(jpeg|png|gif|jpg|bmp);base64,/,
						""
					);
					that.$axios
						.post("/index.php?c=App&a=uploadAttachment", {
							filename: files.name,
							file_base64: imgcode
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
			//获取申请人信息
			init() {
				this.$axios.post('/index.php?c=App&a=getCorporationRealIndex',{
					id:this.$route.query.id
				})
				.then((res) => {
					if (res.data.errcode == 0) {
						this.attachments=res.data.content.attachments;
						this.name=res.data.content.name;
						this.card_no=res.data.content.cardno;
						this.card_type=res.data.content.cardtype;
						this.corptype=res.data.content.corptype;
						this.status=res.data.content.status;
						this.cardtype_name=res.data.content.cardtype_name;
						this.cfg_cardtype=res.data.content.cfg_cardtype;
						this.cardtype_name=res.data.content.cardtype_name;
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
							duration: 1500
						});
					}
				})
			},
			// 提交
			submitBtn: function() {
				if(this.status==1){
					Toast({
						message: "申请人已实名",
						duration: 1500
					});
					return;
				}else if(this.status==2){
					Toast({
						message: "实名审核中,请勿重复提交",
						duration: 1500
					});
					return;
				}else{
					if(this.card_no==""){
						Toast({
							message: "请输入证件号码",
							duration: 1500
						});
						return;
					}
					let upImg=false;
					for(let i=0;i<this.attachments.length;i++){
						if(this.attachments[i]==""){
							upImg=true;
						}
					}
					if(upImg){
						Toast({
							message: "请上传证件图片",
							duration: 1500
						});
						return;
					}
					this.$axios.post("/index.php?c=App&a=checkCorporationReal",{
						id:this.$route.query.id,
						cardtype:this.card_type,
						cardno:this.card_no,
						attachments:this.attachments
					})
					.then((res)=>{
						if (res.data.errcode == 0) {
							Toast({
								message: res.data.errmsg,
								duration: 200
							});
							setTimeout(()=>{
								this.$router.push({
									path:"subjectList"
								})
							},2000)
						}else{
							Toast({
								message: res.data.errmsg,
								duration: 1500
							});
						}
					})
				}
			},
		},
		created() {
			this.init(); //获取实名信息
		}
	};
</script>
