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
                    <li><router-link :to="{ name: 'personwt', query: { type: 7 }}">常见问题</router-link></li>
                    <li class="active"><router-link :to="{ name: 'personwtfk', query: { type: 7 }}">反馈问题</router-link></li>
                </ul>
                <ul class="feedback">
                    <li class="feed_text">
                        <textarea name="" id="" placeholder="请输入您宝贵的意见" v-model="textcontent"></textarea>
                    </li>
                    <li class="btn" @click="feedbacksubmit">提交</li>
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
  name: 'personwtfk',
  data () {
    return {
        textcontent:''
    }
  },
  mounted(){
      console.log(this.$store.state.token)
  },
  methods: {
      feedbacksubmit(){
          if(this.textcontent==''){
            this.$alert('请输入您宝贵的意见',{
                confirmButtonText: '确定',
            });
          }else{
            var data=this.qs.stringify({
                    content:this.textcontent
            })
            this.$http('/app/commonUser/saveOpinion','post',data,this.$store.state.token).then(
                res=>{
                    if(res.data.code==100){
                        console.log(res)
                        this.$alert('反馈成功',{
                            confirmButtonText: '确定',
                        });
                    }else{
                        this.$msgbox({
                            title:res.data.msg,
                        })
                    }
                },
            )
          }
      }
  }
}
</script>