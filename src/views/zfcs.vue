<template>
    <div>
        <!-- header -->
        <Header/>
        <!--main-->
            <ul class="zf_s" v-if="status==1">
                <img src="../assets/images/zf_s.png" alt="">
                <li class="zf_title">支付成功!</li>
                <li class="zf_tip"></li>
                <li class="zf_btn" @click="zfbtn">返回</li>
            </ul>

            <ul class="zf_s" v-if="status==0">
                <img src="../assets/images/zf_f.png" alt="">
                <li class="zf_title">支付失败!</li>
                <li class="zf_tip"></li>
                <li class="zf_btn" @click="zfbtn">返回</li>
            </ul>
         <!-- 底部导航 -->
        <Indexnav/>
        <!-- 底部 -->
        <Footer/>
    </div>
</template>
<script>
import Header from '../components/Header.vue'
import Indexnav from '../components/Indexnav.vue'
import Footer from '../components/Footer.vue'
export default {
  components: {
    Header,
    Indexnav,
    Footer
  },
  name: 'zfcs',
  data() {
      return {
          infoid:'',
          status:'',
          type:'',
      }
  },
  created(){
    console.log(this.$route.query)
    var data=this.qs.stringify({
        orderNo:this.$route.query.out_trade_no
    })
    this.$http('/payapi/queryOrderAli','post',data,this.$store.state.token).then(
        res=>{
            if(res.data.code==100){
                console.log(res)
                this.infoid=res.data.data.infoId
                this.status=res.data.data.status
                this.type=res.data.data.type
            }
        },
    )
  },
  methods: {
      zfbtn(){
          if(this.type==0){
              this.$router.push({name:'personmoney', query: { type: 4 }})
          }
          if(this.type==1){
              this.$router.push({name:'navlistXq', query: { id: this.infoid  }})
          }
          if(this.type==2){
              this.$router.push({name:'wodefabu'})
          }
      }
  },
}
</script>
<style lang="">
    .zf_s{
    width: 1200px;
    height: 350px;
    padding:90px 0;
    margin:50px auto;
    background: #fff;
}
.zf_s img{
    display: block;
    width: 50px;
    height: 50px;
    margin: auto;
}
.zf_s .zf_title{
    text-align: center;
    font-size: 20px;
    color: #000000;
    font-weight: 600;
    line-height: 80px;
}
.zf_s .zf_btn{
    width: 400px;
    height: 50px;
    line-height: 50px;
    color: #fff;
    background: #F76617;
    text-align: center;
    margin:20px auto;
    border-radius: 8px;
    cursor: pointer;
}
.zf_s .zf_btn a{
    display: block;
}
</style>