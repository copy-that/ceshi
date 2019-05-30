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
                <div class="alerts">
                    <ul class="list" v-for="(item,index) in xxtzlist" v-bind:key="index">
                        <li class="top"><span>{{item.msgTitle}}</span>{{item.createTime}}</li>
                        <li class="bot">{{item.msgContent}}</li>
                    </ul>
                    <ul class="listpages">
                        <span @click="previousPage">上一页</span>
                        <!-- <span class="active">1</span>
                        <span>2</span> -->
                        <span @click="nextPage">下一页</span>
                    </ul>
                </div>
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
  name: 'personxxtz',
  data () {
    return {
        tipbox:false,
        textmsg:'请输入您的联系方式！',
        page:1,
        xxtzlist:[]
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
                        pageSize:4,
                })
            this.$http('/app/commonUser/getMessageList','post',data,this.$store.state.token).then(
                res=>{
                    if(res.data.code==100){
                        this.page=this.page-1
                        this.xxtzlist=res.data.data
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
                    pageSize:4,
            })
        this.$http('/app/commonUser/getMessageList','post',data,this.$store.state.token).then(
            res=>{
                if(res.data.code==100){
                    if(res.data.data.length !== 0){
                        this.page=this.page+1
                        this.xxtzlist=res.data.data
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
    console.log(this.$store.state.token)
    var data=this.qs.stringify({
            page:this.page,
            pageSize:4,
    })
    this.$http('/app/commonUser/getMessageList','post',data,this.$store.state.token).then(
        res=>{
            if(res.data.code==100){
                this.xxtzlist=res.data.data
            }
        },
    )
  }
}
</script>