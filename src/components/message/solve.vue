<template>
	<div class="solve">
		<nav-header title="解决问题单"></nav-header>
		<div class="upload" @click="upload()">上传</div>
		<div class="solve_box">
			<div class="solve_title">{{ title }}</div>
			<div class="solve_list" v-for="list in lists" :key="list.id">
				<div class="list_title">{{ list.data_name }}</div>
				<div class="list_content">
					<div class="img_box" id="img_box">
						<div class="img_list" v-for="(item, index) in list.data_attachments.split(';').length" :key="index" :style="{
                backgroundImage:
                  'url(' +
                  'http://oapi.huyi.cn:6180/' +
                  list.data_attachments.split(';')[index] +
                  ')'
              }">
							<input class="file_i" type="file" multiple accept="image/*" ref="file" @change="
                  fileSelect($event, list.data_attr, list.data_name, list.id,list.data_attachments.split(';')[index])
                " />
							<div class="upFile">
								<div class="add">+</div>
								<div>上传</div>
							</div>
							<div class="removeIcon" @click="delImg(list.id, list.data_attachments, $event)"></div>
						</div>
						<div class="img_list" v-if="list.data_attr == 2">
							<input class="file_i" type="file" multiple accept="image/*" ref="file" @change="
                  fileSelect($event, list.data_attr, list.data_name, list.id)
                " />
							<div class="upFile">
								<div class="add">+</div>
								<div>上传</div>
							</div>
							<div class="removeIcon" @click="delImg(list.id, list.data_attachments, $event)"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from "mint-ui";
	export default {
		data() {
			return {
				lists: [], //问题列表
				title: "", //标题
				files: [], //上传的文件
				msid: ""
			};
		},
		created() {
			this.init();
		},
		methods: {
			//初始化
			init() {
				let _this = this;
				if (localStorage.msgId) {
					_this.msid = localStorage.msgId;
					this.$axios
						.post("index.php?c=App&a=getProblem", {
							userid: 1,
							msid: _this.msid
						})
						.then(function(response) {
							let arrFiles = [];
							if (response.data.errcode == 0) {
								_this.title = response.data.content.title;
								_this.lists = response.data.content.list;
								for (let i = 0; i < response.data.content.list.length; i++) {
									let objFiles = {};
									objFiles.filename = _this.lists[i].data_name;
									objFiles.id = _this.lists[i].id;
									objFiles.attachments = _this.lists[i].data_attachments;
									arrFiles.push(objFiles);
								}
								_this.files = arrFiles;
							}
						})
						.catch(function(error) {
							Toast({
								message: error.data.errmsg,
								duration: 3000
							});
						});
				}
			},
			//图片修改
			fileSelect(even, attr, name, id, attachments) {
				let _this = this;
				var fileList = even.target.files;
				var div;
				if (fileList) {
					for (var i = 0; i < fileList.length; i++) {
						var reader = new FileReader();
						reader.readAsDataURL(fileList[i]);
						//当文件读取成功时执行的函数
						reader.onload = function() {
							let imgcode = reader.result.replace(
							  /^data:image\/(jpeg|png|gif|jpg|bmp);base64,/,
							  ""
							);
							//调用图片附件上传
							_this.imgUp(imgcode, name, id,attachments);
							div = document.createElement("div");
							div.innerHTML =
								'<img src="' +
								this.result +
								'" style="width:100%;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;" />';
							div.style.cssText =
								"position: absolute;top:0;left:0;bottom:0;right:0;margin:auto;z-index:-1;";
							// div.classList.add('addImg');
							even.target.parentNode.appendChild(div);
						};
					}
				}
				if(attr==1){
					even.target.parentNode.style.backgroundImage="";
				}
				if (attr == 2) {
					//如果是多文件上传
					if(attachments){
						even.target.parentNode.style.backgroundImage="";
					}else{
						let newEven = even.target.parentNode.cloneNode(true);
						even.target.parentNode.parentNode.appendChild(newEven);
					}
					
				}
			},
			//上传文件处理，获取url
			imgUp(imgResult, name, id,attachments) {
				let _this = this;
				_this.$axios
					.post("index.php?c=App&a=uploadAttachment", {
						userid: 1,
						filename: name,
						file_base64: imgResult
					})
					.then(function(response) {
						if (response.data.errcode == 0) {
							var filesO = {};
							filesO.filename = name;
							filesO.id = id;
							filesO.attachments = response.data.content.url;
							for (var i = 0; i < _this.files.length; i++) {
								if (filesO.id == _this.files[i].id) {
									if(attachments){
										_this.files[i].attachments =
											_this.files[i].attachments + ";" + filesO.attachments;
									}else{
										_this.files[i].attachments = filesO.attachments;
									}
									return;
								}
							}
							_this.files.push(filesO);
						} else {
							Toast({
								message: response.data.errmsg,
								duration: 3000
							});
						}
					})
					.catch(function(error) {
						Toast({
							message: error.data.errmsg,
							duration: 3000
						});
					});
			},
			//图片上传
			upload() {
				let _this = this;
				if (this.files) {
					this.$axios
						.post("index.php?c=App&a=setProblemAttachment", {
							userid: 1,
							msid: _this.msid,
							data: JSON.stringify(_this.files)
						})
						.then(function(response) {
							if (response.data.errcode == 0) {
								Toast({
									message: response.data.errmsg,
									duration: 500
								});
								setTimeout(function() {
									_this.$router.push({
										path: "/message",
										name: "message"
									});
								}, 500);
							} else {
								Toast({
									message: response.data.errmsg,
									duration: 3000
								});
							}
						})
						.catch(function(error) {
							Toast({
								message: error.data.errmsg,
								duration: 3000
							});
						});
				} else {
					Toast({
						message: "请先选择上传文件",
						duration: 3000
					});
				}
			},

			delImg: function(id, att, event) {
				//刪除上已选图片的方法
				let _this = this;
				if (_this.files.length) {
					for (let i = 0; i < _this.files.length; i++) {
						if (id == _this.files[i].id) {
							//判断是否存在这个id
							let item = _this.files[i].attachments.split(";");
							if (item.length < 2) {
								//判断是否有多个
								//没有直接删除
								_this.files.splice(i, 1);
							} else {
								for (let j = 0; j < item.length; j++) {
									if (item[j] == att) {
										item.splice(j, 1); //删除
									}
								}
								_this.files[i].attachments = item.toString();
							}
							if (event.target.nextSibling) {
								event.target.parentNode.removeChild(event.target.nextSibling);
							}
							event.target.parentNode.style.backgroundImage = "";
						}
					}
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.solve{
		padding-top:1rem;
		height: 100%;
    overflow: scroll;
	}
	.upload {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 0.3rem;
		color: #333;
		z-index: 3;
		height: 0.9rem;
		line-height: 0.9rem;
		padding: 0 0.3rem;
	}

	.solve_box {
		padding: 0.3rem 0.32rem;
		font-size: 0.24rem;

		.solve_title {
			background: url(../../assets/images/message/icon_warning.png) 0.22rem center no-repeat;
			background-size: 0.24rem 0.24rem;
			color: #ea792c;
			background-color: #ffeadc;
			border-radius: 2px;
			line-height: 0.46rem;
			padding: 0.12rem 0.2rem 0.12rem 0.66rem;
		}

		.solve_list {
			margin-top: 0.16rem;

			.list_title {
				&:before {
					content: "";
					display: inline-block;
					width: 0.06rem;
					height: 0.26rem;
					background-color: #0086ff;
					border-radius: 50%;
					vertical-align: middle;
					margin-right: 0.14rem;
				}

				color: #2c3852;
				font-size: 0.28rem;
				font-weight: 500;
				line-height: 0.4rem;
				margin: 0.4rem 0 0 0;
			}

			.list_content {
				.img_box {
					overflow: hidden;
					padding-top: 0.4rem;

					.img_list {
						float: left;
						width: 1.94rem;
						margin-right: 0.34rem;
						border: 1px solid #dcdcdc;
						border-radius: 0.08rem;
						padding: 0.08rem;
						color: #999999;
						height: 2.62rem;
						position: relative;
						margin-bottom: 0.2rem;
						background-size: 100% 100%;

						.removeIcon {
							background: url(../../assets/images/message/icon_remove.png) center center no-repeat;
							background-size: 100% 100%;
							display: block;
							position: absolute;
							top: -0.24rem;
							right: -0.24rem;
							width: 0.48rem;
							height: 0.48rem;
						}

						.file_i {
							opacity: 0;
							width: 100%;
							height: 100%;
						}

						.upFile {
							z-index: -1;
							position: absolute;
							top: 0;
							left: 0;
							text-align: center;
							width: 100%;
							padding-top: 0.75rem;

							.add {
								font-size: 0.68rem;
								line-height: 0.68rem;
								font-weight: inherit;
							}
						}
					}
				}
			}
		}
	}
</style>
