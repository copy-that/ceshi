<template>
    <div class="page">
        <!-- header -->
        <Header/>
        <!--main-->
        <div class="yu_fabu">
            <ul class="yu_title">
                <li>
                    <router-link :to="{ name: 'personfabu', query: { type: 2 }}">我的发布 > </router-link>撤销标签
                </li>
            </ul>
            <div class="yu_main">
                <ul class="yu_title1">已购买的标签</ul>
                <ul class="yop">
                    <li @click="qmbtn1(index,item.id,item.buy,item.tagName)" v-for="(item,index) in biaoqianlist" v-bind:key="index" > 
                        <img class="img" :src="item.tagPicUrl" alt="">
                        <img class="btn1" v-if="item.buy==1" src="../assets/images/kuang_hover.png" alt="">
                        <img class="btn1" v-else src="../assets/images/kuang.png" alt="">
                        <span class="msg">{{item.remark}}</span>
                    </li>
                </ul>
                <ul class="yu_money">
                    <li class="left">您已选择标签：
                        <span v-for="(item,index) in title" v-bind:key="index">{{item}} </span> 
                    </li>
                    <li class="btn" @click="sumbitBtn" style="float:right">确认撤销</li>
                </ul>
            </div> 
        </div>
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
import Footer from '../components/Footer.vue'
export default {
    components: {
    Header,
    Footer
  },
  name: 'revoke',
  data () {
    return {
        tipnum:1,
        tipbox:false,
        textmsg:'',
        biaoqianlist:[],
        title:[],
        tagsId:[]
    }
  },
    methods: {
        closebtn(){
            if(this.tipnum==1){
                this.tipbox=!this.tipbox
            }else{
                this.tipbox=!this.tipbox
                this.$router.push({name:'personfabu', query: { type: 2 }})
            }
        },
        // 选择
        qmbtn1(index,id,buy,title){
            console.log(buy)
            if(buy==0){
                this.tagsId.push(id)
                this.title.push(title)
                this.biaoqianlist[index].buy=1
            }
            if(buy==1){
                var indId = this.tagsId.indexOf(id)
                this.tagsId.splice(indId,1)
                var titId = this.title.indexOf(title)
                this.title.splice(titId,1)
                this.biaoqianlist[index].buy=0
            }
        },
        // 撤销标签
        sumbitBtn(){
              if(this.tagsId.length==0){
                  this.tipbox=!this.tipbox
                  this.textmsg='请选择要撤销的标签！'
              }else{
                  var datas = this.qs.stringify({
                      tagIds:this.tagsId.join(','),
                      infoId:this.$route.query.id
                  })
                  this.$http('/app/newPartApi/deleteTags','post',datas,this.$store.state.token).then(
                    res=>{
                        console.log(res)
                        if(res.data.code==100){
                            this.tipbox=!this.tipbox
                            this.textmsg='标签撤销成功！'
                            this.tipnum=0
                        }
                    },
                )
              }
        },
    },
    created(){
        var data = this.qs.stringify({
            infoId:this.$route.query.id
        })
        this.$http('/app/newPartApi/getAllBuyTags','post',data,this.$store.state.token).then(
            res=>{
                if(res.data.code==100){
                    console.log(res)
                    res.data.data.map(ite=>{
                        ite.buy = 0
                    })
                    this.biaoqianlist=res.data.data
                    console.log(this.biaoqianlist)
                }
            },
        )
    }
}
</script>
<style lang="">
    .yu_fabu{
        width: 1200px;
        margin:0 auto 80px;
    }
    .yu_fabu .yu_title{
        padding: 40px 0;
    }
    .yu_main{
        position: relative;
        width: 1198px;
        border: 1px solid #ddd;
        margin: auto;
        padding-bottom: 80px;
    }
    .yu_main ul{
        width: 1100px;
        margin: 30px auto;
        overflow: hidden;
    }
    .yu_main .yu_money{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 80px;
        line-height: 80px;
        background: #f3f3f3;
        margin: 0 auto;
    }
    .yu_main .yu_money .left{
        float: left;
        width: 800px;
        height: 80px;
        text-indent: 50px;
        font-size: 20px;
        color: #000000;
    }
    .yu_main .yu_money .money{
        float: left;
        width: 200px;
        height: 80px;
        color: #000000;
        font-size: 20px;
    }
    .yu_main .yu_money .btn{
        float: left;
        width: 198px;
        height: 80px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        background: #ff6b00
    }
    .yu_main .yu_money .money span{
        color: #ff6b00
    }
    .yu_main .yu_title1{
        font-size: 20px;
    }
    .yu_main ul li{
        position: relative;
        float: left;
        width: 120px;
        height: 120px;
        cursor: pointer;
    }
    .yu_main .yop {
        margin-bottom: 50px;
    }
    .yu_main .yop li{
        margin-right: 0;
    }
    .yu_main .yop_z li{
        margin-right: 0px;
    }
    .yu_main ul li .img{
        position: absolute;
        top: 0;
        left: 10px;
        display: block;
        width: 100px;
        height: 100px;
    }
    .yu_main ul li .btn1{
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -8px;
        width: 16px;
        height: 16px;
    }
    .yu_main ul li .msg{
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        width: 100px;
        height: 100px;
        padding: 10px;
        color: #fff;
        text-align: center;
        font-size: 14px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.5)
    }
    .yu_main ul li:hover .msg{
        display: block;
        
    }
</style>