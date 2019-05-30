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
            <div class="person_right eav_main">
                <ul class="eav_pj">
                    <li class="name">房源真实性：</li>
                    <li class="eav_img">
                        <el-rate v-model="zsnum" @change='zsbtn'></el-rate>
                        <!-- <img src="../assets/images/icon7.png" v-for="(item,index) in zsnum" v-bind:key="index" @click="zsbtn1(index)" alt=""> -->
                        <!-- <img src="../assets/images/icon6.png" v-for="(item,zindex) in zsanum" v-bind:key="zindex" @click="zsbtn2(zindex)" alt=""> -->
                    </li>
                </ul>
                <ul class="eav_pj">
                    <li class="name">房主/代理人服务态度：</li>
                    <li class="eav_img">
                        <el-rate v-model="tdnum" @change='tdbtn'></el-rate>
                    </li>
                </ul>
                <ul class="eav_pj">
                    <li class="name">是否兑现促销承诺：</li>
                    <li class="eav_xz">
                        <el-radio v-model="radio" label="1" @change="xzbtn">是</el-radio>
                        <el-radio v-model="radio" label="0" @change="xzbtn">否</el-radio>
                    </li>
                </ul>
                <ul class="eav_pj">
                    <li class="name">综合评价：</li>
                    <div class="eav_zh">
                        <ul v-for="(item,index) in zhpj" v-bind:key="index" @click="zhbtn(index)">
                            <li class="img">
                                <img v-if="item.active" :src="item.imgc" alt="">
                                <img v-else :src="item.imgf" alt="">
                            </li>
                            <li :class="{'active':item.active}">{{item.name}}</li>
                        </ul>
                    </div>
                </ul>
                <ul class="eav_pj">
                    <li class="btn" @click="submitbtn">提交</li>
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
  name: 'personpj',
  data () {
    return {
        tipbox:false,
        textmsg:'',
        textmain:'',
        eleve:0,
        zsnum:0,
        tdnum:0,
        radio: '1',
        zhnum:'',
        zhpj:[
            {active:false,imgc:'https://ximaiwu.oss-cn-beijing.aliyuncs.com/34c59d158b054d01949142fb5673b4e7.png',imgf:'https://ximaiwu.oss-cn-beijing.aliyuncs.com/80d33922d2434d0a8ef96dd509eb2306.png',name:'好评'},
            {active:false,imgc:'https://ximaiwu.oss-cn-beijing.aliyuncs.com/34c59d158b054d01949142fb5673b4e7.png',imgf:'https://ximaiwu.oss-cn-beijing.aliyuncs.com/80d33922d2434d0a8ef96dd509eb2306.png',name:'中评'},
            {active:false,imgc:'https://ximaiwu.oss-cn-beijing.aliyuncs.com/34c59d158b054d01949142fb5673b4e7.png',imgf:'https://ximaiwu.oss-cn-beijing.aliyuncs.com/80d33922d2434d0a8ef96dd509eb2306.png',name:'差评'}
        ]
    }
  },
  mounted(){
      console.log(this.$route.query.id)
    },
  methods: {
    //   房源真实性
    zsbtn(res){
        console.log(res)
        this.zsnum=res
    },
    tdbtn(res){
        console.log(res)
        this.tdnum=res
    },
    xzbtn(res){
        console.log(res)
    },
    zhbtn(index){
        console.log(index)
        for(var i=0;i<3;i++){
            this.zhpj[i].active=false
        }
        this.zhpj[index].active=true
        this.zhnum=index + 1
        console.log(this.zhnum)
    },
    closebtn(){
        if(this.eleve==0){
            this.tipbox=!this.tipbox
        }else{
            this.$router.push({name:'personyuyue'})
        }
    },
    submitbtn(){
        if(this.zsnum==0){
            this.eleve=0,
            this.tipbox=true,
            this.textmsg='请评价房源真实性'
        }else if(this.tdnum==0){
            this.eleve=0,
            this.tipbox=true,
            this.textmsg='请评价服务态度'
        }else if(this.zhnum==''){
            this.eleve=0,
            this.tipbox=true,
            this.textmsg='请进行综合评价'
        }else{
            var data=this.qs.stringify({
                    orderId:this.$route.query.id,
                    houseReal:this.zsnum,
                    serviceAttitude:this.tdnum,
                    refundFee:this.radio,
                    allAssess:this.zhnum
            })
            this.$http('/app/newPartApi/saveOneAssess','post',data,this.$store.state.token).then(
                res=>{
                    if(res.data.code==100){
                        console.log(res)
                        this.tipbox=true,
                        this.textmsg=res.data.msg
                        this.eleve=1
                    }
                },
            )
        }
    }
  }
}
</script>
<style lang="">
    .eav_img .el-rate__icon{
        font-size: 22px;
        margin-top: 7px;
    }
    .el-radio__input.is-checked .el-radio__inner{
        border-color: #F76617 !important;
        background: #F76617 !important;
    }
    .el-radio__input.is-checked+.el-radio__label{
        color: #F76617 !important;
    }
    .el-radio__label{
        font-size: 16px;
    }
</style>