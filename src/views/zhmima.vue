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
                <div class="Login_regiser_center">
                    <p class="Login_regiser_center_title">找回密码</p>
                    <div class="Login_login_left_d1">
                        <p>手&ensp;机&ensp;号：</p><input placeholder='请输入您的手机号' type="text" maxlength="11" v-model="zctel">
                    </div>
                    <div class="Login_login_left_d1">
                        <p>验&ensp;证&ensp;码：</p>
                        <input class="erweima" placeholder='请输入验证码' type="text" maxlength="11" v-model="zcyzm">
                        <i class="center shou" @click="startTimer">{{validtext}}</i>
                    </div>
                    <div class="Login_login_left_d1">
                        <p>设置密码：</p><input placeholder='请输入您的密码' type="password" v-model="passl">
                    </div>
                    <div class="Login_login_left_d1">
                        <p>确认密码：</p><input placeholder='请再次输入您的密码' type="password" v-model="passx">
                    </div>
                    <p class="Login_login_next center shou" @click="submitbtn">提交</p>
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
        tipnum:0,
        tipbox:false,
        textmsg:'',
        title: ['用户登录', '用户注册', '找回密码'],
        titleindex:2,
        validtext:'获取验证码',
        wait:60,
        isDisable :false,
        zctel:'',
        zcyzm:'',
        passl:'',
        passx:'',
    }
  },
  methods: {
      indexBtn(){
           this.$router.push({name:'index'})
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
        validPhone(phone){
            var myreg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$$/;
            return myreg.test(phone)
        },
        closebtn(){
            if(this.tipnum==0){
                this.tipbox=!this.tipbox
            }else{
                this.$router.push({name:'login'})
            }
        },
        startTimer() {
            var that=this
            if(that.zctel==''){
                that.tipbox=true,
                that.textmsg='请输入您的联系方式！'
            }else if(!that.validPhone(this.zctel)){
                that.tipbox=true,
                that.textmsg='请输入正确联系方式！'
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
                var data=that.qs.stringify({
                    phone:that.zctel,
                    type:2,
                })
                that.$http('/otherInfo/sendSmsCode','post',data,'').then(
                    res=>{
                        if(res.data.code==100){
                            console.log(res)
                        }else{
                            that.tipbox=true,
                            that.textmsg=res.data.msg
                        }
                    },
                )
            }
            
        },
        submitbtn(){
            if(this.zctel==''){
                this.tipbox=true,
                this.textmsg='请输入您的联系方式！'
            }else if(!this.validPhone(this.zctel)){
                this.tipbox=true,
                this.textmsg='请输入正确联系方式！'
            }else if(this.zcyzm==''){
                this.tipbox=true,
                this.textmsg='请输入验证码！'
            }else if(this.passl==''){
                this.tipbox=true,
                this.textmsg='请输入密码！'
            }else if(this.passx==''){
                this.tipbox=true,
                this.textmsg='请再次输入密码！'
            }else if(this.passx !== this.passl){
                this.tipbox=true,
                this.textmsg='两次输入的密码不一致！'
            }else{
                var data=this.qs.stringify({
                    phone:this.zctel,
                    type:2,
                    code:this.zcyzm,
                })
                this.$http('/otherInfo/checkSmsCode','post',data,'').then(
                    res=>{
                        if(res.data.code==100){
                            console.log(res)
                            var that=this
                            var data1=this.qs.stringify({
                                phone:this.zctel,
                                phoneCode:this.zcyzm,
                                password:this.passl,
                                repassword:this.passx
                            })
                            this.$http('/app/commonUser/updateForgetPassword','post',data1,'').then(
                                res=>{
                                    if(res.data.code==100){
                                        console.log(res)
                                        this.tipnum=1
                                        this.tipbox=true,
                                        this.textmsg='修改密码成功！'
                                        
                                    }
                                },
                            )
                        }
                    },
                )
            }
        }
    }
}
</script>