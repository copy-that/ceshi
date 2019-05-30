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
                <div class="reservation" v-for="(item,index) in infolist" v-bind:key="index">
                    <router-link :to="{ name: 'navlistXq', query: { id: item.id }}">
                    <ul class="img">
                        <div class="video-icon" v-if="item.infoVideoUrl">
                            <img width="50" src="../assets/images/play.png" alt="">
                        </div>
                        <img v-if="item.infoVideoUrl" :src="item.infoVideoUrl+'?x-oss-process=video/snapshot,t_1000,w_210,h_140'" alt="">
                        <img v-else :src="item.picUrls[0]+'?x-oss-process=image/resize,m_fill,h_140,w_210'" alt="">
                        <li>{{item.picUrls.length}}张</li>
                    </ul>
                    <ul class="text" style="width:360px;">
                        <li class="name">{{item.title}}</li>
                        <li v-if="item.checkStatus==0" class="state info">该房源正在审核中... </li>
                        <li v-else-if="item.checkStatus==1" class="state succ">该房源已通过审核！</li>
                        <li v-else class="state error">该房源审核未通过，请重新编辑或联系客服！</li>
                        <li class="add" v-if="item.infoType==1 || item.infoType==2 || item.infoType==9">
                            <img src="../assets/images/icon4.png" alt="">
                            <span>房型：{{item.classify}}</span>
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
                            <span>发布时间：{{item.createTime}}</span>
                        </li>
                        <li class="tally">
                            <span class="y_tip">{{item.identityMsg}}</span>
                            <span class="y_tip">{{item.dicorationNumMsg}}</span>
                            <span class="y_tip">{{item.statusMsg}}</span>
                            <p v-for="(res,index) in item.tagVos" v-bind:key="index">
                                <span>{{res.remark}}</span>
                                <img :src="res.tagPicUrl" alt="">
                            </p>
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
                    <ul class="buy">
                        <router-link :to="{ name: 'buylabel',query:{id:item.id}}">购买标签</router-link>
                        <li @click="revoke(index,item.id)" :class="{active:item.tagVos.length==0}">撤销标签</li>
                        <router-link :to="{ name: 'personbj',query:{id:item.id,type:item.infoType}}">编辑信息</router-link>
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
  name: 'personfabu',
  data () {
    return {
        tipbox:false,
        textmsg:'',
        page:1,
        infolist:[]
    }
  },
  methods:{
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
            this.$http('/app/history/getMyList','post',data,this.$store.state.token).then(
                res=>{
                    if(res.data.code==100){
                        this.page=this.page-1
                        for(var i=0; i < res.data.data.length;i++){
                            res.data.data[i].picUrls=res.data.data[i].picUrls.split(',');
                        }
                        this.infolist=res.data.data
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
        this.$http('/app/history/getMyList','post',data,this.$store.state.token).then(
            res=>{
                console.log(res)
                if(res.data.code==100){
                    if(res.data.data.length !== 0){
                        this.page=this.page+1
                        for(var i=0; i < res.data.data.length;i++){
                            res.data.data[i].picUrls=res.data.data[i].picUrls.split(',');
                        }
                        this.infolist=res.data.data
                    }
                    if(res.data.data.length== 0){
                        this.tipbox=true,
                        this.textmsg='已经是最后一页了！'
                    }
                    
                }
            },
        )
    },
    // 撤销标签
    revoke(index,id){
        if(this.infolist[index].tagVos.length==0){
            console.log(index)
            this.tipbox=true,
            this.textmsg='请先去购买标签！'
        }else{
            this.$router.push({name:'revoke', query: { id: id }})
        }
    }
  },
  created() {
      if(this.$store.state.token==null || this.$store.state.token==''){
          this.$router.push({name:'login'})
      }
    var data=this.qs.stringify({
        page:this.page,
        pageSize:3,
    })
    this.$http('/app/history/getMyList','post',data,this.$store.state.token).then(
        res=>{
            if(res.data.code==100){
                for(var i=0; i < res.data.data.length;i++){
                    res.data.data[i].picUrls=res.data.data[i].picUrls.split(',');
                }
                this.infolist=res.data.data
                console.log(this.infolist)
            }
            if(res.data.code==102){
                this.$router.push({name:'login'})
            }
        },
    )
  }
}
</script>
<style lang="" scoped>
    .person_right .reservation{
        height: 172px;
    }

    .person_right .reservation .text{
        width: 560px;
    }
    .person_right .reservation .money{
        width: 200px;
    }
    .person_right .reservation .buy {
        float: right;
        width: 160px;
    }
    .person_right .reservation .buy a{
        display: block;
        width: 100px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: #fff;
        background: #f76617;
        margin: 5px auto;
        border-radius: 5px;
    }
    .person_right .reservation .buy li{
        display: block;
        width: 100px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: #fff;
        background: #f76617;
        margin: 10px auto;
        border-radius: 5px;
        cursor: pointer;
    }
    .person_right .reservation .buy .active{
        background: #999;
    }
</style>