<template>
  <div class="apply-class">
    <!-- head -->
    <nav-header title="申请类别"></nav-header>
    <div class="apply-class-main">
      <div class="left bscroll" ref="bscrollLf">
        <ul class="bscroll-container left-main">
          <li
            v-for="item of applyClass"
            :key="item.key"
            class="list-item"
            @click="switchType(item)"
          >
            <span class="icons" :class="{ active: item.isSelect }"></span>
            <label class="text">{{ item.name }}</label>
            <i
              class="tips"
              :class="{ active: allTypeClass[item.key].length > 0 }"
              v-if="allTypeClass[item.key] && allTypeClass[item.key].length > 0"
              >{{ allTypeClass[item.key].length }}</i
            >
          </li>
        </ul>
      </div>
      <div class="right bscroll" ref="bscrollRg">
        <ul class="bscroll-container right-main">
          <li v-for="(list, index) in curList" :key="index">
            <div class="right-main-title" @click.stop="switchCurList(list)">
              <span
                class="icons"
                :class="{
                  active:
                    temptSelect[list.categorycode] &&
                    temptSelect[list.categorycode].length > 0
                }"
              ></span>
              <label class="text">{{ list.codename }}</label>
            </div>
            <ul
              class="right-main-child"
              v-show="
                temptCurList[isChildSelect] &&
                  isChildSelect === list.categorycode &&
                  isShow
              "
            >
              <li
                v-for="value in temptCurList[isChildSelect]"
                :key="value.productid"
                @click="selectProduct(value)"
              >
                <span class="icons" :class="{ active: value.isSelect }"></span>
                <label class="text">{{ value.productname }}</label>
              </li>
            </ul>
          </li>
        </ul>
        <p class="loading" v-show="isLoading">
          正在加载数据...
        </p>
        <!-- <div class="right-saerch" v-show="applyClass && applyClass.length > 0">
          <input type="text" placeholder="搜索商品" />
          <i class="search-icons"></i>
        </div> -->
      </div>
    </div>
    <div class="apply-class-bottom">
      <label>合计:￥{{ allPrice }}元</label>
      <button @click="sureSelect">确定</button>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      applyClass: [],
      curList: [],
      curChildList: [],
      isLoading: false,
      // 大类选中
      classSelect: "",
      // 暂存当前子类选中
      isChildSelect: "",
      // 暂存当前子类数据
      temptCurList: {},
      isShow: false,
      // 暂存选中数据
      temptSelect: {},
      itemArr: [],
      allTypeClass: {},
      allItemArr: [],
      allPrice: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      let bscrollDomLf = this.$refs.bscrollLf;
      this.aBScroll = new BScroll(bscrollDomLf, {
        mouseWheel: true,
        click: true,
        tap: true
      });

      let bscrollDomRg = this.$refs.bscrollRg;
      this.aBScroll = new BScroll(bscrollDomRg, {
        mouseWheel: true,
        click: true,
        tap: true
      });
    });
  },
  methods: {
    getApplyClass: function() {
      const that = this;
      that.$axios
        .post("/index.php?c=App&a=getBsClass", { userid: 1 })
        .then(function(response) {
          that.applyClass = response.data.content.list;
          // 遍历添加
          that.applyClass.map(function(item) {
            if (item.key === "01") {
              item.isSelect = true;
              that.classSelect = item.key;
            } else {
              item.isSelect = false;
            }
          });
          that.curList = response.data.content.current;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 切换分类
    switchType: function(item) {
      const that = this;
      that.applyClass.map(function(_item) {
        _item.isSelect = false;
      });
      if (that.allTypeClass[item.key]) {
        that.allItemArr = that.allTypeClass[item.key];
      } else {
        that.allItemArr = [];
      }
      item.isSelect = true;
      // 数据结果太深，强制渲染
      that.$forceUpdate();
      // 显示加载数据
      that.isLoading = true;
      that.curList = [];
      // 记录当前选中大类
      that.classSelect = item.key;
      that.$axios
        .post("/index.php?c=App&a=getBsProductService", {
          userid: 1,
          bskey: item.key,
          keyword: item.categorycode,
          pgroup: "",
          productid: ""
        })
        .then(function(response) {
          that.curList = response.data.content;
          that.isLoading = false;
        })
        .catch(function(error) {
          that.isLoading = false;
          console.log(error);
        });
    },
    // 切换小类
    switchCurList: function(item) {
      const that = this;
      if (that.isChildSelect === item.categorycode) {
        that.isShow = !that.isShow;
      } else {
        that.isShow = true;
      }
      if (that.temptSelect[item.categorycode]) {
        that.itemArr = that.temptSelect[item.categorycode];
      } else {
        that.itemArr = [];
      }
      if (that.temptCurList[item.categorycode]) {
        that.isChildSelect = item.categorycode;
        return false;
      }
      that.$axios
        .post("/index.php?c=App&a=getBsProductService", {
          userid: 1,
          bskey: that.classSelect,
          keyword: "",
          pgroup: item.categorycode,
          productid: ""
        })
        .then(function(response) {
          let _data = response.data;
          if (_data.errcode === 0) {
            let temptdata = _data.content[0].children;
            temptdata.map(function(_item) {
              // console.log(_item);
              _item.isSelect = false;
            });
            // console.log(temptdata);
            that.temptCurList[item.categorycode] = temptdata;

            that.isChildSelect = item.categorycode;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 选中商标
    selectProduct: function(_item) {
      const that = this;
      _item.isSelect = !_item.isSelect;
      // 数据结果太深，强制渲染
      this.$forceUpdate();
      // 是否删除
      let isDelete = false;
      let isSamllDelete = false;
      if (_item.isSelect) {
        this.itemArr.push(_item);
        this.allItemArr.push(_item);
      } else {
        that.temptSelect[this.isChildSelect].map(function(m, key) {
          if (_item.productid === m.productid) {
            that.temptSelect[that.isChildSelect].splice(key, 1);
            if (that.temptSelect[that.isChildSelect].length < 1) {
              isSamllDelete = true;
            }
          }
        });
        console.log(that.allTypeClass);
        console.log(this.classSelect);
        // if (that.allTypeClass[this.classSelect]) {
        that.allTypeClass[this.classSelect].map(function(m, key) {
          if (_item.productid === m.productid) {
            that.allTypeClass[that.classSelect].splice(key, 1);
            if (that.allTypeClass[that.classSelect].length < 1) {
              // 判断删除
              isDelete = true;
            }
          }
        });
        // }
      }
      if (isSamllDelete) {
        delete that.temptSelect[that.isChildSelect];
      } else {
        this.temptSelect[this.isChildSelect] = this.itemArr;
      }
      if (isDelete) {
        delete that.allTypeClass[that.classSelect];
      } else {
        this.allTypeClass[this.classSelect] = this.allItemArr;
      }
      // 计算大类
      let len = Object.keys(this.allTypeClass).length;
      let bigPrice = 0;
      // console.log(len);
      if (len >= 1) {
        bigPrice = (len - 1) * 1200;
      }
      // 计算小类
      let smallArrl = [];
      let smallPrice = 0;
      for (let key in this.allTypeClass) {
        smallArrl.push(this.allTypeClass[key].length);
      }
      for (let i = 0; i < smallArrl.length; i++) {
        if (smallArrl[i] > 10) {
          smallPrice += (smallArrl[i] - 10) * 200;
        }
      }
      // 总计，无年份
      this.allPrice = bigPrice + smallPrice;
    },
    // 确认
    sureSelect: function() {
      console.log(this.allTypeClass);
    }
  },
  created() {
    this.getApplyClass();
  }
};
</script>
