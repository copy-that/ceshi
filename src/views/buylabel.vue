<template>
    <div class="page">
        <!-- header -->
        <Header/>
        <!--main-->
        <div class="yu_fabu">
            <ul class="yu_title">
                <li>
                    <!-- <router-link :to="{ name: 'fabu'}">选择类型 > </router-link> -->
                    <router-link :to="{ name: 'personfabu', query: { type: 2 }}">我的发布 > </router-link>购买标签
                </li>
            </ul>
            <div class="yu_main">
                <ul class="yu_title1">购买使用标签可以加快租/售速度!</ul>
                <ul class="yop">
                    <li @click="qmbtn(index,item)" v-for="(item,index) in biaoqianlist" v-bind:key="index" > 
                        <img class="img" :src="item.tagPicUrl" alt="">
                        <img class="btn1" v-if="item.buy==1" src="../assets/images/kuang_hover.png" alt="">
                        <img class="btn1" v-if="item.buy==2" src="../assets/images/kuang_hover.png" alt="">
                        <img class="btn1" v-else src="../assets/images/kuang.png" alt="">
                        <span class="msg">{{item.remark}}</span>
                    </li>
                </ul>
                <!-- <ul class="yop">
                    <li @click="qmbtn1(index,item.id,item.buy,item.tagPrice,item.tagName)" v-if="item.flagValue<=3 || item.flagValue==9" v-for="(item,index) in biaoqianlist" v-bind:key="index" > 
                        <img class="img" :src="item.tagPicUrl" alt="">
                        <img class="btn1" v-if="item.buy==1" src="../assets/images/kuang_hover.png" alt="">
                        <img class="btn1" v-if="item.buy==2" src="../assets/images/kuang_hover.png" alt="">
                        <img class="btn1" v-else src="../assets/images/kuang.png" alt="">
                        <span class="msg">{{item.remark}}</span>
                    </li>
                    <li @click="qmbtn2(index,item.id,item.buy,item.tagPrice,item.tagName)" v-if="item.flagValue==8" v-for="(item,index) in biaoqianlist" v-bind:key="index">
                        <img class="img" :src="item.tagPicUrl" alt="">
                        <img class="btn1" v-if="item.buy==1" src="../assets/images/kuang_hover.png" alt="">
                        <img class="btn1" v-if="item.buy==2" src="../assets/images/kuang_hover.png" alt="">
                        <img class="btn1" v-else src="../assets/images/kuang.png" alt="">
                        <span class="msg">{{item.remark}}</span>
                    </li>
                </ul>
                <ul class="yop">
                    <li @click="qmbtn3(index,item.id,item.buy,item.tagPrice,item.tagName)" v-if="item.flagValue==5" v-for="(item,index) in biaoqianlist" v-bind:key="index">
                        <img class="img" :src="item.tagPicUrl" alt="">
                        <img class="btn1" v-if="item.buy==1" src="../assets/images/kuang_hover.png" alt="">
                        <img class="btn1" v-if="item.buy==2" src="../assets/images/kuang_hover.png" alt="">
                        <img class="btn1" v-else src="../assets/images/kuang.png" alt="">
                        <span class="msg">{{item.remark}}</span>
                    </li>
                </ul>
                <ul class="yop">
                    <li @click="qmbtn4(index,item.id,item.buy,item.tagPrice,item.tagName)" v-if="item.flagValue==6" v-for="(item,index) in biaoqianlist" v-bind:key="index">
                        <img class="img" :src="item.tagPicUrl" alt="">
                        <img class="btn1" v-if="item.buy==1" src="../assets/images/kuang_hover.png" alt="">
                        <img class="btn1" v-if="item.buy==2" src="../assets/images/kuang_hover.png" alt="">
                        <img class="btn1" v-else src="../assets/images/kuang.png" alt="">
                        <span class="msg">{{item.remark}}</span>
                    </li>
                </ul>
                <ul class="yop yop_z">
                    <li @click="qmbtn5(index,item.id,item.buy,item.tagPrice,item.tagName)" v-if="item.flagValue==7" v-for="(item,index) in biaoqianlist" v-bind:key="index">
                        <img class="img" :src="item.tagPicUrl" alt="">
                        <img class="btn1" v-if="item.buy==1" src="../assets/images/kuang_hover.png" alt="">
                        <img class="btn1" v-if="item.buy==2" src="../assets/images/kuang_hover.png" alt="">
                        <img class="btn1" v-else src="../assets/images/kuang.png" alt="">
                        <span class="msg">{{item.remark}}</span>
                    </li>
                </ul> -->
                <ul class="yu_money">
                    <li class="left">您已选择标签：
                        <span v-for="(item,index) in title" v-bind:key="index">{{item}}、 </span> 
                    </li>
                    <li class="money">总计：<span>{{Math.round( (total)*100)/100}}元</span></li>
                    <!-- <li class="money">总计：<span>{{Math.round( (money1 + money2 + money3 + money4 + money5)*100)/100}}元</span></li> -->
                    <li class="btn" @click="sumbitBtnK">确认购买</li>
                </ul>
            </div> 
        </div>
        <div class="from_black" v-if='zhezhao'>
            <div class='from_white'>
                <p class='from_white_title'>购买<i>“己认证”</i>标签后请致电专属客服进行下一步认证 后才会显示标签!</p>
                <div class='from_white_d1'>
                    <p class="center shou" @click='()=>{this.zhezhao=false}'>取消</p>
                    <p class="center shou" @click='sumbitBtn'>确定</p>
                </div>
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
        <div class="tipbox" v-if="tipbox1">
            <ul>
                <li class="textmsg">{{textmsg1}}</li>
                <li class="tipbtn" @click="closebtn1">确认</li>
            </ul>
        </div>
        <div class="paymain" v-if='showdisplay'>
            <div class="paymain_box">
                <ul class="money">
                    <li class="num">￥{{Math.round( (total)*100)/100}}元</li>
                    <li class="title">请选择支付方式</li>
                </ul>
                <ul class="way">
                    <li @click="pay(2)" :class="{active:zfId===2}">
                        <img src="../assets/images/pay1.png" alt="">
                        <span>微信</span>
                    </li>
                    <li @click="pay(1)" :class="{active:zfId===1}">
                        <img src="../assets/images/pay2.png" alt="">
                        <span>支付宝</span>
                    </li>
                    <li @click="pay(3)" :class="{active:zfId===3}">
                        <img src="../assets/images/pay3.png" alt="">
                        <span>金币</span>
                    </li>
                </ul>
                <ul class="btn">
                    <li class="left" @click='zfclose'>取消</li>
                    <li class="right" @click="pay_click">确认</li>
                </ul>
            </div>
        </div>
        <div class="img_filex" @click="img_non" v-if="weixin">
            <img :src="'data:image/png;base64,'+weixin">
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
  name: 'buylabel',
  data () {
    return {
        total:0,
        zfId:2,
        weixin: null,
        showdisplay:false,
        tipbox:false,
        textmsg:'',
        tipbox1:false,
        textmsg1:'',
        value4:'',
        num5:[],
        num6:[],
        num7:[],
        num8:[],
        title:[],
        title1:'',
        title2:'',
        title3:'',
        title4:'',
        money1:0,
        money2:0,
        money3:0,
        money4:0,
        money5:0,
        tagsId:[],
        dazheId5:'',
        dazheId6:'',
        dazheId7:'',
        dazheId8:'',
        iid5:'',
        iid6:'',
        iid7:'',
        iid8:'',
        biaoqianlist:[],
        zhezhao:false,
        orderNumber:'',//订单号
        orderPrice:'',//订单价格
    }
  },
    methods: {
        closebtn(){
            this.tipbox=!this.tipbox
        },
        closebtn1(){
            this.tipbox1=!this.tipbox1
            this.$router.push({name:'personfabu', query: { type: 2 }})
        },
        // 二维码
        img_non() {
            this.weixin = null;
        },
        // 选择支付方式
        pay(zfId) {
            this.zfId = zfId;
        },
        zfclose(){
            this.$router.go(0)
        },
        pay_click(){
            var that=this
             var data=this.qs.stringify({
                orderNo:this.orderNumber,
                payType:this.zfId,
                type:2
            })
            if(this.zfId==1){
                this.$http('/payapi/payOrder','post',data,this.$store.state.token).then(
                res=>{
                    console.log(res)
                    if(res.data.code==100){
                        const div = document.createElement("div");
                        div.innerHTML = res.data.data.date; //此处form就是后台返回接收到的数据
                        document.body.appendChild(div);
                        document.forms[0].submit();
                    }
                })
            }
            if(this.zfId==2){
                this.$http('/payapi/payOrder','post',data,this.$store.state.token).then(
                res=>{
                    console.log(res)
                    if(res.data.code==100){
                        that.weixin = res.data.data.date;
                        that.orderNo = res.data.data.orderNo;
                        that.timer = setInterval(that.orders, 3000);
                    }
                })
            }
            if(this.zfId==3){
                this.$http('/payapi/payByBalance','post',data,this.$store.state.token).then(
                res=>{
                    console.log(res)
                    if(res.data.code==100){
                        this.tipbox1=!that.tipbox1
                        this.textmsg1=res.data.msg
                        this.showdisplay=!this.showdisplay
                    }else{
                        this.tipbox1=!that.tipbox1
                        this.textmsg1=res.data.msg
                        this.showdisplay=!this.showdisplay
                    }
                })
            }
        },
        orders(orderNo) {
            var data = this.qs.stringify({
                orderNo: this.orderNo,
                type:2
            });
            var that = this;
            this.$http("/payapi/queryOrder", "post", data, this.$store.state.token).then(res => {
                console.log(res);
                switch (res.data.data) {
                case 1:
                    that.$router.go(0);
                    break;
                }
            });
        },
        sumbitBtnK(){
            if(this.value4==2){
                this.zhezhao=!this.zhezhao
            }else{
                this.sumbitBtn()
            }
        },
        sumbitBtn(){
            
                if(this.dazheId5==''){
                    var fwId = this.tagsId.push()
                }else{
                     var fwId = this.tagsId.push(this.dazheId5)
                }
                if(this.dazheId6==''){
                    var fwId = this.tagsId.push()
                }else{
                     var fwId = this.tagsId.push(this.dazheId6)
                }
                if(this.dazheId7==''){
                    var fwId = this.tagsId.push()
                }else{
                     var fwId = this.tagsId.push(this.dazheId7)
                }
                if(this.dazheId8==''){
                    var fwId = this.tagsId.push()
                }else{
                     var fwId = this.tagsId.push(this.dazheId8)
                }
                console.log(this.tagsId)
                if(this.tagsId==''){
                    this.tipbox=true,
                    this.textmsg='请选择要购买的标签！'
                }else{
                    var data={
                        infoId:this.$route.query.id,
                        tagsId:this.tagsId,
                    }
                    this.$http('/app/tags/againBuy','post',data,this.$store.state.token).then(
                        res=>{
                            if(res.data.code==100){
                                console.log(res)
                                if(res.data.data.orderPrice==0){
                                    this.tipbox1=true,
                                    this.textmsg1='标签添加成功！'
                                }else{
                                    this.orderNumber=res.data.data.orderNumber
                                    this.orderPrice=res.data.data.orderPrice
                                    this.showdisplay=!this.showdisplay
                                }
                            }
                        },
                    )
            }
        },
        qmbtn(index,item){
            const {id,buy,tagPrice,tagName,block} = item
            console.log(item)
            if(block==0){
                if(buy==0){
                    this.total += tagPrice
                    this.tagsId.push(id)
                    this.title.push(tagName)
                    this.biaoqianlist[index].buy=2
                    console.log(tagName)
                    console.log(id)
                    console.log(tagPrice)
                }else{
                    this.total -= tagPrice
                    this.biaoqianlist[index].buy=0
                    var indId = this.tagsId.indexOf(id)
                    this.tagsId.splice(indId,1)
                    var titId = this.title.indexOf(tagName)
                    this.title.splice(indId,1)
                     console.log(tagName)
                    console.log(id)
                    console.log(tagPrice)
              
                }
                
            }
            if(block==1){
                this.tipbox=true,
                this.textmsg='该标签已经购买！'
            }
            // if(buy==2){
            //     this.money1=this.money1-money
            //     this.biaoqianlist[index].buy=0
            //     var indId = this.tagsId.indexOf(id)
            //     this.tagsId.splice(indId,1)
            //     var titId = this.title.indexOf(title)
            //     this.title.splice(titId,1)
            //     console.log(this.tagsId)
            //     console.log(this.title)
            //     console.log(this.money1)
            // }
        },
        qmbtn1(index,id,buy,money,title){
            console.log(buy)
            if(buy==0){
                this.money1=this.money1+money
                this.tagsId.push(id)
                this.title.push(title)
                this.biaoqianlist[index].buy=2
                console.log(this.tagsId)
                console.log(this.title)
                console.log(this.money1)
            }
            if(buy==1){
                this.tipbox=true,
                this.textmsg='该标签已经购买！'
            }
            if(buy==2){
                this.money1=this.money1-money
                this.biaoqianlist[index].buy=0
                var indId = this.tagsId.indexOf(id)
                this.tagsId.splice(indId,1)
                var titId = this.title.indexOf(title)
                this.title.splice(titId,1)
                console.log(this.tagsId)
                console.log(this.title)
                console.log(this.money1)
            }
        },
        qmbtn2(index,id,buy,money,title){
            if(buy==0){
                for(var i=0;i<this.num8.length;i++){
                    if(this.biaoqianlist[this.num8[i]].buy==1){
                         this.iid8=this.num8[i]
                         this.biaoqianlist[this.num8[i]].buy=3
                    }else{
                        this.biaoqianlist[this.num8[i]].buy=4
                    } 
                }
                console.log(this.iid8)
                console.log(index)
                this.biaoqianlist[index].buy=2
                this.dazheId8=id
                this.title4=title
                console.log(this.dazheId8)
                console.log(this.title4)
                this.money5=money
                console.log(this.money5)
            }
            if(buy==1){
                this.tipbox=true,
                this.textmsg='该标签已经购买！'
            }
            if(buy==2){
                for(var i=0;i<this.num8.length;i++){
                    if(this.iid8==''){
                        this.biaoqianlist[this.num8[i]].buy=4
                    }else{
                        this.biaoqianlist[this.iid8].buy=1
                        this.biaoqianlist[this.num8[i]].buy=4
                    }
                }
                this.dazheId8=''
                this.title4=''
                console.log(this.title4)
                console.log(this.dazheId8)
                 console.log(this.biaoqianlist[index])
                this.biaoqianlist[index].buy=0
                this.money5=0
                console.log(this.money5)
            }
            if(buy==3){
                for(var i=0;i<this.num8.length;i++){
                    this.biaoqianlist[this.num8[i]].buy=4
                }
                this.dazheId8=''
                console.log(this.dazheId8)
                 this.title4=''
                console.log(this.title4)
               
                this.biaoqianlist[index].buy=1
                this.money5=0
                console.log(this.money5)
            }
            if(buy==4){
                for(var i=0;i<this.num8.length;i++){
                    if(this.iid8==''){
                        this.biaoqianlist[this.num8[i]].buy=0
                    }else{
                        if(this.num8[i]==this.iid8){
                            this.biaoqianlist[this.num8[i]].buy=3
                        }else{
                            this.biaoqianlist[this.num8[i]].buy=4
                        }  
                    }                
                }
                console.log(this.iid8)
                this.biaoqianlist[index].buy=2
                if(this.iid8==index){
                    this.dazheId8=''
                    this.money5=0
                    this.title1=''
                }else{
                    this.dazheId8=id
                    this.money5=money
                    this.title4=title
                    
                }
                console.log(this.title4)
                console.log(this.dazheId8)
                console.log(this.money5)
            }
        },
        qmbtn3(index,id,buy,money,title){
            if(buy==0){
                for(var i=0;i<this.num5.length;i++){
                    if(this.biaoqianlist[this.num5[i]].buy==1){
                         this.iid5=this.num5[i]
                         this.biaoqianlist[this.num5[i]].buy=3
                    }else{
                        this.biaoqianlist[this.num5[i]].buy=4
                    } 
                }
                console.log(this.iid5)
                console.log(index)
                this.biaoqianlist[index].buy=2
                this.dazheId5=id
                this.title1=title
                console.log(this.dazheId5)
                console.log(this.title1)
                this.money2=money
                console.log(this.money2)
            }
            if(buy==1){
                this.tipbox=true,
                this.textmsg='该标签已经购买！'
            }
            if(buy==2){
                for(var i=0;i<this.num5.length;i++){
                    if(this.iid5==''){
                        this.biaoqianlist[this.num5[i]].buy=4
                    }else{
                        this.biaoqianlist[this.iid5].buy=1
                        this.biaoqianlist[this.num5[i]].buy=4
                    }
                }
                this.dazheId5=''
                this.title1=''
                console.log(this.title1)
                console.log(this.dazheId5)
                 console.log(this.biaoqianlist[index])
                this.biaoqianlist[index].buy=0
                this.money2=0
                console.log(this.money2)
            }
            if(buy==3){
                for(var i=0;i<this.num5.length;i++){
                    this.biaoqianlist[this.num5[i]].buy=4
                }
                this.dazheId5=''
                console.log(this.dazheId5)
                 this.title1=''
                console.log(this.title1)
               
                this.biaoqianlist[index].buy=1
                this.money2=0
                console.log(this.money2)
            }
            if(buy==4){
                for(var i=0;i<this.num5.length;i++){
                    if(this.iid5==''){
                        this.biaoqianlist[this.num5[i]].buy=0
                    }else{
                        if(this.num5[i]==this.iid5){
                            this.biaoqianlist[this.num5[i]].buy=3
                        }else{
                            this.biaoqianlist[this.num5[i]].buy=4
                        }  
                    }                
                }
                console.log(this.iid5)
                this.biaoqianlist[index].buy=2
                if(this.iid5==index){
                    this.dazheId5=''
                    this.money2=0
                    this.title1=''
                }else{
                    this.dazheId5=id
                    this.money2=money
                    this.title1=title
                    
                }
                console.log(this.title1)
                console.log(this.dazheId5)
                console.log(this.money2)
            }
        },
        qmbtn4(index,id,buy,money,title){
            if(buy==0){
                for(var i=0;i<this.num6.length;i++){
                    if(this.biaoqianlist[this.num6[i]].buy==1){
                         this.iid6=this.num6[i]
                         this.biaoqianlist[this.num6[i]].buy=3
                    }else{
                        this.biaoqianlist[this.num6[i]].buy=4
                    } 
                }
                console.log(this.iid6)
                this.biaoqianlist[index].buy=2
                this.dazheId6=id
                console.log(this.dazheId6)
                this.title2=title
                console.log(this.title2)
                this.money3=money
                console.log(this.money3)
            }
            if(buy==1){
                this.tipbox=true,
                this.textmsg='该标签已经购买！'
            }
            if(buy==2){
                for(var i=0;i<this.num6.length;i++){
                    if(this.iid6==''){
                        this.biaoqianlist[this.num6[i]].buy=4
                    }else{
                        this.biaoqianlist[this.iid6].buy=1
                        this.biaoqianlist[this.num6[i]].buy=4
                    }
                }
                this.dazheId6=''
                console.log(this.dazheId6)
                this.title2=''
                console.log(this.title2)
                this.biaoqianlist[index].buy=0
                this.money3=0
                console.log(this.money3)
            }
            if(buy==3){
                console.log(123456)
                for(var i=0;i<this.num6.length;i++){
                    this.biaoqianlist[this.num6[i]].buy=4
                }
                this.biaoqianlist[index].buy=1
                this.dazheId6=''
                console.log(this.dazheId6)
                this.title2=''
                console.log(this.title2)
                this.biaoqianlist[index].buy=1
                this.money3=0
                console.log(this.money3)
            }
            if(buy==4){
                for(var i=0;i<this.num6.length;i++){
                    if(this.iid6==''){
                        this.biaoqianlist[this.num6[i]].buy=0
                    }else{
                        if(this.num6[i]==this.iid6){
                            this.biaoqianlist[this.num6[i]].buy=3
                        }else{
                            this.biaoqianlist[this.num6[i]].buy=4
                        }  
                    }                  
                }
                this.biaoqianlist[index].buy=2
                if(this.iid6==index){
                    this.dazheId6=''
                    this.money3=0
                    this.title2=''
                }else{
                    this.dazheId6=id
                    this.money3=money
                    this.title2=title
                }
                console.log(this.dazheId6)
                console.log(this.money3)
                console.log(this.title2)
            }
        },
        qmbtn5(index,id,buy,money,title){
            if(buy==0){
                for(var i=0;i<this.num7.length;i++){
                    if(this.biaoqianlist[this.num7[i]].buy==1){
                         this.iid7=this.num7[i]
                         this.biaoqianlist[this.num7[i]].buy=3
                    }else{
                        this.biaoqianlist[this.num7[i]].buy=4
                    } 
                }
                console.log(this.iid7)
                this.biaoqianlist[index].buy=2
                this.dazheId7=id
                this.title3=title
                console.log(this.title3)
                console.log(this.dazheId7)
                this.money4=money
                console.log(this.money4)
            }
            if(buy==1){
                this.tipbox=true,
                this.textmsg='该标签已经购买！'
            }
            if(buy==2){
                for(var i=0;i<this.num7.length;i++){
                    if(this.iid7==''){
                        this.biaoqianlist[this.num7[i]].buy=4
                    }else{
                        this.biaoqianlist[this.iid7].buy=1
                        this.biaoqianlist[this.num7[i]].buy=4
                    }
                }
                this.dazheId7=''
                console.log(this.dazheId7)
                this.title3=''
                console.log(this.title3)
                this.biaoqianlist[index].buy=0
                this.money4=0
                console.log(this.money4)
            }
            if(buy==3){
                for(var i=0;i<this.num7.length;i++){
                    this.biaoqianlist[this.num7[i]].buy=4
                }
                this.dazheId7=''
                console.log(this.dazheId7)
                this.title3=''
                console.log(this.title3)
                this.biaoqianlist[index].buy=1
                this.money4=0
                console.log(this.money4)
            }
            if(buy==4){
                for(var i=0;i<this.num7.length;i++){
                    if(this.iid7==''){
                        this.biaoqianlist[this.num7[i]].buy=0
                    }else{
                        if(this.num7[i]==this.iid7){
                            this.biaoqianlist[this.num7[i]].buy=3
                        }else{
                            this.biaoqianlist[this.num7[i]].buy=4
                        }  
                    }                    
                }
                this.biaoqianlist[index].buy=2
                if(this.iid7==index){
                    this.dazheId7=''
                    this.money4=0
                    this.title3=''
                }else{
                    this.dazheId7=id
                    this.money4=money
                    this.title3=title
                }
                console.log(this.dazheId7)
                console.log(this.money4)
                console.log(this.title3)
            }
        },
    },
     created(){
        var data = this.qs.stringify({
            infoId:this.$route.query.id
        })
        this.$http('/app/tags/getTagsList','post',data,this.$store.state.token).then(
            res=>{
                if(res.data.code==100){
                    console.log(res)
                    res.data.data.forEach(item => {
                        
                        if(item.buy==0){
                            item.block = 0
                        }else{
                            this.total += item.tagPrice
                            item.block = 1
                        }
                        this.biaoqianlist.push(item)
                    });
                    // for(var i=0;i<res.data.data.length;i++){
                    //     if(res.data.data[i].flagValue==4){
                    //          this.value4=res.data.data[i].buy
                    //     }
                    //     if(res.data.data[i].flagValue==5){
                    //         this.num5.push(i)
                    //     }
                    //     if(res.data.data[i].flagValue==6){
                    //         this.num6.push(i)
                    //     }
                    //     if(res.data.data[i].flagValue==7){
                    //         this.num7.push(i)
                    //     }
                    //     if(res.data.data[i].flagValue==8){
                    //         this.num8.push(i)
                    //     }
                    // }
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
        margin-bottom: 50px;
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