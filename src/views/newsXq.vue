<template>
    <div class="page">
        <!-- header -->
        <Header/>
        <!-- 搜索 -->
        <Search/>
        <!--新闻详情-->
        <div class="newsxq">
            <ul class="top"><router-link :to="{ name: 'index'}">首页</router-link> > {{title}}</ul>
            <ul class="news_main">
                <li class="title">{{title}}</li>
                <li class="time">{{time}}</li>
                <li class="content" v-html='content'></li>
                <li class="bot">内容到底了~</li>
            </ul>
        </div>
        <!-- 底部导航 -->
        <Indexnav/>
        <!-- 底部 -->
        <Footer/>
    </div>
</template>
<script>
import Header from '../components/Header.vue'
import Search from '../components/Search.vue'
import Indexnav from '../components/Indexnav.vue'
import Footer from '../components/Footer.vue'
export default {
    components: {
    Header,
    Search,
    Indexnav,
    Footer
  },
  name: 'newsXq',
  data () {
    return {
        title:'鑫苑国际新城项目现有房源在售',
        time:'2018-12-27',
        content:''
    }
  },
  mounted(){
      console.log(this.$route.query.id)
       var data=this.qs.stringify({
                msgId:this.$route.query.id,
            })
            this.$http('/pc/homePcMsg/msgInfo','post',data,'').then(
                res=>{
                    if(res.data.code==100){
                        console.log(res)
                        this.title=res.data.data.msgName
                        this.time=res.data.data.createTime
                        this.content=res.data.data.msgContent
                    }
                },
            )
  }
}
</script>