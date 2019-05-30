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
        <div class="wallet">
          <div class="top">
            <ul class="money">
              <li class="title">我的金币</li>
              <li class="je">{{money}}<span>金币</span></li>
            </ul>
            <ul class="right">
              <li class="tix" v-if="switchBtn==1">
                <router-link :to="{ name: 'persontx', query: { type: 5 }}">提现</router-link>
              </li>
              <li class="czhi">
                <router-link :to="{ name: 'personcz', query: { type: 5 }}">充值</router-link>
              </li>
            </ul>
          </div>
          <div class="bot">
            <ul class="title">明细</ul>
            <div class="bot_main">
              <ul v-for="(item,index) in moneylist" v-bind:key="index">
                <li>
                  <span class="name">{{item.detailName}}</span>
                  <span class="money">{{item.detailPrice}}</span>
                </li>
                <li>
                  <span class="time">{{item.createTime}}</span>
                  <span class="tip">{{item.detailStatus}}</span>
                </li>
              </ul>
            </div>
          </div>
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
import Header from "../components/Header.vue";
import Search from "../components/Search.vue";
import Indexnav from "../components/Indexnav.vue";
import Footer from "../components/Footer.vue";
import Personnav from "../components/Personnav.vue";
export default {
  components: {
    Header,
    Search,
    Indexnav,
    Footer,
    Personnav
  },
  name: "personmoney",
  data() {
    return {
      tipbox:false,
      textmsg:'请输入您的联系方式！',
      page:1,
      money:'0.00',
      moneylist: [],
      switchBtn:'',
    };
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
            this.$http('/app/commonUser/getDetailsList','post',data,this.$store.state.token).then(
                res=>{
                    if(res.data.code==100){
                        this.page=this.page-1
                        this.moneylist=res.data.data
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
        this.$http('/app/commonUser/getDetailsList','post',data,this.$store.state.token).then(
            res=>{
                if(res.data.code==100){
                    if(res.data.data.length !== 0){
                        this.page=this.page+1
                        this.moneylist=res.data.data
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
    this.$http("/app/newPartApi/getWithdrawal","get","",this.$store.state.token).then(res => {
      if (res.data.code == 100) {
          console.log(res)
          this.switchBtn=res.data.data
      }
    });
    this.$http("/app/commonUser/getMoney","post","",this.$store.state.token).then(res => {
      if (res.data.code == 100) {
          this.money=res.data.data
      }
    });
    var data=this.qs.stringify({
        page:this.page,
        pageSize:3
    })
    this.$http("/app/commonUser/getDetailsList","post",data,this.$store.state.token).then(res => {
      if (res.data.code == 100) {
          console.log(res)
          this.moneylist=res.data.data
      }
    });
  }
};
</script>