<template>
    <div class="page">
        <!-- header -->
        <Header/>
        <!--main-->
        <div class="fb_main">
            <ul class="top">
                <li class="left"><router-link :to="{ name: 'index'}">首页 > </router-link>请选择发布类型：</li>
                <li class="right" style="display:none"><router-link :to="{ name: 'wodefabu'}">查看我的发布</router-link></li>
            </ul>
            <ul class="fb_main">
                <li class="left">发布售卖信息:</li>
                <li class="right">
                    <router-link class="title" :to="{ name: 'fabuform1'}">住宅</router-link>
                    <router-link class="title" :to="{ name: 'fabuform2'}">商铺</router-link>
                    <router-link class="title" :to="{ name: 'fabuform3'}">办公</router-link>
                    <router-link class="title" :to="{ name: 'fabuform4'}">厂房仓库</router-link>
                    <router-link class="title" :to="{ name: 'fabuform5'}">新楼盘</router-link>
                </li>
            </ul>
            <ul class="fb_main">
                <li class="left">发布出租信息:</li>
                <li class="right">
                    <router-link class="title" :to="{ name: 'fabuform6'}">住宅</router-link>
                    <router-link class="title" :to="{ name: 'fabuform7'}">商铺</router-link>
                    <router-link class="title" :to="{ name: 'fabuform8'}">办公</router-link>
                    <router-link class="title" :to="{ name: 'fabuform9'}">厂房仓库</router-link>
                    <router-link class="title" :to="{ name: 'fabuform10'}">民宿酒店</router-link>
                </li>
            </ul>
        </div>
        <!-- 底部 -->
        <Footer/>
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
  name: 'fabu',
  data () {
    return {
        
    }
  },
   mounted(){
      console.log(this.$store.state.token)
      if(this.$store.state.token==null || this.$store.state.token==''){
          this.$router.push({name:'login'})
      }
  },
}
</script>