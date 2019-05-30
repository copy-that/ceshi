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
                <div class="Login_regiser_center" v-if='hideindex'>
                    <p class="Login_regiser_center_title">注册</p>
                    
                    <div class="Login_login_left_d1">
                        <p>手&ensp;机&ensp;号：</p><input placeholder='请输入您的手机号' type="text" maxlength="11" v-model="phone">
                    </div>
                    <div class="Login_login_left_d1">
                        <p>验&ensp;证&ensp;码：</p>
                        <input class="erweima" placeholder='请输入验证码' type="text" maxlength="11" v-model="phoneCode">
                       <i class="center shou" @click="startTimer">{{validtext}}</i>
                    </div>
                    <p class="Login_login_next center shou" @click='nextStep'>下一步</p>
                </div>
            </div>
            
            <div class="Login_regiser" v-if='showindex'>
                <div class="Login_regiser_center">
                    <p class="Login_regiser_center_title">设置密码</p>
                    <div class="Login_login_left_d1">
                        <p>机构名称：</p><input placeholder='请输入机构名称' type="text" maxlength="30" v-model="organizationName">
                    </div>
                    <div class="Login_login_left_d1">
                        <p>所属区域：</p>
                        <el-cascader
                            :options="options"
                            separator=','
                            v-model="selectedOptions"
                            @change="handleChange">
                        </el-cascader>
                    </div>
                    <div class="Login_login_left_d1">
                        <p>所属行业：</p>
                        <el-select v-model="value" placeholder="请选择" @change="industryChange">
                        <el-option
                            v-for="item in industry"
                            :key="item.id"
                            :label="item.industryName"
                            :value="item.id">
                        </el-option>
                        </el-select>
                    </div>
                    <div class="Login_login_left_d1">
                        <p>机构简介：</p>
                    </div>
                    <textarea name="" id="" class="jgjj" cols="30" rows="10" v-model="organizationMsg"></textarea>
                    <div class="Login_login_left_d1">
                        <p>联&ensp;系&ensp;人：</p><input placeholder='请输入联系人名字' type="text" maxlength="30" v-model="organizationPerson">
                    </div>
                    <div class="Login_login_left_d1">
                        <p>联系地址：</p><input placeholder='请输入您的联系地址' type="text" maxlength="30" v-model="address">
                    </div>
                    <div class="Login_login_left_d1">
                        <p>设置密码：</p><input placeholder='请输入您的密码' type="password" v-model='passl'>
                    </div>
                    <div class="Login_login_left_d1">
                        <p>确认密码：</p><input placeholder='请再次输入您的密码' type="password" v-model='passx'>
                    </div>
                    <p class="Login_login_next center shou" @click="btnsubmit">提交</p>
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
import {addressData} from '../assets/js/area1.js';
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
        tipbox:false,
        textmsg:'请输入您的联系方式！',
        organizationName:'',//机构名称
        provinceId:'',//省份ID
        cityId:'',//城市ID
        areaId:'',//区域ID
        industryId:'',//所属行业ID
        organizationMsg:'',//机构简介
        organizationPerson:'',//联系人
        address:'',//联系地址
        phone:'',//联系电话
        phoneCode:'',//验证码
        phoneyzm:'',
        passl:'',
        passx:'',
        validtext:'获取验证码',
        isDisable :false,
        wait:60,
        phoneCode:'',
        hideindex:true,
        showindex:false,
        title: ['用户登录', '用户注册', '找回密码'],
        titleindex:1,
        options: [],
        selectedOptions: [],
        industry:[],
        value:'',
        contenttext:''

    }
  },
  mounted(){
    this.options=addressData
    this.$http('/otherInfo/getIndustryList','get','','').then(
        res=>{
            if(res.data.code==100){
                // console.log(res)
                this.industry=res.data.data
            }
        },
    )
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
                // console.log(res)
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
        nextStep(){
            var that=this
            if(this.phone==''){
                this.tipbox=true,
                this.textmsg='请输入手机号！'
            }else if(!this.validPhone(this.phone)){
                that.tipbox=true,
                that.textmsg='请输入正确的联系方式！'
            }else if(this.phoneCode==''){
                this.tipbox=true,
                this.textmsg='请输入验证码！'
            }else if(this.phoneyzm !== this.phoneCode){
                this.tipbox=true,
                this.textmsg='请输入正确验证码！'
            }else{
                var data3=this.qs.stringify({
                    phone:this.phone,
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
                                    phone:that.phone,
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
        // 区域
        handleChange:function (value) {
            this.provinceId=value[0]
            this.cityId=value[1]
            this.areaId=value[2]
            console.log(this.provinceId,this.cityId,this.areaId)
        },
        // 行业
        industryChange:function (value) {
            this.industryId=value
            console.log(this.industryId);
        },
        // 获取验证码
        startTimer() {
            var that = this;
            if(that.phone==''){
                that.tipbox=true,
                that.textmsg='请输入您的联系方式！'
            }else if(!that.validPhone(this.phone)){
                that.tipbox=true,
                that.textmsg='请输入正确的联系方式！'
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
                    phone:that.phone,
                    type:1,
                })
                this.$http('/otherInfo/sendSmsCode','post',data1,'').then(
                    res=>{
                        if(res.data.code==100){
                            console.log(res.data.data)
                            this.phoneyzm=res.data.data
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
        btnsubmit(){
            if(this.organizationName==''){
                this.tipbox=true,
                this.textmsg='请输入机构名称！'
            }else if(this.provinceId==''){
                this.tipbox=true,
                this.textmsg='请选择所属区域！'
            }else if(this.cityId==''){
                this.tipbox=true,
                this.textmsg='请选择所属区域！'
            }else if(this.areaId==''){
                this.tipbox=true,
                this.textmsg='请选择所属区域！'
            }else if(this.industryId==''){
                this.tipbox=true,
                this.textmsg='请选择所属行业！'
            }else if(this.organizationMsg==''){
                this.tipbox=true,
                this.textmsg='请输入机构简介！'
            }else if(this.organizationPerson==''){
                this.tipbox=true,
                this.textmsg='请输入联系人姓名！'
            }else if(this.address==''){
                this.tipbox=true,
                this.textmsg='请输入详细联系地址！'
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
                    phone:this.phone,
                    password:this.passx,
                    provinceId:this.provinceId,
                    cityId:this.cityId,
                    areaId:this.areaId,
                    address:this.address,
                    industryId:this.industryId,
                    organizationName:this.organizationName,
                    organizationMsg:this.organizationMsg,
                    organizationPerson:this.organizationPerson,
                    platformType:1,
                    wxUnionId:this.wxUnionid,
                    wxOpenId:this.wxOpenid,
                    // qqUnionId:this.qqUnionid,
                    qqOpenId:this.qqUnionid,
                })
                this.$http('/app/commonUser/registBroker','post',data2,'').then(
                    res=>{
                        if(res.data.code==100){
                            console.log(res.data)
                            this.tipbox=true,
                            this.success=1,
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
<style lang="">
    .jgjj{
        display: block;
        width: 95%;
        height: 200px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ddd;
        outline: none;
    }
    .el-cascader{
        font-size: 16px;
    }
    .el-input__inner{
        border: none;
        padding: 0;
    }
    .el-cascader__label{
        padding: 0;
    }
    .el-input__inner{
      border: none !important;
    }
    input::-webkit-input-placeholder {color: #666 !important;}
</style>