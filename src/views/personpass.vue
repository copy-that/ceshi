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
      <div class="person_right per_main">
        <ul class="pass_main">
          <li>
            <input type="password" placeholder="请输入旧密码" v-model="oldPassword">
          </li>
          <li>
            <input type="password" placeholder="请设置新密码（6-20位数字或字母）" v-model="password">
          </li>
          <li>
            <input type="password" placeholder="请再次输入密码" v-model="rePassword">
          </li>
          <li class="btn" @click="submitBtn">保存</li>
        </ul>
      </div>
    </div>
    <!-- 底部导航 -->
    <Indexnav/>
    <!-- 底部 -->
    <Footer/>
    <div class="tipbox" v-if="tipbox">
      <ul>
        <li class="textmsg">{{textmsg}}</li>
        <li class="tipbtn" @click="closebtn">确认</li>
      </ul>
    </div>
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
  name: "personabout",
  data() {
    return {
      tipbox: false,
      textmsg: "",
      oldPassword: "",
      password:'',
      rePassword:''
    };
  },
  methods: {
    closebtn(){
        this.tipbox=!this.tipbox
    },
    submitBtn(){
        if(this.oldPassword==''){
            this.tipbox=true,
            this.textmsg='请输入旧密码!'
        }else if(this.password==''){
            this.tipbox=true,
            this.textmsg='请设置新密码!'
        }else if(this.rePassword==''){
            this.tipbox=true,
            this.textmsg='请再次输入密码!'
        }else if(this.password !== this.rePassword){
            this.tipbox=true,
            this.textmsg='输入的新密码不一致!'
        }else{
            var data=this.qs.stringify({
               oldPassword:this.oldPassword,
               password:this.password,
               rePassword:this.rePassword 
            })
            this.$http("/app/commonUser/updatePassword","post",data,this.$store.state.token).then(res => {
              if (res.data.code == 100) {
                this.tipbox=true,
                this.textmsg='修改密码成功!'
              }else{
                this.tipbox=true,
                this.textmsg=res.data.msg
              }
            });
        }
    }
  }
};
</script>