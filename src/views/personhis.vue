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
                <div class="historymain">
                    <ul>
                        <li v-for="(item,index) in hislist" v-bind:key="index">
                            <router-link :to="{ name: 'navlistXq', query: { id: item.infoId }}">{{item.title}} > </router-link>
                        </li>
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
  name: 'personhis',
  data () {
    return {
        tipbox:false,
        textmsg:'',
        page:1,
        hislist:[]
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
                        pageSize:6,
                })
            this.$http('/app/history/getHistoryList','post',data,this.$store.state.token).then(
                res=>{
                    if(res.data.code==100){
                        this.page=this.page-1
                        this.hislist=res.data.data
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
        this.$http('/app/history/getHistoryList','post',data,this.$store.state.token).then(
            res=>{
                console.log(res)
                if(res.data.code==100){
                    if(res.data.data.length !== 0){
                        this.page=this.page+1
                        this.hislist=res.data.data
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
  created() {
    var data=this.qs.stringify({
        page:this.page,
        pageSize:6
    })
    this.$http("/app/history/getHistoryList","post",data,this.$store.state.token).then(res => {
      if (res.data.code == 100) {
          console.log(res)
          this.hislist=res.data.data
      }
    });
  }
}
</script>