<template>
  <div class="order-deatil">
    <div class="detail-top">详情</div>
    <div class="detail-main"></div>
    <div class="detail-customer-info"></div>
    <div class="detail-bottom"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: {
        id: "2019039277297412977",
        order_no: "订单编号",
        corp_name: "签约客户",
        personnel_name: "联系人",
        personnel_phone: "联系电话",
        total: "总金额",
        fee_other: "其他费用",
        status: "订单状态",
        notice_type: "通知信息类型",
        notice_msg: "通知信息内容",
        created_time: "时间",
        item: [
          {
            id: "订单产品id",
            keyword: "注册词",
            product_name: "产品类型名称",
            feetype: "注册模式",
            year: "年限",
            amount: "数量",
            price: "单价",
            fee_verify: "审核费",
            total: "总价"
          }
        ]
      }
    };
  }
};
</script>
