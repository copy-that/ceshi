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
             <div class="person_right rec_main">
                <ul class="rec_con">
                    <li class="money">
                        <span class="name">提现金额：</span>
                        <span class="input"><input type="number" placeholder="请输入提现金额" v-model="money">元</span>
                    </li>
                    <li class="tip">最多可提现{{balance}}元</li>
                    <li class="fshi">
                        <span class="name">提现方式：</span>
                        <ul class="xz">
                            <li @click="txpay(1)" :class="{active:txId===1}">
                                <img src="../assets/images/pay1.png" alt="">
                                <span>微信</span>
                            </li>
                            <li @click="txpay(2)" :class="{active:txId===2}">
                                <img src="../assets/images/pay2.png" alt="">
                                <span>支付宝</span>
                            </li>
                        </ul>
                    </li>
                    <li class="cash" v-if="txId==2">
                        <span class="name">提现账号：</span>
                        <span class="input"><input type="text" placeholder="请输入提现账号" v-model="zfbTX"></span>
                    </li>
                    <li class="btn" @click="withdrawalBtn">申请提现</li>
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
  name: 'personmoney',
  data () {
    return {
        tipbox:false,
        textmsg:'',
        balance:'',
        txId:1,
        money:'',
        zfbTX:'',
    }
  },
  methods: {
    txpay(txId){
        this.txId=txId
    },
    closebtn(){
        this.tipbox=!this.tipbox
    },
    withdrawalBtn(){
        if(this.money==''){
            this.tipbox=!this.tipbox
            this.textmsg='请输入提现金额！'
        }else if(this.money<10){
            this.tipbox=!this.tipbox
            this.textmsg='提现金额不能小于10元！'
            return
        }else if(this.money > this.balance){
            this.tipbox=!this.tipbox
            this.textmsg='提现金额不能大于余额！'
            return
        }else if(this.txId==1){
            this.tipbox=!this.tipbox
            this.textmsg='微信提现上未开通！'
        }else if(this.txId==2 && this.zfbTX==''){
            this.tipbox=!this.tipbox
            this.textmsg='请输入支付宝提现账号！'
        }else{
            var data=this.qs.stringify({
                aliAccount:this.zfbTX,
                money:this.money
            })
            this.$http("/payapi/transferAli","post",data,this.$store.state.token).then(res => {
                if (res.data.code == 100) {
                    this.tipbox=!this.tipbox
                    this.textmsg=res.data.msg
                }else{
                    this.tipbox=!this.tipbox
                    this.textmsg=res.data.msg
                }
            });
        }
    }
  },
  created(){
    this.$http("/app/commonUser/getMoney","post","",this.$store.state.token).then(res => {
        if (res.data.code == 100) {
            this.balance=res.data.data
        }
    });
   
  }
}
</script>
<style lang="">
    .xz li{
        cursor: pointer;
    }
</style>