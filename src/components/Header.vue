<template>
  <div class="header">
    <ul>
      <li class="img" @click="indexBtn">
        <img src="../assets/images/logo_top.png" alt>
      </li>
      <li class="title">房主租售
        <span>·</span> 中介代理
        <span>·</span> 楼盘推广
        <span>·</span> 民宿酒店
      </li>
    </ul>
    <ul class="y_login" v-if="showText">
      <li>
        <span class="right1">欢迎回来，{{nickname}}</span>
        <span class="right2" @click="personbtn">用户中心</span>
        <span class="right2" @click="quitbtn">退出</span>
      </li>
    </ul>
    <ul class="y_type" v-if="showLogin">
      <li>
        <span @click="resgbtn(1)">注册</span>
        <span @click="resgbtn(2)">登录</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 注册登录
      showText: true,
      showLogin: false,
      //昵称
      nickname:'',
    };
  },
  mounted() {
    console.log(this.$store.state.token)
    // 判断是否有token
    if (this.$store.state.token == null && this.$store.state.token =='') {
      this.showText = !this.showText;
      this.showLogin = !this.showLogin;
    }else{
      this.$http('/app/newPartApi/getNickName','post','',this.$store.state.token).then(
      res=>{
          // console.log(res)
          if(res.data.code==100){
            this.nickname=res.data.data
          }else{
            this.showText = !this.showText;
            this.showLogin = !this.showLogin;
          }
          
      })
    }
  },
  methods: {
    // 注册登录跳转
    resgbtn(type) {
      if (type == 2) {
        this.$router.push({ name: "login" });
      }
      if (type == 1) {
        this.$router.push({ name: "zhuc" });
      }
    },
    indexBtn() {
      this.$router.push({ name: "index" });
    },
    personbtn(){
      this.$router.push({name:'personzl', query: { type: 10 }})
    },
    quitbtn(){
      this.$store.commit('ADD_COUNT','')
      console.log(this.$store.token)
    },
    quitbtn(){
      this.$store.commit('ADD_COUNT','')
      this.$router.push({ name: "index" });
    },
  }
};
</script>
<style lang="">
.header ul .img {
  cursor: pointer;
}
    .header .y_login{
        width: 1200px;
        margin: auto;
        margin-top: -40px;
    }
    .header .y_login li{
        width: 100%;
        text-align: right;
        font-size: 16px;
    }
    .header .y_login li span{
        margin-left: 20px;
    }
    .header .y_login li .right1{
        color: #000;
        font-weight: 600
    }
    .header .y_login li .right2{
        cursor: pointer;
        color:#F76617
    }
    .header .y_type{
      width: 1200px;
      margin: auto;
      margin-top: -40px;
    }
     .header .y_type li{
        width: 100%;
        text-align: right;
        font-size: 18px;
    }
    .header .y_type li span{
        cursor: pointer;
        margin-left: 20px;
    }
    .header .y_type li span:hover{
      color:#F76617
    }
</style>
