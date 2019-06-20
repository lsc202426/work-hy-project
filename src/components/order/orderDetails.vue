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
        personnel_name: "王老五",
        personnel_phone: "15246464644",
        total: "总金额",
        fee_other: "其他费用",
        status: "待付款",
        notice_type: "通知信息类型",
        notice_msg: "通知信息内容",
        created_time: "2019.05.06",
        item: [
          {
            id: "订单产品id",
            keyword: "注册词",
            product_name: "点商标",
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
