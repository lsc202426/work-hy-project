/*
 *注册公共组件
 */

//推荐品牌顾问弹窗
import saleCode from '@/components/common/saleCode';
// 头部分类导航
import narList from '@/components/common/narList';
// 空白页
import blankPage from '@/components/common/blankPage.vue';
// 导航按钮
import NavBotton from '@/components/common/navBotton.vue';
// 公共头部
import NavHeader from '@/components/common/navHeader.vue';
// 申请人列表删除
import deleted from '@/components/common/deleted.vue';
// 联系客服
import CustomerService from '@/components/common/customerService.vue';
// 上传资料
import uploadFiles from '@/components/common/uploadFiles.vue';

export default Vue => {
    Vue.component('saleCode', saleCode); //品牌顾问
    Vue.component('narList', narList); //分类导航
    Vue.component('blankPage', blankPage); //分类导航
    Vue.component('navBotton', NavBotton); //导航按钮
    Vue.component('navHeader', NavHeader); // 公共头部
    Vue.component('deleted', deleted); // 申请人列表删除
    Vue.component('CustomerService', CustomerService); // 联系客服
    Vue.component('UploadFiles', uploadFiles); // 上传资料
};
