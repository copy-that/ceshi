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
                    <li class="active"><router-link :to="{ name: 'personwt', query: { type: 7 }}">常见问题</router-link></li>
                    <li><router-link :to="{ name: 'personwtfk', query: { type: 7 }}">反馈问题</router-link></li>
                </ul>
                <ul class="comxq">
                    <li>{{wtcontent}}</li>
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
  name: 'personwtxq',
  data () {
    return {
     wtcontent:''
    }
  },
mounted(){
    console.log(this.$route.query.wtid)
    var data={
        id:this.$route.query.wtid
    }
    this.$http('/otherInfo/getQuestionById','get',data,'').then(
        res=>{
            if(res.data.code==100){
                console.log(res)
                this.wtcontent=res.data.data.answer
            }
        },
    )
  },
  methods: {}
}
</script>