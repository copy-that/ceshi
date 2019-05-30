<template>
    <div class="page">
        <!-- header -->
        <Header/>
        <!--main-->
        <div class="release navlist">
            <ul class="top"><li><router-link :to="{ name: 'fabu'}">选择类型 > </router-link>我的发布</li></ul>
            <div class="navlist_bot" style="padding-top: 20px">
                <div class="infolist" v-for="(item,index) in infolist" v-bind:key="index"><router-link :to="{ name: 'navlistXq',query:{id:item.id}}">
                    <ul class="img">
                        <img :src="item.picUrls[0]" alt="">
                        <li>{{item.picUrls.length}}张</li>
                    </ul>
                    <ul class="text">
                        <li class="name">{{item.title}}</li>
                        <li class="add" v-if="item.infoType==1 || item.infoType==2 || item.infoType==9">
                            <img src="../assets/images/icon4.png" alt="">
                            <span>房型：{{item.classify}}</span>
                            <span>面积：{{item.area}}㎡</span>
                        </li>
                        <li class="add" v-else>
                            <img src="../assets/images/icon4.png" alt="">
                            <!-- <span>房型：{{item.classify}}</span> -->
                            <span>面积：{{item.area}}㎡</span>
                        </li>
                        <li class="time">
                            <img src="../assets/images/icon5.png" alt="">
                            <span>发布时间：{{item.createTime }}</span>
                        </li>
                        <li class="tally">
                            <span>{{item.identityMsg}}</span>
                            <span>{{item.dicorationNumMsg}}</span>
                            <span>{{item.statusMsg}}</span>
                        </li>
                    </ul>
                    <ul class="money" v-if="item.infoType==1"><span>{{item.price }}</span>元</ul>
                    <ul class="money" v-if="item.infoType==2"><span>{{item.price }}</span>元/月</ul>
                    <ul class="money" v-if="item.infoType==3"><span>{{item.price }}</span>元</ul>
                    <ul class="money" v-if="item.infoType==4"><span>{{item.price }}</span>元/月</ul>
                    <ul class="money" v-if="item.infoType==5"><span>{{item.price }}</span>元/平米</ul>
                    <ul class="money" v-if="item.infoType==6"><span>{{item.price }}</span>元/平米·天</ul>
                    <ul class="money" v-if="item.infoType==7"><span>{{item.price }}</span>元/平米</ul>
                    <ul class="money" v-if="item.infoType==8"><span>{{item.price }}</span>元/平米·天</ul>
                    <ul class="money" v-if="item.infoType==9"><span>{{item.price }}</span>元</ul>
                    <ul class="money" v-if="item.infoType==10"><span>{{item.price }}</span>元/天</ul>
                    </router-link>
                    <ul class="buy"><router-link :to="{ name: 'buylabel',query:{id:item.id}}">购买标签</router-link></ul>
                </div>
               <ul class="listpages">
                    <span @click="previousPage">上一页</span>
                    <span @click="nextPage">下一页</span>
               </ul>
            </div>
        </div>
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
import Footer from '../components/Footer.vue'
export default {
    components: {
    Header,
    Footer
  },
  name: 'wodefabu',
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
                pageSize:6,
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
                    pageSize:6,
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
    }
  },
   created(){
    var data=this.qs.stringify({
        page:this.page,
        pageSize:6,
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
  },
}
</script>
<style lang="">
    .release .navlist_bot .infolist .text{
        width: 560px;
    }
    .release .navlist_bot .infolist .money{
        width: 200px;
    }
</style>