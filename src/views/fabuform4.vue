<template>
  <div class="page">
    <!-- header -->
    <Header/>
    <!--main-->
    <div class="fabu_page" style="padding-bottom:50px;">
      <div class="fabu_page_top">
        <p>
          <router-link :to="{ name: 'fabu'}">选择类型 ></router-link>发布卖厂房仓库信息
        </p>
      </div>
      
      <ul class="fabu_list">
        <li class="name">所属地区：</li>
        <li class="input">
          <el-cascader
            placeholder="请选择所属地区"
            :options="options"
            separator=","
            v-model="selectedOptions"
            @change="handleChange"
            @blur='blurChange'>
          </el-cascader>
        </li>
      </ul>
      <ul class="fabu_list">
        <li class="name">有&ensp;效&ensp;期：</li>
        <li class="input">
          <el-select v-model="value" placeholder="请选择有效期限" @change="industryChange">
            <el-option
              v-for="item in industry"
              :key="item.id"
              :label="item.periodName"
              :value="item.periodValue"
            ></el-option>
          </el-select>
        </li>
      </ul>
      <ul class="fabu_list">
        <li class="name">信息标题：</li>
        <li class="input">
          <input class="text" placeholder="请输入信息标题" type="text" v-model="title">
        </li>
      </ul>
      <ul class="fabu_list">
        <li class="name">称&emsp;&emsp;呼：</li>
        <li class="input">
          <input class="text" placeholder="我们应该如何称呼您" type="text" v-model="callName">
        </li>
      </ul>
      <ul class="fabu_list">
        <li class="name">手机号码：</li>
        <li class="input">
          <input class="text" placeholder="您的联系方式，方便我们及时与您联系" type="text" v-model="phone">
        </li>
      </ul>
      <ul class="fabu_list">
        <li class="name">地理位置：</li>
        <li class="input">
            <el-select
                v-model="value9"
                filterable
                remote
                reserve-keyword
                placeholder="请输入详细地址"
                :remote-method="remoteMethod"
                @change="addloc">
                <el-option
                v-for="item in add"
                :key="item.uid"
                :label="item.name"
                :value="item.name+','+item.location.lat+','+item.location.lng">
                </el-option>
            </el-select>
        </li>
      </ul>
      <ul class="fabu_list">
        <li class="name">看房时间段：</li>
        <li class="input">
          <input class="text" placeholder="请填写看房时间段" type="text" v-model="seeBook">
        </li>
      </ul>
      <ul class="fabu_list" style="border:none">
        <li class="name">身&emsp;&emsp;份：</li>
        <li class="fabu_right">
          <span :class="identity==0?'active':''" @click="identityA">个人</span>
          <span :class="identity==1?'active':''" @click="identityB">代理人</span>
        </li>
        <li class="fabu_zj" v-if="zjshow">
          <p class="zj_name">代&ensp;理&ensp;费：</p>
          <p class="zj_money">
            <input placeholder="" type="number" v-model="zjmoney">
            <span>元</span>
          </p>
        </li>
      </ul>
      <ul class="fabu_list" style="border:none">
        <li class="name">面&emsp;&emsp;积：</li>
        <li class="fabu_area">
          <input placeholder="" type="number" v-model="area">
          <span>平方米</span>
        </li>
      </ul>
      <ul class="fabu_list" style="border:none">
        <li class="name">价&emsp;&emsp;格：</li>
        <li class="fabu_area">
          <input placeholder="" type="number" v-model="price">
          <span>万元</span>
        </li>
      </ul>
      <ul class="fabu_list">
        <li class="name">客服电话：</li>
        <li class="input">
          <input class="text" placeholder="(选填)" type="text" v-model="keepertel">
        </li>
      </ul>
       <ul class="fabu_list" style="border:none;margin:0px auto">
        <li class="name" style="width:100%">上传房源照片:</li>
      </ul>
      <ul class="fabu_up">
        <li class="upbtn">
          <img src="../assets/images/upimg4.jpg">
          <input ref="images" @change="uploadimg" type="file">
        </li>
        <li class="imgUp" v-for="(item,index) in upimg" v-bind:key="index">
          <img :src="item" alt="">
          <span @click="deletebtn(index)">X</span>
        </li>
      </ul>
      <!-- 新加视频 -->
      <ul class="fabu_list" style="border:none;margin:0px auto">
        <li class="name" style="width:100%">上传房源视频(选填):</li>
      </ul>
      <ul class="fabu_up">
        <li class="upbtn">
          <img src="../assets/images/upimg4.jpg">
          <input ref="video" @change="uploadvideo" type="file" accept = "video/*">
        </li>
        <li class="imgUp" v-if="videoPop" style="background: #000;">
          <span @click="delavideo">X</span>
          <video ref="vidsou" :src="videoPop" height="100" width="100" @click="preview"></video>
        </li>
      </ul>
      <ul class="fabu_list" style="border:none;margin:0px auto;height:auto">
        <li class="name" style="width:100%;line-height:50px;">房源信息:</li>
        <textarea class="fy_text" placeholder="描述一下您的房子吧! 无效虚假房源，须赔付看房客信息费!" v-model="remark"></textarea>
      </ul>
      <div class="yu_main">
          <ul class="yu_title1">购买使用标签可以加快租/售速度!</ul>
          <ul class="yop">
            <li @click="qmbtn(index,item)" v-for="(item,index) in biaoqianlist" v-bind:key="index" > 
                <img class="img" :src="item.tagPicUrl" alt="">
                <img class="btn1" v-if="item.buy==1" src="../assets/images/kuang_hover.png" alt="">
                <img class="btn1" v-else src="../assets/images/kuang.png" alt="">
                <span class="msg">{{item.remark}}</span>
            </li>
          </ul>
          <ul class="yu_money">
              <li class="left">您已选择标签：
                  <span v-for="(item,index) in titletext" v-bind:key="index">{{item}}、 </span> 
              </li>
              <li class="money">总计：<span>{{Math.round( (total)*100)/100}}元</span></li>
              <!-- <li class="btn" @click="sumbitBtnK">确认购买</li> -->
          </ul>
      </div>
      <ul class="fabu_btn">
        <li class="text">置顶发布的信息可使成交率提高5倍!</li>
        <Button class="btn" @click="releaseBtn" :disabled="isDisable">发布</Button>
      </ul>
    </div>
    <!-- 底部 -->
    <Footer/>
    <!-- 购买己认证 -->
    <div class="from_black" v-if="zhezhao">
      <div class="from_white">
        <p class="from_white_title">
          购买<i>“己认证”</i>标签后请致电专属客服进行下一步认证 后才会显示标签!
        </p>
        <div class="from_white_d1" style="line-height: 52px; text-align: center">
          <p class="center shou" @click="()=>{this.zhezhao=false}">取消</p>
          <p class="center shou" @click="zzbtn">确定</p>
        </div>
      </div>
    </div>
    <div class="tipbox" v-if="tipbox">
        <ul>
            <li class="textmsg">{{textmsg}}</li>
            <li class="tipbtn" @click="closebtn">确认</li>
        </ul>
    </div>
    <div class="tipbox" v-if="tipbox1">
        <ul>
            <li class="textmsg">{{textmsg1}}</li>
            <li class="tipbtn" @click="closebtn1">确认</li>
        </ul>
    </div>
    <div class="tipbox" v-if="tipbox2">
        <ul>
            <li class="textmsg">{{textmsg2}}</li>
            <li class="tipbtn" @click="closebtn2">确认</li>
        </ul>
    </div>
    <div class="tipbox" v-if="tipbox3">
        <ul>
            <li class="textmsg" style="height:120px;line-height:120px;">{{textmsg3}}</li>
            <img style="display:block;margin:auto" src="../assets/images/icon_gif.gif" alt="">
        </ul>
    </div>
    <div class="paymain" v-if='showdisplay'>
          <div class="paymain_box">
              <ul class="money">
                  <li class="num">￥{{Math.round( (total)*100)/100}}</li>
                  <li class="title">请选择支付方式</li>
              </ul>
              <ul class="way">
                  <li @click="pay(2)" :class="{active:zfId===2}">
                      <img src="../assets/images/pay1.png" alt="">
                      <span>微信</span>
                  </li>
                  <li @click="pay(1)" :class="{active:zfId===1}">
                      <img src="../assets/images/pay2.png" alt="">
                      <span>支付宝</span>
                  </li>
                  <li @click="pay(3)" :class="{active:zfId===3}">
                      <img src="../assets/images/pay3.png" alt="">
                      <span>金币</span>
                  </li>
              </ul>
              <ul class="btn">
                  <li class="left" @click='zfclose'>取消</li>
                  <li class="right" @click="pay_click">确认</li>
              </ul>
          </div>
      </div>
      <div class="img_filex" @click="img_non" v-if="weixin">
          <img :src="'data:image/png;base64,'+weixin">
      </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { addressData } from "../assets/js/area1.js";
import { error } from 'util';
export default {
  components: {
    Header,
    Footer
  },
  name: "fabuform1",
  data() {
    return {
      total:0,
      videoPop:'',
      isDisable:false,
      zfId:2,
      weixin: null,
      showdisplay:false,
      tipbox1:false,
      textmsg1:'',
       tipbox2:false,
      textmsg2:'',
       tipbox3:false,
      textmsg3:'',
      orderNumber:'',

      tipbox:false,
      textmsg:'',
      zhezhao: false,
      zjshow:false,
      bqarry:['1','1','1','1'],
      bqId:[],
      titletext:[],
      money1:0,
      bqrz:0,
      bqrzId:'',
      money2:0,
      title1:'',
      bqarry3:'',
      bqaId:'',
      title2:'',
      money3:0,
      bqarry4:'',
      bqbId:'',
      title3:'',
      money4:0,
      bqarry5:'',
      bqcId:'',
      title4:'',
      money5:0,
      bqarry6:'',
      bqdId:'',
      title5:'',
      money6:0,
      biaoqianlist:[],
      //上传图片
      upimg: [],
      //地区
      options: [],
      selectedOptions: [],
      addname:'全国',
      //有效期
      industry: [],
      value: "",
      // 地址
      add:[],
      value9: [],  
      keepertel:'',
      provinceId: "", //省份ID
      cityId: "", //城市ID
      zoneId: "", //区域ID
      validityFlag: "", //有效期
      title: "", //信息标题
      callName:'',//称呼
      phone:'',//电话
      locationText:'',//地址位置
      latitude:'',//纬度
      longitude:'',//经度
      identity: 0,//身份
      zjmoney:'',//中介费
      area:'',//面积
      price:'',//价格
      images:[],//图片
      remark:'',//房源信息
      seeBook:'',//看房时间段
    };
  },
  mounted() {
    //   地区
    this.options = addressData;
    // 有效期
    this.$http("/app/rendInfoApi/getPeriod","post","",this.$store.state.token).then(res => {
      if (res.data.code == 100) {
        // console.log(res);
        this.industry = res.data.data;
      }
    });
  },
  methods: {
    qmbtn(index,item){
        const {id,buy,tagPrice,tagName,block} = item
        if(buy==0){
          this.total += tagPrice
          this.bqId.push(id)
          this.titletext.push(tagName)
          this.biaoqianlist[index].buy=1
      }else{
          this.total -= tagPrice
          this.biaoqianlist[index].buy=0
          var indId = this.bqId.indexOf(id)
          this.bqId.splice(indId,1)
          this.titletext.splice(indId,1)
    
      }
    },
    closebtn(){
        this.tipbox=!this.tipbox
    },
    validPhone(phone){
        var myreg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$$/;
        return myreg.test(phone)
    },
    //  选择城市
    handleChange: function(value) {
      // console.log(value)
      this.provinceId = value[0];
      this.cityId = value[1];
      this.zoneId = value[2];
    },
    blurChange(res){
        this.addname=res.target.defaultValue
    },
    // 选择有效期
    industryChange: function(value) {
      this.validityFlag = value;
      // console.log(value)
    },
    // 地址
    addloc(value){
        this.locationText=value.split(',')[0]
        this.latitude=value.split(',')[1]
        this.longitude=value.split(',')[2]
    },
    remoteMethod(query){
         console.log(query)
         var that = this
         $.ajax({
            type:'get',
            url:'https://api.map.baidu.com/place/v2/suggestion',
            data:{
                query:query,
                region:that.addname,
                output:'json',
                // ak:'E12Fa1o1rpK9GiadGhvG6ObeVjlGTsw5',
                ak:'wLPpSzY4Qhtzb8R19fAksW3MkKG0BOjd',
                page_size:10,
            },
            dataType:'jsonp',
            success:function(res){
                that.add=res.result
                console.log(that.add)
            },
        });
     },
    // 选择身份
    identityA(){
      this.identity=0
      this.zjshow=false
    },
    identityB(){
      this.identity=1
      this.zjshow=true
    },
    delavideo(){
      this.$confirm('删除后不能再次上传该视频, 是否继续?', '删除?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.videoPop = ''
      });
    },
    preview(){
      let video = this.$refs.vidsou;
      video.play()
    },
    // 上传视频
    uploadvideo(event){ 
      var that = this;
      let files = event.target.files[0];
      if (!files) return;
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onloadend = function() {
      that.videoPop = this.result;
      that.$refs.video.files[0].values = null
      };
        // let form = new FormData()
        // form.append("file", event.target.files[0]);
        // this.$http("/otherInfo/uploadVideo","post",form,'').then(res => {
        //   if (res.data.code == 100) {
        //     this.videoCover = res.data.data
        //   }
        // });
    },
    // 上传图片
    uploadimg: function(event) {
      var that = this;
      let files = event.target.files[0];
      if (!files) return;
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onloadend = function() {
      that.upimg.push(this.result);
      };
      this.images.push(this.$refs.images.files[0])
      console.log(this.images)
    },
    //删除图片
    deletebtn: function(index) {
      this.upimg.splice(index, 1);
      this.images.splice(index, 1);
      // console.log(this.upimg);
    },
    zzbtn(){
      this.submitbtn()
    },
    // 发布
    releaseBtn(){
      if(this.provinceId==''){
        this.tipbox=true,
        this.textmsg='请选择所属地区！'
      }else if(this.cityId==''){
        this.tipbox=true,
        this.textmsg='请选择所属地区！'
      }else if(this.zoneId==''){
        this.tipbox=true,
        this.textmsg='请选择所属地区！'
      }else if(this.validityFlag==''){
        this.tipbox=true,
        this.textmsg='请选择有效期限！'
      }else if(this.title==''){
        this.tipbox=true,
        this.textmsg='请输入信息标题！'
      }else if(this.callName==''){
        this.tipbox=true,
        this.textmsg='请输入您的称呼！'
      }else if(this.phone==''){
        this.tipbox=true,
        this.textmsg='请输入您的联系方式！'
      }else if(!this.validPhone(this.phone)){
        this.tipbox=true,
        this.textmsg='请输入正确的联系方式！'
      }else if(this.locationText==''){
        this.tipbox=true,
        this.textmsg='请输入详细地址！'
      }else if(this.latitude==''){
        this.tipbox=true,
        this.textmsg='请输入详细地址！'
      }else if(this.longitude==''){
        this.tipbox=true,
        this.textmsg='请输入详细地址！'
      }else if(this.area==''){
        this.tipbox=true,
        this.textmsg='请输入面积！'
      }else if(this.price==''){
        this.tipbox=true,
        this.textmsg='请输入价格！'
      }else if(this.images.length==''){
        this.tipbox=true,
        this.textmsg='请上传图片！'
      }else if(this.remark==''){
        this.tipbox=true,
        this.textmsg='请填写房子的描述！'
      }else if(this.seeBook==''){
        this.tipbox=true,
        this.textmsg='请填写看房时间段！'
      }else if(this.bqrz==''){
        this.submitbtn()
      }else{
        // this.zhezhao=true
        this.submitbtn()
      }
    },
    submitbtn(){
      this.isDisable = true
      this.tipbox3=true
      this.textmsg3='信息提交中，请耐心等待...'
      var money=Math.round( (this.money1 + this.money2 + this.money3 + this.money4 + this.money5 + this.money6)*100)/100
      // var tageId=this.bqId.join(',')
      var tageId=this.bqId
      if(this.bqrzId==''){
        tageId=tageId
      }else{
        tageId.push(this.bqrzId) 
      }
      if(this.bqaId==''){
        tageId=tageId
      }else{
        tageId.push(this.bqaId) 
      }
      if(this.bqbId==''){
        tageId=tageId
      }else{
        tageId.push(this.bqbId)
      }
      if(this.bqcId==''){
        tageId=tageId
      }else{
        tageId.push(this.bqcId)
      }
      if(this.bqdId==''){
        tageId=tageId
      }else{
        tageId.push(this.bqdId)
      }
      tageId=tageId.join(',') 
      console.log(tageId)
      let form = new FormData()
      if(this.videoPop!==''){
        form.append('video',this.$refs.video.files[0])
      }
      for( let imk in this.images){
        form.append('image',this.images[imk])
      }
      form.append('type',7)
      form.append('keepertel',this.keepertel)
      form.append('provinceId',this.provinceId)
      form.append('cityId',this.cityId)
      form.append('zoneId',this.zoneId)
      form.append('validityFlag',this.validityFlag)
      form.append('title',this.title)
      form.append('callName',this.callName)
      form.append('phone',this.phone)
      form.append('locationText',this.locationText)
      form.append('identity',this.identity)
      form.append('tbBrokerageFee',this.zjmoney)
      form.append('area',this.area)
      form.append('price',this.price)
      form.append('remark',this.remark)
      form.append('longitude',this.longitude)
      form.append('latitude',this.latitude)
      form.append('payPrice',money)
      form.append('tagsId',tageId)
      form.append('seeBook',this.seeBook)
      this.$http("/app/rendInfoApi/saveOffice","post",form,this.$store.state.token).then(res => {
        this.isDisable = false
        if (res.data.code == 100) {
          console.log(res);
          this.tipbox3=false
          if(money==0){
            this.tipbox2=true,
            this.textmsg2=res.data.msg
          }
          else{
            this.orderNumber=res.data.data.orderNumber
            this.showdisplay=!this.showdisplay
          }
        }
      });
    },
    closebtn2(){
        this.$router.push({name:'personfabu', query: { type: 2 }})
    },
    // 支付
    closebtn1(){
        this.tipbox1=!this.tipbox1
    },
    // 二维码
    img_non() {
        this.weixin = null;
    },
    // 选择支付方式
    pay(zfId) {
        this.zfId = zfId;
    },
    zfclose(){
        this.$router.go(0)
    },
    pay_click(){
            var that=this
             var data=this.qs.stringify({
                orderNo:this.orderNumber,
                payType:this.zfId,
                type:2
            })
            if(this.zfId==1){
                this.$http('/payapi/payOrder','post',data,this.$store.state.token).then(
                res=>{
                    console.log(res)
                    if(res.data.code==100){
                        const div = document.createElement("div");
                        div.innerHTML = res.data.data.date; //此处form就是后台返回接收到的数据
                        document.body.appendChild(div);
                        document.forms[0].submit();
                    }
                })
            }
            if(this.zfId==2){
                this.$http('/payapi/payOrder','post',data,this.$store.state.token).then(
                res=>{
                    console.log(res)
                    if(res.data.code==100){
                        that.weixin = res.data.data.date;
                        that.orderNo = res.data.data.orderNo;
                        that.timer = setInterval(that.orders, 3000);
                    }
                })
            }
            if(this.zfId==3){
                this.$http('/payapi/payByBalance','post',data,this.$store.state.token).then(
                res=>{
                    console.log(res)
                    if(res.data.code==100){
                        this.tipbox2=!that.tipbox1
                        this.textmsg2=res.data.msg
                        this.showdisplay=!this.showdisplay
                    }else{
                        this.tipbox1=!that.tipbox1
                        this.textmsg1=res.data.msg
                        this.showdisplay=!this.showdisplay
                    }
                })
            }
        },
        orders(orderNo) {
            var data = this.qs.stringify({
                orderNo: this.orderNo,
                type:2
            });
            var that = this;
            this.$http("/payapi/queryOrder", "post", data, this.$store.state.token).then(res => {
                console.log(res);
                switch (res.data.data) {
                case 1:
                    that.$router.go(0);
                    this.$router.push({name:'personfabu', query: { type: 2 }})
                    break;
                }
            });
        },
  },
  created(){
      this.$http('/app/rendInfoApi/getAllTags','post','',this.$store.state.token).then(
          res=>{
              if(res.data.code==100){
                  res.data.data.forEach(item => {  
                        item.buy=0
                        this.biaoqianlist.push(item)
                    });
              }
          },
      )
    }
};
</script>
<style>
.el-cascader,
.el-select {
  width: 480px !important;
  font-size: 16px;
}
.el-input__inner {
  border: none !important;
}
input::-webkit-input-placeholder {
  color: #666 !important;
}
.el-input__inner {
  font-size: 16px !important;
}
.fabu_list {
  width: 600px;
  height: 40px;
  padding: 3px 0;
  line-height: 40px;
  margin: 20px auto;
  border-bottom: 1px solid #f3f3f3;
}
.fabu_list .name {
  float: left;
  width: 105px;
}
.fabu_list .input {
  float: left;
  width: 480px;
  height: 40px;
}
.fabu_list .input .text{
    display: block;
    width: 480px;
    height: 40px;
    padding: 0 25px 0 15px;
    font-size: 16px;
}
.fabu_list .input img{
    display: block;
    width: 30px;
    height: 30px;
    margin-left: 15px;
}
.fabu_list .fabu_right{
  float: left;
  width:200px;
  height: 40px;
  margin-left: 15px;
}
.fabu_list .fabu_right span{
  display: block;
  float: left;
  width: 80px;
  color: #999;
  text-indent: 25px;
  background: url("../assets/images/pay_t.jpg") no-repeat left center;
  background-size: 14px 15px;
  cursor: pointer;
}
.fabu_list .fabu_right .active{
  background: url("../assets/images/pay_t.png") no-repeat left center;
  background-size: 14px 15px;
}
.fabu_zj{
  float: left;
  width: 280px;
  height: 40px;
  line-height: 40px;
}
.zj_name{
  float: left;
  width: 100px;
   height: 40px;
  line-height: 40px;
}
.zj_money{
  float: left;
  width: 180px;
   height: 40px;
  line-height: 40px;
}
.zj_money input{
  float: left;
  display: block;
  width: 100px;
   height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #f3f3f3
}
.zj_money span{
  float: left;
  display: block;
  width: 80px;
   height: 40px;
  line-height: 40px;
  text-align: center;
}
.fabu_list .fabu_area{
  float: left;
  width: 240px;
  height: 40px;
}
.fabu_list .fabu_area input{
  float: left;
  display: block;
  width: 120px;
  height: 40px;
  margin-left: 20px;
  border-bottom: 1px solid #f3f3f3;
}
.fabu_list .fabu_area span{
  float: left;
  display: block;
  width: 100px;
  height: 40px;
  text-align: center;
}
.fabu_up{
  width: 600px;
  padding: 5px 0;
  margin: auto;
  overflow: hidden;
}
.fabu_up .upbtn{
  float: left;
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 20px;
  margin-bottom: 20px;
  
}
.fabu_up .upbtn img{
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100px;
  height: 100px;
}
.fabu_up .upbtn input{
  position: absolute;
  display: block;
  width: 100px;
  height: 100px;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}
.fabu_up .imgUp{
  float: left;
  position: relative;
   width: 100px;
  height: 100px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.fabu_up .imgUp img{
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100px;
  height: 100px;
}
.fabu_up .imgUp span{
  display: block;
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  cursor: pointer;
}
.fy_text{
  display: block;
  width: 100%;
  height: 180px;
  border: 1px solid #ddd;
  resize: none;
  padding: 10px;
  font-size: 14px;
  font-family: "微软雅黑";
  outline: none;
}
.fabu_btn{
  width: 600px;
  margin:20px auto 0;
}
.fabu_btn .text{
  text-align: center;
  line-height: 100px;
}
.fabu_btn .btn{
  width: 600px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background: #F76617;
  border-radius: 5px;
  cursor: pointer;
}
.yu_main{
        position: relative;
        width: 1198px;
        border: 1px solid #ddd;
        margin:50px auto 0;
        padding-bottom: 80px;
    }
    .yu_main ul{
        width: 1100px;
        margin: 30px auto;
        overflow: hidden;
    }
    .yu_main .yu_money{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 80px;
        line-height: 80px;
        background: #f3f3f3;
        margin: 0 auto;
    }
    .yu_main .yu_money .left{
        float: left;
        width: 800px;
        height: 80px;
        text-indent: 50px;
        font-size: 20px;
        color: #000000;
    }
    .yu_main .yu_money .money{
        float: right;
        text-align: center;
        width: 200px;
        height: 80px;
        color: #000000;
        font-size: 20px;
    }
    .yu_main .yu_money .btn{
        float: left;
        width: 198px;
        height: 80px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        background: #ff6b00
    }
    .yu_main .yu_money .money span{
        color: #ff6b00
    }
    .yu_main .yu_title1{
        font-size: 20px;
    }
    .yu_main ul li{
        position: relative;
        float: left;
        width: 120px;
        height: 120px;
        cursor: pointer;
    }
    .yu_main .yop {
        margin-bottom: 50px;
    }
    .yu_main .yop li{
        margin-right: 0;
        margin-bottom: 50px;
    }
    .yu_main .yop_z li{
        margin-right: 0px;
    }
    .yu_main ul li .img{
        position: absolute;
        top: 0;
        left: 10px;
        display: block;
        width: 100px;
        height: 100px;
    }
    .yu_main ul li .btn1{
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -8px;
        width: 16px;
        height: 16px;
    }
    .yu_main ul li .msg{
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        width: 100px;
        height: 100px;
        padding: 10px;
        color: #fff;
        text-align: center;
        font-size: 14px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.5)
    }
    .yu_main ul li:hover .msg{
        display: block;
        
    }
</style>