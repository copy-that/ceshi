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
            <div class="Login_regiser">
                <p class="Login_regiser_title"><router-link :to="{ name: 'zhuc'}">选择注册类型></router-link>填写注册信息{{showindex?'>设置密码':''}}</p>
                <div class="Login_regiser_center" v-if="hideindex">
                    <p class="Login_regiser_center_title">注册</p>
                    <div class="Login_login_left_d1">
                        <p>手&ensp;机&ensp;号：</p><input placeholder='请输入您的手机号' type="text" maxlength="11" v-model='zctel'>
                    </div>
                    <div class="Login_login_left_d1">
                        <p>验&ensp;证&ensp;码：</p>
                        <input class="erweima" placeholder='请输入验证码' type="text" maxlength="11" v-model='zcyzm'>
                        <i class="center shou" @click="startTimer">{{validtext}}</i>
                    </div>
                    <p class="Login_login_next center shou" @click='nextStep'>下一步</p>
                </div>
            </div>
            <div class="Login_regiser" v-if='showindex'>
                <div class="Login_regiser_center">
                    <p class="Login_regiser_center_title">设置密码</p>
                    <div class="Login_login_left_d1">
                        <p>昵&emsp;&emsp;称：</p><input placeholder='请设置一个昵称' type="text" maxlength="30" v-model='zcname'>
                    </div>
                    <div class="Login_login_left_d1">
                        <p>设置密码：</p><input placeholder='请输入您的密码' type="password" v-model='passl'>
                    </div>
                    <div class="Login_login_left_d1">
                        <p>确认密码：</p><input placeholder='请再次输入您的密码' type="password" v-model='passx'>
                    </div>
                    <p class="Login_login_next center shou" style="margin-bottom:50px;" @click="btnsubmit">提交</p>
                    <p class="xieyi">注册即同意用户协议</p>
                    <p class="xieyi_detail" v-html='contenttext'></p>
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
        state:'',
        wxUnionid:'',
        wxOpenid:'',
        qqUnionid:'',
        qqOpenid:'',

        success:0,
        tipbox:false,textmsg:'',
        colse:0,hideindex:true,showindex:false,
        title: ['用户登录', '用户注册', '找回密码'],
        titleindex:1,
        validtext:'获取验证码',isDisable :false,
        wait:60,phoneCode:'',zcname:'',zctel:'',zcyzm:'',passl:'',passx:'',contenttext:''
    }
  },
  created(){
    console.log(this.$route.query)
    this.state=this.$route.query.state
    this.wxUnionid=this.$route.query.wxUnionid
    this.wxOpenid=this.$route.query.wxOpenid
    this.qqUnionid=this.$route.query.qqUnionid
    this.qqOpenid=this.$route.query.qqOpenid
    // 协议
    this.$http('/otherInfo/getAgreement','get','','').then(
        res=>{
            if(res.data.code==100){
                this.contenttext=res.data.data
            }
        },
    )
  },
  methods: {
      indexBtn(){
           this.$router.push({name:'index'})
      },
       closebtn(){
          if(this.success==1){
              this.$router.push({name:'login'})
          }else if(this.success==2){
              this.$router.push({name:'index'})
          }else{
              this.tipbox=!this.tipbox
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
        startTimer() {
            var that = this;
            if(this.zctel==''){
                this.tipbox=true,
                this.textmsg='请输入您的联系方式！'
            }else if(!this.validPhone(this.zctel)){
                this.tipbox=true,
                this.textmsg='请输入正确的联系方式！'
            }else if(that.disable==true){
                 return
            }else{
                var timer =  setInterval(function() {
                    if (that.wait == 0) {
                    that.disable = false;
                    that.validtext = "获取验证码";
                    that.wait = 60;
                    clearTimeout(timer)
                } else {
                    that.disable = true;
                    that.validtext = "重新发送(" + that.wait + ")";
                    that.wait--;
                  }
                }, 1000);
                var data1=this.qs.stringify({
                    phone:that.zctel,
                    type:1,
                })
                this.$http('/otherInfo/sendSmsCode','post',data1,'').then(
                    res=>{
                        if(res.data.code==100){
                            console.log(res.data.data)
                            this.phoneCode=res.data.data
                        }else{
                            that.tipbox=true,
                            that.textmsg=res.data.msg
                        }
                    },
                )
            }
            
        },
         validPhone(phone){
            var myreg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$$/;
            return myreg.test(phone)
        },
        nextStep(){
            var that = this
            if(this.zctel==''){
                this.tipbox=true,
                this.textmsg='请输入您的联系方式！'
            }else if(!this.validPhone(this.zctel)){
                this.tipbox=true,
                this.textmsg='请输入正确的联系方式！'
            }else if(this.zcyzm !== this.phoneCode){
                this.tipbox=true,
                this.textmsg='请输入正确验证码！'
            }else{
                var data3=this.qs.stringify({
                    phone:this.zctel,
                    type:1,
                    code:this.phoneCode,
                })
                this.$http('/otherInfo/checkSmsCode','post',data3,'').then(
                    res=>{
                        if(res.data.code==100){
                            console.log(res)
                            if(that.state==''){
                                that.showindex=!that.showindex
                                that.hideindex=!that.hideindex
                            }else{
                                var data4=this.qs.stringify({
                                    phone:that.zctel,
                                    phoneCode:that.phoneCode,
                                    platformType:1,
                                    wxUnionId:that.wxUnionid,
                                    wxOpenId:that.wxOpenid,
                                    // qqUnionId:that.qqUnionid,
                                    qqOpenId:that.qqUnionid,
                                })
                                this.$http('/app/commonUser/bangdingWxQq','post',data4,'').then(
                                    res=>{
                                        console.log(res)
                                        if(res.data.code==101){
                                            that.tipbox=true,
                                            that.textmsg=res.data.msg
                                        }
                                        if(res.data.code==102){
                                            that.success=1
                                            that.tipbox=true,
                                            that.textmsg=res.data.msg
                                        }
                                        if(res.data.code==100){
                                            if(res.data.data=='' || res.data.data==null){
                                                that.showindex=!that.showindex
                                                that.hideindex=!that.hideindex
                                            }else{
                                                that.success=2
                                                that.$store.commit('ADD_COUNT',res.data.data)
                                                that.tipbox=true,
                                                that.textmsg=res.data.msg
                                            }
                                            
                                        }
                                    }
                                )
                            }
                        }
                    },
                )
           
            }
        },
        btnsubmit(){
            if(this.zcname==''){
                this.tipbox=true,
                this.textmsg='请输入昵称！'
            }else if(this.passl==''){
                this.tipbox=true,
                this.textmsg='请输入密码！'
            }else if(this.passx==''){
                this.tipbox=true,
                this.textmsg='请再次输入密码！'
            }else if(this.passl !== this.passx){
                this.tipbox=true,
                this.textmsg='输入密码不一致！'
            }else{
                var data2=this.qs.stringify({
                    phoneCode:this.phoneCode,
                    phone:this.zctel,
                    password:this.passx,
                    nickName:this.zcname,
                    platformType:1,
                    wxUnionId:this.wxUnionid,
                    wxOpenId:this.wxOpenid,
                    // qqUnionId:this.qqUnionid,
                    qqOpenId:this.qqUnionid,
                })
                this.$http('/app/commonUser/registUser','post',data2,'').then(
                    res=>{
                        if(res.data.code==100){
                            console.log(res.data)
                            this.success=1,
                            this.tipbox=true,
                            this.textmsg='注册成功'
                        }
                        if(res.data.code==104){
                            console.log(res.data)
                            this.tipbox=true,
                            this.success=1,
                            this.textmsg=res.data.msg
                        }
                    },
                )
            }
        }
    }
}
</script>