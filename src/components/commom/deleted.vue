<template>
    <div class="left-delete">
        <div class="move"
             @touchstart="_touchStart"
             @touchmove="_touchMove"
             @touchend="_touchEnd"
             :style="txtStyle">
            <slot></slot>
        </div>
        <div class="deleteIcon" :style="zIndex"  @click.prevent="deleteItem(index)">删除</div>
    </div>
</template>

<script>

    export default {
        props: {
            index: Number
        },
        data() {
            return {
                startX: 0,       //触摸位置
                moveX: 0,       //滑动时的位置
                disX: 0,       //移动距离
                startY: 0,       //触摸位置
                moveY: 0,       //滑动时的位置
                disY: 0,       //移动距离

                txtStyle: '',
                delWidth: 200,
                top: '',
                zIndex: 'z-index:-1',
            }
        },
        methods: {
            _touchStart: function(ev) {
                ev = ev || event;
                // ev.preventDefault();

                if(ev.touches.length == 1){
                    // 手指按下的时候记录按下的位置
                    this.startX = ev.touches[0].clientX;
                    this.startY = ev.touches[0].clientY;
                }
            },
            _touchMove: function(ev) {
                ev = ev || event;
                // ev.preventDefault();
                if(ev.touches.length == 1) {
                    // 滑动过程中的实时位置
                    this.moveX = ev.touches[0].clientX
                    this.moveY = ev.touches[0].clientY
                    // 滑动过程中实时计算滑动距离
                    this.disX = this.startX - this.moveX;
                    this.disY = this.startY - this.moveY;
                    // console.log('disX==>',this.disX,9933,this.disY)

                    var w = this.disX < 0 ? this.disX * -1 : this.disX;      //x轴的滑动值
                    var h = this.disY < 0 ? this.disY * -1 : this.disY;     //y轴的滑动值
                    // console.log(w,h,w>h)
                    if(w > h){                //如果是在x轴中滑动//禁止页面滚动
                        ev.preventDefault(); 
                        // console.log(2)
                    }

                    // 如果是向右滑动或者只是点击，不改变滑动位置

                    if(this.disX < 0 || this.disX == 0) {
                        // console.log('没有移动');
                        this.txtStyle = "transform:translateX(0rem)";
                        // ev.preventDefault();
                    }else if (this.disX > 0) {
                        //如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
                        this.txtStyle = "transform:translateX(-" + this.disX/200 + "rem)";
                        if (this.disX >= this.delWidth/200) {
                            this.txtStyle = "transform:translateX(-" + this.delWidth/200 + "rem)";
                            this.zIndex = "z-index:" + 10 + "rem";

                        }
                    }
                }
            },
            _touchEnd: function(ev) {
                if (event.changedTouches.length == 1) {
                // ev.preventDefault();

                    this.startX = 0;
                    this.zIndex = "z-index:" + -1 + "rem";
                    // 手指移动结束后的水平位置
                    let endX = event.changedTouches[0].clientX;
                    // 触摸开始与结束,手指移动的距离
                    this.disX = this.startX - endX;
                    //如果距离小于删除按钮的1/2，不显示删除按钮
                }
            },
            deleteItem: function(index) {
                this.$emit('deleteItem', index);
            }
        }
    }
</script>

<style>
    .left-delete{
        width:100%;
        height:100%;
        position:relative;
        z-index:2;
    }
    .move{
        position: relative;
        transition: all .2s;
    }
    .deleteIcon{
        width: 1rem;
        /* height:100%; */
        position: absolute;
        right:0;
        top:50%;
        color: #999;
        font-size: 0.32rem;
        text-align: center;
        transform: translateY(-50%);
        /* background:url(./../../assets/main/4.png) no-repeat; */
        /* background: #ff0000; */
        background-size: contain;
    }
</style>