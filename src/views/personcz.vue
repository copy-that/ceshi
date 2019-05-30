<template>
  <div class="page">
    <!-- header -->
    <Header/>
    <!-- 搜索 -->
    <Search/>
    <!--内容-->
    <div class="personmain">
      <!-- 个人中心导航 -->
      <Personnav/>
      <div class="person_right rec_main">
        <ul class="rec_con">
          <li class="money">
            <span class="name">充值金额：</span>
            <span class="input">
              <input type="number" v-model="money" placeholder="请输入充值金额">元
            </span>
          </li>
          <li class="fshi">
            <span class="name">充值方式：</span>
            <ul class="xz">
              <li @click="pay(2)" :class="{active:id===2}">
                <img src="../assets/images/pay1.png" alt>
                <span>微信支付</span>
              </li>
              <li @click="pay(1)" :class="{active:id===1}">
                <img src="../assets/images/pay2.png" alt>
                <span>支付宝支付</span>
              </li>
            </ul>
          </li>
          <li class="btn" @click="pay_click">立即充值</li>
          <div class="img_filex" @click="img_non" v-if="weixin">
            <img :src="'data:image/png;base64,'+weixin">
          </div>
        </ul>
      </div>
    </div>
    <!-- 底部导航 -->
    <Indexnav/>
    <!-- 底部 -->
    <Footer/>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Search from "../components/Search.vue";
import Indexnav from "../components/Indexnav.vue";
import Footer from "../components/Footer.vue";
import Personnav from "../components/Personnav.vue";
export default {
  components: {
    Header,
    Search,
    Indexnav,
    Footer,
    Personnav
  },
  name: "personmoney",
  data() {
    return {
      id: 2,
      money: "",
      weixin: null,
      orderNo: null
    };
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //关闭
    }
  },
  methods: {
    img_non() {
      this.weixin = null;
    },
    pay(id) {
      this.id = id;
    },
    pay_click() {
      var that = this;
      var data = this.qs.stringify({
        money: this.money,
        type: this.id,
        timer: null
      });
      this.$http("/payapi/recharge", "post", data, this.$store.state.token).then(res => {
        console.log(res);
        switch (res.data.code) {
          case 100:
            if (that.id === 1) {
              const div = document.createElement("div");
              div.innerHTML = res.data.data.date; //此处form就是后台返回接收到的数据
              document.body.appendChild(div);
              document.forms[0].submit();
            } else {
              that.weixin = res.data.data.date;
              that.orderNo = res.data.data.orderNo;
              that.timer = setInterval(that.orders, 3000);
            }
            break;
          default:
            break;
        }
      });
    },
    orders(orderNo) {
      var data = this.qs.stringify({
        orderNo: this.orderNo,
        type: 0
      });
      var that = this;
      this.$http("/payapi/queryOrder", "post", data, this.$store.state.token).then(res => {
        console.log(res);
        switch (res.data.data) {
          case 1:
            that.$router.go(0);
            this.$router.push({name:'personmoney', query: { type: 4 }})
            break;
        }
      });
    }
  },
  created(){
    if(this.$store.state.token==null || this.$store.state.token==''){
          this.$router.push({name:'login'})
    }
  }
};
</script>