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
            <div class="person_right about_main">
                <ul class="about_content">
                    <li class="title">关于我们</li>
                    <li class="box">{{aboutcontent}}</li>
                    <!-- <li class="img"><img :src="aboutimg" alt=""></li>
                    <li class="text">
                        <span class="box"><span>{{aboutcontent}}</span></span>
                    </li> -->
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
  name: 'personabout',
  data () {
    return {
     aboutimg:'',
     aboutcontent:''
    }
  },
  methods: {},
  created(){
    this.$http('/otherInfo/getAboutUs','get','','').then(
        res=>{
            if(res.data.code==100){
                console.log(res)
                this.aboutimg=res.data.data.pcImgUrl,
                this.aboutcontent=res.data.data.content
            }
        },
    )
  }
}
</script>