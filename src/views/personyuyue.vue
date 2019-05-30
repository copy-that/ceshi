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
            <div class="person_right">
                <div class="reservation" v-for="(item,index) in bespokelist" v-bind:key="index">
                    <router-link :to="{ name: 'navlistXq', query: { id: item.infoId }}">
                    <ul class="img">
                        <div class="video-icon" v-if="item.infoVideoUrl">
                            <img width="50" src="../assets/images/play.png" alt="">
                        </div>
                        <img v-if="item.infoVideoUrl" :src="item.infoVideoUrl+'?x-oss-process=video/snapshot,t_1000,w_210,h_140'" alt="">
                        <img v-else :src="item.picUrl+'?x-oss-process=image/resize,m_fill,h_140,w_210'" alt="">
                        <li>{{item.picNum}}张</li>
                    </ul>
                    <ul class="text">
                        <li class="name">
                            <span>{{item.title}}</span>
                            <img @click="houseBtn(item.infoId)" v-if="item.collection==0" src="../assets/images/icon6.png" alt="">
                            <img @click="houseNot(item.infoId)" v-if="item.collection==1" src="../assets/images/icon7.png" alt="">
                        </li>
                        <li class="add" v-if="item.infoType==1 || item.infoType==2 || item.infoType==9">
                            <img src="../assets/images/icon4.png" alt="">
                            <span>房型：{{item.homeType}}</span>
                            <span>面积：{{item.area}}㎡</span>
                        </li>
                        <li class="add" v-else-if="item.infoType==10">
                            <img src="../assets/images/icon4.png" alt="">
                            <span>档次：{{item.grade}}</span>
                            <span>配套：{{item.mating}}</span>
                        </li>
                        <li class="add" v-else>
                            <img src="../assets/images/icon4.png" alt="">
                            <span>面积：{{item.area}}㎡</span>
                        </li>
                        <li class="time">
                            <img src="../assets/images/icon5.png" alt="">
                            <span>发布时间：{{item.time}}</span>
                        </li>
                        <li class="tally">
                            <span class="y_tip" v-for="(res,ind) in item.tagNames" v-bind:key="ind">{{res}}</span>
                            <p v-for="(res,index) in item.tagVos" v-bind:key="index">
                                <span>{{res.remark}}</span>
                                <img :src="res.tagPicUrl" alt="">
                            </p>
                            <!-- <span>简单装修</span>
                            <span>在售</span> -->
                        </li>
                    </ul>
                    <ul class="money" v-if="item.infoType==1 || item.infoType==3 || item.infoType==5 || item.infoType==7 || item.infoType==9">
                        <span>{{item.price }}</span>万元
                    </ul>
                    <ul class="money" v-if="item.infoType==2 || item.infoType==4 || item.infoType==6 || item.infoType==8">
                        <span>{{item.price }}</span>元/月
                    </ul>
                    <ul class="money" v-if="item.infoType==10">
                        <span>{{item.price }}</span>元/天
                    </ul>
                    </router-link>
                    <ul class="pj">
                        <li v-if="item.evaluateStatus==0"><router-link :to="{ name: 'personpj', query: { id:item.orderId}}">写评价</router-link></li>
                        <li v-if="item.evaluateStatus==1" style="color:#999">已评价</li>
                    </ul>
                </div>
                <ul class="listpages">
                    <span @click="previousPage">上一页</span>
                    <span @click="nextPage">下一页</span>
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
import Header from '../components/Header.vue'
import Search from '../components/Search.vue'
import Indexnav from '../components/Indexnav.vue'
import Footer from '../components/Footer.vue'
import Personnav from '../components/Personnav.vue'
export default {
    components: {
    Header,
    Search,
    Indexnav,
    Footer,
    Personnav
  },
  name: 'personyuyue',
  data () {
    return {
        tipbox:false,
        textmsg:'',
        page:1,
        bespokelist:[],
    }
  },
  methods: {
    closebtn(){
        this.tipbox=!this.tipbox
    },
    //   上一页
      previousPage(){
        var page=this.page-1
        if(page==0){
            this.tipbox=true,
            this.textmsg='已经是第一页了！'
        }else{
            var data=this.qs.stringify({
                        page:page,
                        pageSize:3,
                })
            this.$http('/app/user/getMySubscribeVos','post',data,this.$store.state.token).then(
                res=>{
                    if(res.data.code==100){
                        this.page=this.page-1
                        this.bespokelist=res.data.data.data
                    }
                },
            )
        }        
      },
      //   下一页
    nextPage(){
        var page=this.page+1
        var data=this.qs.stringify({
                    page:page,
                    pageSize:3,
            })
        this.$http('/app/user/getMySubscribeVos','post',data,this.$store.state.token).then(
            res=>{
                console.log(res)
                if(res.data.code==100){
                    if(res.data.data.data.length !== 0){
                        this.page=this.page+1
                        this.bespokelist=res.data.data.data
                    }
                    if(res.data.data.data.length== 0){
                        this.tipbox=true,
                        this.textmsg='已经是最后一页了！'
                    }
                    
                }
            },
        )
    },
    houseBtn(infoId){
        console.log(infoId)
        var data=this.qs.stringify({
            type:1,
            infoId:infoId
        })
        this.$http('/app/rendInfoApi/getCollection','post',data,this.$store.state.token).then(
            res=>{
                console.log(res)
                if(res.data.code==100){
                    this.tipbox=true,
                    this.textmsg='收藏成功' 
                    var data1=this.qs.stringify({
                        page:this.page,
                        pageSize:3
                    })
                    this.$http("/app/user/getMySubscribeVos","post",data1,this.$store.state.token).then(res => {
                    if (res.data.code == 100) {
                        console.log(res)
                        this.bespokelist=res.data.data.data
                    }
                    });
                }
            },
        )
    },
    houseNot(infoId){
         var data=this.qs.stringify({
            type:0,
            infoId:infoId
        })
        this.$http('/app/rendInfoApi/getCollection','post',data,this.$store.state.token).then(
            res=>{
                console.log(res)
                if(res.data.code==100){
                    this.tipbox=true,
                    this.textmsg='取消收藏成功' 
                    var data1=this.qs.stringify({
                        page:this.page,
                        pageSize:3
                    })
                    this.$http("/app/user/getMySubscribeVos","post",data1,this.$store.state.token).then(res => {
                    if (res.data.code == 100) {
                        console.log(res)
                        this.bespokelist=res.data.data.data
                    }
                    });
                }
            },
        )
    }
  },
  created() {
    var data=this.qs.stringify({
        page:this.page,
        pageSize:3
    })
    this.$http("/app/user/getMySubscribeVos","post",data,this.$store.state.token).then(res => {
      if (res.data.code == 100) {
          console.log(res)
          this.bespokelist=res.data.data.data
      }
    });
  }
}
</script>