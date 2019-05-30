<template>
    <div class="page">
        <!-- header -->
        <Header/>
        <!-- 搜索 -->
        <Search/>
        <!--内容-->
        <div class="navlistXq">
            <ul class="top"><span @click="prev" style="cursor: pointer;">买房</span> > 房源信息</ul>
            <ul class="release" style="padding:0;">
                <li>发布人：{{fwxqtext.callName}}</li>
                <li>{{fwxqtext.title}}</li>
                <li>房源编号：{{fwxqtext.number}}</li>
                <li>发布类型：{{fwxqtext.identityMsg }}</li>
            </ul>
            <div class="navlistmain">
                <div class="listbanner">
                    <BaseGallery :index="0" :video="fwxqtext.infoVideoUrl"  :images="glalerys"></BaseGallery>
                </div>
                <!-- <div class="listbanner">
                    <div class="large_box">
                        <ul>
                            <li v-for="(item,index) in fwxqtext.picUrls&&fwxqtext.picUrls.split(',')" v-bind:key="index">
                                <img :src="item+'?x-oss-process=image/resize,m_pad,h_400,w_700,color_f9f9f9'" width="700" height="400">
                            </li>
                        </ul>
                    </div>
                    <div class="small_box">
                        <span class="btn left_btn"></span>
                        <div class="small_list">
                            <ul>
                                <li v-for="(item,index) in fwxqtext.picUrls&&fwxqtext.picUrls.split(',')" v-bind:key="index">
                                    <img :src="item+'?x-oss-process=image/resize,m_fill,h_120,w_120'" width="120" height="120">
                                    <div class="bun_bg"></div>
                                </li>
                            </ul>
                        </div>
                        <span class="btn right_btn"></span>
                    </div>
                </div> -->
                <div class="navlistright">
                    <ul class="content">
                        <li class="collection" @click="collectbtn">
                            <img v-if="fwxqtext.coll==1" src="../assets/images/icon7.png" alt="">
                            <img v-else src="../assets/images/icon6.png" alt="">
                            <span v-if="fwxqtext.coll==1">已收藏</span>
                            <span v-else >收藏</span>
                            <!-- <Share :shareConfig="['more','qzone','tsina','tqq','renren','weixin']" /> -->
                        </li>
                        <li class="text" v-if="fwxqtext.tbBrokerageFee==0"> <span>代&ensp;理&ensp;费：</span><span>无</span></li>
                        <li class="text" v-if="fwxqtext.tbBrokerageFee!==0"><span>代&ensp;理&ensp;费：</span><span>{{fwxqtext.tbBrokerageFee}}</span></li>
                        <li class="text"><span>区&emsp;&emsp;域：</span><span>{{fwxqtext.locationText}}</span></li>
                        <li class="text" v-if="fwxqtext.infoType==10"><span>档&emsp;&emsp;次：</span><span>{{fwxqtext.grade}}</span></li>
                        <li class="text" v-if="fwxqtext.infoType==10"><span>配&emsp;&emsp;套：</span><span>{{fwxqtext.mating}}</span></li>
                        <li class="text" v-if="fwxqtext.infoType==1 || fwxqtext.infoType==9"><span>装&emsp;&emsp;修：</span><span>{{fwxqtext.dicorationNum}}</span></li>
                        <li class="text" v-if="fwxqtext.infoType==1 || fwxqtext.infoType==2 || fwxqtext.infoType==9"><span>房&emsp;&emsp;型：</span><span>{{fwxqtext.classify}}</span></li>
                        <li class="text" v-if="fwxqtext.infoType==2"><span>出租类型：</span><span>{{fwxqtext.form}}</span></li>
                        
                        <li class="text" v-if="fwxqtext.infoType==1 || fwxqtext.infoType==3 || fwxqtext.infoType==5 || fwxqtext.infoType==7 || fwxqtext.infoType==9">
                            <span>价&emsp;&emsp;格：</span>
                            <span>{{fwxqtext.price}}万元</span>
                        </li>
                        <li class="text" v-if="fwxqtext.infoType==2 || fwxqtext.infoType==4 || fwxqtext.infoType==6 || fwxqtext.infoType==8">
                            <span>租&emsp;&emsp;金：</span>
                            <span>{{fwxqtext.price}}元/月</span>
                        </li>
                        <li class="text" v-if="fwxqtext.infoType==10">
                            <span>租&emsp;&emsp;金：</span>
                            <span>{{fwxqtext.price}}元/天</span>
                        </li>
                        <li class="text" v-if="fwxqtext.infoType==1 ||fwxqtext.infoType==2 || fwxqtext.infoType==3 || fwxqtext.infoType==4 || fwxqtext.infoType==5 || fwxqtext.infoType==6 || fwxqtext.infoType==7 || fwxqtext.infoType==8 || fwxqtext.infoType==9"><span>面&emsp;&emsp;积：</span><span>{{fwxqtext.area}}平方米</span></li>
                        <li class="text"><span>看房时间段：</span><span>{{fwxqtext.seeBook}}</span></li>
                        <li class="text" v-if="fwxqtext.infoType==2"><span>房屋配置：</span><span>{{fwxqtext.houseAllocation}}</span></li>
                        <li class="img" style="height:auto">
                            <div class="bq_x" v-for="(item,index) in fwxqtext.tagVos" v-bind:key="index" style="margin-right:20px;float:left;width:120px;height:120px;">
                               <img class="fy_x" :src="item.tagPicUrl" alt="">
                               <span>{{item.remark}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="navlistbot">
                <ul class="bottext" v-if='fwxqtext.hasPay==1'>屋主电话：{{fwxqtext.phone}}</ul>
                <ul class="botleft" v-if='fwxqtext.hasPay==0'>
                    <li class="left">
                        <span>信息赏金：{{fwxqtext.buyInfoPrice}}金币</span>
                        <!-- <img src="../assets/images/pic3.png" alt=""> -->
                    </li>
                    <li class="right">
                        <span class="btn" @click="purchaseBtn">立即支付</span>
                        <span class="text" style="text-align: center">立即支付后可获取屋主/代理人电话<br>为避免房源变化请即时约看</span>
                    </li>
                </ul>
                <ul class="phone" v-if="fwxqtext.servicePhone!==''">联系客服：{{fwxqtext.servicePhone}}</ul>
                <ul class="phone" v-if="fwxqtext.keepertel!==''">联系客服：{{fwxqtext.keepertel}}</ul>
            </div>
        </div>
        <div class="infomain">
            <ul class="infoleft">
                <li class="title">房屋信息详情</li>
                <li class="text">{{fwxqtext.remark}}</li>
            </ul>
            <div class="inforight">
                <ul class="title">看房评价</ul>
                <div class="pjlist" v-for="(item,index) in evaText" v-bind:key="index">
                    <img v-if="item.avatar==''" src="../assets/images/user.png" alt="">
                    <img v-else :src="item.avatar" alt="">
                    <ul>
                        <li class="name"><span style="margin-right:20px;">{{item.nickName }}</span>{{item.createTime}}</li>
                        <!-- <li class="text">{{item.content }}</li> -->
                        <li class="text">
                            <span class="textname">房源真实性：</span>
                            <img src="../assets/images/icon7.png" v-for="(res,index) in item.houseReal" v-bind:key="index" alt="">
                            <img src="../assets/images/icon6.png" v-for="(res,index) in 5-item.houseReal" v-bind:key="index" alt="">
                        </li>
                        <li class="text">
                            <span class="textname">屋主/代理人服务态度：</span>
                            <img src="../assets/images/icon7.png" v-for="(res,index) in item.serviceAttitude" v-bind:key="index" alt="">
                            <img src="../assets/images/icon6.png" v-for="(res,index) in 5-item.serviceAttitude" v-bind:key="index" alt="">
                        </li>
                        <li class="text">
                            <span class="textname">是否兑现促销承诺：</span>
                            <span v-if="item.refundFee==0">否</span>
                            <span v-else>是</span>
                            <span class="textname" style="margin-left:50px;">综合评价：</span>
                            <span v-if="item.allAssess == 1" style="color:#FF6B00;">好评</span>
                            <span v-else-if="item.allAssess == 2" style="color:#FF6B00;">中评</span>
                            <span v-else style="color:#FF6B00;">差评</span>
                        </li>
                    </ul>
                </div>
                <ul class="page_btn">
                    <li @click="prevBtn">上一页</li>
                    <li @click="nextBtn">下一页</li>
                </ul>
            </div>
        </div>
        <ul class="navlistcontent">
            <li class="title">地理位置</li>
            <li id="map" class="map"></li>
        </ul>
        <!-- 支付框 -->
        <div class="paymain" v-if='showdisplay'>
            <div class="paymain_box">
                <ul class="money">
                    <li class="num">￥{{fwxqtext.buyInfoPrice}}</li>
                    <li class="title">请选择支付方式</li>
                </ul>
                <ul class="way">
                    <li @click="pay(2)" :class="{active:id===2}">
                        <img src="../assets/images/pay1.png" alt="">
                        <span>微信</span>
                    </li>
                    <li @click="pay(1)" :class="{active:id===1}">
                        <img src="../assets/images/pay2.png" alt="">
                        <span>支付宝</span>
                    </li>
                    <li @click="pay(3)" :class="{active:id===3}">
                        <img src="../assets/images/pay3.png" alt="">
                        <span>金币</span>
                    </li>
                </ul>
                <ul class="btn">
                    <li class="left" @click="quxiaobtn">取消</li>
                    <li class="right" @click="pay_click">确认</li>
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
                <li class="tipbtn" @click="closebtn">去登陆</li>
            </ul>
        </div>
        <div class="tipbox" v-if="tipbox1">
            <ul>
                <li class="textmsg">{{textmsg1}}</li>
                <li class="tipbtn" @click="closebtn1">确认</li>
            </ul>
        </div>
        <div class="img_filex" @click="img_non" v-if="weixin">
            <img :src="'data:image/png;base64,'+weixin">
          </div>
    </div>
</template>

<script>
import '../assets/js/carousel.min.js'
import Header from '../components/Header.vue'
import Search from '../components/Search.vue'
import Indexnav from '../components/Indexnav.vue'
import BaseGallery from '../components/BaseGallery.vue'
import Footer from '../components/Footer.vue'
import Share from '../components/Share.vue'
export default {
    components: {
    BaseGallery,
    Header,
    Search,
    Indexnav,
    Footer,
    Share
  },
  name: 'navlistXq',
  data () {
    return {
      tipbox:false,
      textmsg:'',
      tipbox1:false,
      textmsg1:'',
      showdisplay:false,
      fwxqtext:'',//房屋所有信息
      evaText:[],//评价列表
      id: 2,//支付方式
      weixin: null,
      page:1,
    }
  },
  computed:{
      glalerys(){
          let toalarr = []
          if(this.fwxqtext.infoVideoUrl){
              toalarr.push(this.fwxqtext.infoVideoUrl+'?x-oss-process=video/snapshot,t_1000,f_jpg,w_690,h_400')
          }
          if(this.fwxqtext.picUrls){
              toalarr.push(...this.fwxqtext.picUrls.split(','))
          }
          return toalarr;
      }
  },
  mounted () {        
           
  },
   methods: {
    // 上一页
    prevBtn(){
        var page=this.page-1
        if(page==0){
            this.tipbox1=!this.tipbox1
            this.textmsg1='已经是第一页了！'
        }else{
            var evadata1=this.qs.stringify({
                infoId:this.$route.query.id,
                page:page,
                pageSize:2
            })
            this.$http('/app/newPartApi/getAllAssess','post',evadata1,'').then(
                res=>{
                    console.log(res)
                    if(res.data.code==100){
                        this.page=this.page-1
                        this.evaText=res.data.data
                    }
                }
            )
        }
        
    },
    nextBtn(){
        var page=this.page+1
        var evadata2=this.qs.stringify({
            infoId:this.$route.query.id,
            page:page,
            pageSize:2
        })
        this.$http('/app/newPartApi/getAllAssess','post',evadata2,'').then(
            res=>{
                console.log(res)
                if(res.data.code==100){
                    if(res.data.data.length==0){
                        this.tipbox1=!this.tipbox1
                        this.textmsg1='已经是最后一页了！'
                    }else{
                        this.page=this.page + 1
                        this.evaText=res.data.data
                    }
                }
            }
        )
    },
    // 返回上一级
    prev(){
        this.$router.go(-1)
    },
    closebtn(){
        this.tipbox=!this.tipbox
        this.$router.push({name:'login'})
    },
    closebtn1(){
        this.tipbox1=!this.tipbox1
    },
    //  地图
    initMap() {
        //创建Map实例
        var map = new BMap.Map("map");
        // 初始化地图,设置中心点坐标
        var point = new BMap.Point(this.fwxqtext.longitude,this.fwxqtext.latitude);// 创建点坐标
        map.centerAndZoom(point,15);
        //添加鼠标滚动缩放
        map.enableScrollWheelZoom();

        //添加缩略图控件
        map.addControl(new BMap.OverviewMapControl({isOpen:false,anchor:BMAP_ANCHOR_BOTTOM_RIGHT}));
        //添加缩放平移控件
        map.addControl(new BMap.NavigationControl());
        //添加比例尺控件
        map.addControl(new BMap.ScaleControl());
        //添加地图类型控件
        //map.addControl(new BMap.MapTypeControl());

        //设置标注的图标
        var icon = new BMap.Icon("https://ximaiwu.oss-cn-beijing.aliyuncs.com/map.png",new BMap.Size(100,100));
        //设置标注的经纬度
        var marker = new BMap.Marker(new BMap.Point(this.fwxqtext.longitude,this.fwxqtext.latitude),{icon:icon});
        //把标注添加到地图上
        map.addOverlay(marker);
    },
    // 收藏
    collectbtn(){
        if(this.$store.state.token==null){
            this.tipbox=!this.tipbox
            this.textmsg='目前还没有登录！'
        }else{
            if( this.fwxqtext.coll==0){
                var data=this.qs.stringify({
                        type:1,
                        infoId:this.$route.query.id
                    })
                    this.$http('/app/rendInfoApi/getCollection','post',data,this.$store.state.token).then(
                        res=>{
                            if(res.data.code==100){
                                this.fwxqtext.coll=1
                            }
                            if(res.data.code==102){
                                this.tipbox=!this.tipbox
                                this.textmsg='目前还没有登录！'
                            }
                        },
                    )
                }else{
                    var data=this.qs.stringify({
                        type:0,
                        infoId:this.$route.query.id
                    })
                    this.$http('/app/rendInfoApi/getCollection','post',data,this.$store.state.token).then(
                        res=>{
                            if(res.data.code==100){
                                console.log(res)
                                this.fwxqtext.coll=0
                            }
                            if(res.data.code==102){
                                this.tipbox=!this.tipbox
                                this.textmsg='目前还没有登录！'
                            }
                        },
                    )
                }
        }
        
    },
    // 购买信息
    purchaseBtn(){
        if(this.$store.state.token==null){
            this.tipbox=!this.tipbox
            this.textmsg='目前还没有登录！'
        }else{
            this.showdisplay=!this.showdisplay
        }
    },
    pay_click(){
        var that=this
        var data=this.qs.stringify({
            infoId:this.$route.query.id,
            payStyle:this.id
        })
        this.$http('/app/infoOrder/createds','post',data,this.$store.state.token).then(
        res=>{
            if(res.data.code==100){
                console.log(res)
                if(that.id==3){
                    var datapay1=that.qs.stringify({
                        orderNo:res.data.data.orderNo,
                        type:1
                    })
                    this.$http('/payapi/payByBalance','post',datapay1,this.$store.state.token).then(
                    res=>{
                        if(res.data.code==100){
                            this.tipbox1=!that.tipbox1
                            this.textmsg1=res.data.msg
                            this.showdisplay=!this.showdisplay
                            this.fwxq()
                        }else{
                            this.tipbox1=!that.tipbox1
                            this.textmsg1=res.data.msg
                            this.showdisplay=!this.showdisplay
                        }
                    })
                }
                if (that.id === 1) {
                    var datapay2=that.qs.stringify({
                        orderNo:res.data.data.orderNo,
                        payType:1,
                        type:1
                    })
                    this.$http('/payapi/payOrder','post',datapay2,this.$store.state.token).then(
                    res=>{
                        if(res.data.code==100){
                            console.log(res)
                            const div = document.createElement("div");
                            div.innerHTML = res.data.data.date; //此处form就是后台返回接收到的数据
                            document.body.appendChild(div);
                            document.forms[0].submit();
                        }
                    })
                }
                if (that.id === 2) {
                    var datapay2=that.qs.stringify({
                        orderNo:res.data.data.orderNo,
                        payType:2,
                        type:1
                    })
                    this.$http('/payapi/payOrder','post',datapay2,this.$store.state.token).then(
                    res=>{
                        if(res.data.code==100){
                            that.weixin = res.data.data.date;
                            that.orderNo = res.data.data.orderNo;
                            that.timer = setInterval(that.orders, 3000);
                        }
                    })
                }
            }
            if(res.data.code==102){
                this.tipbox=!this.tipbox
                this.textmsg='目前还没有登录！'
            }
        })
    },
     orders(orderNo) {
      var data = this.qs.stringify({
        orderNo: this.orderNo,
        type: 1
      });
      var that = this;
      this.$http("/payapi/queryOrder", "post", data, this.$store.state.token).then(res => {
        console.log(res);
        switch (res.data.data) {
          case 1:
            that.$router.go(0);
            break;
        }
      });
    },
    // 二维码
    img_non() {
      this.weixin = null;
    },
    //取消支付
    quxiaobtn(){
        this.showdisplay=!this.showdisplay
    },
    // 选择支付方式
    pay(id) {
      this.id = id;
    },
    // 房屋详情
    fwxq(){
// console.log(this.$route.query.id)
    var token=this.$store.state.token
    if(this.$store.state.token==null){
        token=''
    }
    var data=this.qs.stringify({
        infoId:this.$route.query.id
    })
    this.$http('/app/rendInfoApi/getInfoMsg','post',data,token).then(
        res=>{
            if(res.data.code==100){
                console.log(res)
                this.fwxqtext=res.data.data
                this.initMap()
                $(function(){
                    /* 商品轮播图（带缩略图的轮播效果） */
                    $(".listbanner").thumbnailImg({
                        large_elem: ".large_box",
                        small_elem: ".small_list",
                        left_btn: ".left_btn",
                        right_btn: ".right_btn"
                    });
                });
            }
        },
    )
    }
   },
   created(){
    this.fwxq()
    var token=this.$store.state.token
    if(this.$store.state.token==null){
        token=''
    }
    var data1=this.qs.stringify({
        infoId:this.$route.query.id
    })
    this.$http('/app/rendInfoApi/insertHistory','post',data1,token).then(
        res=>{
            console.log(res)
        }
    )
    var data2=this.qs.stringify({
        infoId:this.$route.query.id,
        page:1,
        pageSize:2
    })
    this.$http('/app/newPartApi/getAllAssess','post',data2,'').then(
        res=>{
            console.log(res)
            if(res.data.code==100){
                this.evaText=res.data.data
            }
        }
    )
   }
};
</script>
<style lang="">
    .navlistright .content .img .bq_x{
        display: block;
        position: relative;
    }
    .fy_x{
        position: absolute;
        top: 10px;
        left: 10px;
        display: block;
        width:100px;
        height:100px;
    }
    .navlistright .content .img .bq_x span{
        display: none;
        position: absolute;
        top:0;
        left:0;
        width:100px;
        height:100px;
        padding: 10px;
        text-align: center;
        font-size: 14px;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.5);
        color: #fff;
        white-space:initial
    }
    .navlistright .content .img .bq_x:hover span{
        display: block;
        position: absolute;
        top:0;
        left:0;
        width:100px;
        height:100px;
        padding: 10px;
        text-align: center;
        font-size: 14px;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.5);
        color: #fff;
        white-space:initial;
        cursor: pointer;
    }
</style>