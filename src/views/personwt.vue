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
            <div class="person_right common">
                <ul class="com_title">
                    <li class="active"><router-link :to="{ name: 'personwt', query: { type: 8 }}">常见问题</router-link></li>
                    <li><router-link :to="{ name: 'personwtfk', query: { type: 8 }}">反馈问题</router-link></li>
                </ul>
                <ul class="com">
                    <li v-for="(item,index) in wtlist" v-bind:key="index"><router-link :to="{ name: 'personwtxq', query: { type: 8, wtid:item.id }}">{{item.question}}</router-link></li>
                </ul>
            </div>
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
import Personnav from '../components/Personnav.vue'
export default {
    components: {
    Header,
    Search,
    Indexnav,
    Footer,
    Personnav
  },
  name: 'personwt',
  data () {
    return {
        wtlist:[]
    }
  },
  methods: {},
  created(){
    var data={
          page:1,
          pageSize:100000,
    }
    this.$http('/otherInfo/getQuestionList','get',data,'').then(
        res=>{
            if(res.data.code==100){
                console.log(res)
                this.wtlist=res.data.data
            }
        },
    )
  }
}
</script>