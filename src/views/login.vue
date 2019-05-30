<template>
    <div class="page">
        <div class="Login_top">
            <div class="Login_center" @click="indexBtn">
                <img src="../assets/images/logo_top.png">
            </div>
        </div>
        <div class="Login_detail">
            <div class="Login_title">
                <p class="shou" @click='top_click(index)' :class='{p_hov:titleindex==index}' v-for='(item,index) in title' v-bind:key="index">{{item}}</p>
            </div>
            <div class="Login_login">
                <div class="Login_login_left">
                    <p class="Login_login_left_p1">登录</p>
                    <div class="Login_login_left_d1">
                        <p>账号：</p><input placeholder='请输入手机号' type="text" maxlength="11" v-model='account'>
                    </div>
                    <div class="Login_login_left_d1">
                        <p>密码：</p><input placeholder='请输入密码' type="password" maxlength="100" v-model='password' @keyup.enter="loginbtn">
                    </div>
                    <button class="Login_login_left_p2 center shou" style="border-radius:5px;border:none; outline: none;" @click="loginbtn" @keyup.enter="loginbtn">登录</button>
                    <!-- <Button  type="primary" @click="handleAddBook">录入</Button> -->
                    <p class="Login_login_left_p3">第三方登录</p>
                    <div class="Login_login_left_d2">
                        <img @click="wechatLogin" class="shou" src="../assets/images/weixin.png">
                        <img @click="qqLogin" class="shou" src="../assets/images/QQ.png">
                    </div>
                </div>
                <div class="Login_login_right center">
                    <p style="text-align: center;margin-top: 200px;">您还没有账号吗？</p>
                    <p class="shou" @click='top_click(1)'>立即注册</p>
                </div>
            </div>
        </div>
        <div class="tipbox" v-if="tipbox">
            <ul>
                <li class="textmsg">{{textmsg}}</li>
                <li class="tipbtn" @click="closebtn">确认</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
        tipbox:false,
        textmsg:'',
        colse:0,
        title: ['用户登录', '用户注册', '找回密码'],
        titleindex:0,
        account:'',
        password:''
    }
  },
  computed: {},
  methods: {
      
      indexBtn(){
           this.$router.push({name:'index'})
      },
        closebtn(){
            if(this.colse==0){
                this.tipbox=!this.tipbox
            }else{
                this.$router.push({name:'index'})
            }
            
        },
        top_click(index) {
            if(index==0){
                this.$router.push({name:'login'})
            }
            if(index==1){
                this.$router.push({name:'zhuc'})
            }
            if(index==2){
                this.$router.push({name:'zhmima'})
            }
        },
        loginbtn(){
          if(this.account==''){
            this.colse=0,
            this.tipbox=true,
            this.textmsg='请输入您的账号'
          }else if(this.password==''){
            this.colse=0,
            this.tipbox=true,
            this.textmsg='请输入您的密码'
          }else{
                var data=this.qs.stringify({
                    account:this.account,
                    password:this.password
                })
                this.$http('/app/commonUser/login','post',data,'').then(
                    res=>{
                        console.log(res)
                        if(res.data.code==100){
                            // console.log(res.data.data)
                            this.$store.commit('ADD_COUNT',res.data.data)
                            // this.$store.commit('ADD_COUNT','1')
                            this.colse=1
                            this.tipbox=true,
                            this.textmsg='登录成功'
                        }else{
                            this.colse=0,
                            this.tipbox=true,
                            this.textmsg=res.data.msg
                        }
                    },
                )
          }
            // console.log(this.$store.state.token)
            // console.log(this.$route.query.redirect)
            // this.$router.push({path:this.$route.query.redirect})
        },
        created:function(){
            // 回车登录
            document.onkeydown = e =>{
                let body = document.getElementsByTagName('body')[0]
                if (e.keyCode === 13 && e.target.baseURI.match(/inputbook/) && e.target === body) {
                    this.loginbtn()
                }
            }
		},
         //QQ第三方登录
        qqLogin(){
            window.location.href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101567550&redirect_uri=https%3A%2F%2Fwww.ximaiwu.com%2Fzhuc&state=qq";   
        },

        //微信第三方登录
        wechatLogin(){
            window.location.href="https://open.weixin.qq.com/connect/qrconnect?appid=wx4ecad07b53eb7918&redirect_uri=https://www.ximaiwu.com/zhuc&response_type=code&scope=snsapi_login&state=wx";
        }
    }
}
</script>