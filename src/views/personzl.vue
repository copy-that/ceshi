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
      <div class="person_right per_main" style="padding: 0">
        <ul class="per_form">
          <li
            class="img"
            :style="{backgroundImage: 'url('+ headimg +')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}"
          >
            <img :src="phoneimg" alt>
            <input ref="phoneimg" @change="uploadimg($event)" type="file">
          </li>
          <li class="name">
            <span>昵&ensp;&ensp;称：</span>
            <input type="text" v-model="nickName" placeholder="请输入昵称">
          </li>
          <li class="name">
            <span>手机号：</span>
            <input type="text" disabled placeholder="请输入手机号" v-model="phonetel">
          </li>
          <li class="name">
            <span>性&ensp;&ensp;别：</span>
            <ul class="sex">
              <li :class="sex==0?'active':''" @click="sexbtnnv">女</li>
              <li :class="sex==1?'active':''" @click="sexbtnnan">男</li>
            </ul>
          </li>
          <li class="textnav">
            <router-link :to="{ name: 'personpass', query: { type: 10 }}">修改密码 ></router-link>
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
      headimg: require("../assets/images/upimg4.jpg"),
      phoneimg: "",
      nickName: "",
      phonetel:'',
      sex: 0
    };
  },
  methods: {
    closebtn(){
        this.tipbox=!this.tipbox
    },
    // 上传图片
    uploadimg(event) {
      var that = this;
      let files = event.target.files[0];
      if (!files) return;
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onloadend = function() {
        that.phoneimg = this.result;
      };
    },
    sexbtnnv() {
      this.sex = 0;
    },
    sexbtnnan() {
      this.sex = 1;
    },
    submitBtn() {
        if(this.phoneimg==''){
            this.tipbox=true,
            this.textmsg='请上传头像！'
        }else if(this.nickName==''){
            this.tipbox=true,
            this.textmsg='请输入昵称！'
        }else{
            let form = new FormData()
            form.append('image',this.$refs.phoneimg.files[0])
            form.append('nickName',this.nickName)
            form.append('sex',this.sex)
            this.$http("/app/commonUser/updateUserInfo","post",form,this.$store.state.token).then(res => {
                if (res.data.code == 100) {
                    this.tipbox=true,
                    this.textmsg='保存成功'
                }
            });
        }
    }
  },
  created() {
    if(this.$store.state.token==null || this.$store.state.token==''){
          this.$router.push({name:'login'})
      }
    this.$http(
      "/app/commonUser/getInfo",
      "post",
      "",
      this.$store.state.token
    ).then(res => {
      if (res.data.code == 100) {
        this.phoneimg=res.data.data.atavar
        this.nickName=res.data.data.nickName
        this.phonetel=res.data.data.account
        this.sex=res.data.data.sex
      }
    });
  }
};
</script>