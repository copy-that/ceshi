<template>
    <div class="page">
        <!-- header -->
        <Header/>
        <!-- 搜索 -->
        <Search/>
        <!--内容-->
        <div class="navlist">
            <div class="navlist_top">
                <div v-for="(item,key) in list" v-bind:key="key">
                    <ul v-if="item.valueField!=='zd_xinxi'&&item.valueField!=='zd_fenzhan'&&item.valueField!=='zd_buy_price'&&item.valueField!=='zd_mianji'">
                        <li class="title">{{item.valueName}}</li>
                        <div style="float:left;width:1100px;">
                            <li class="sort" :class="res.id==label[key]?'active':''"  v-for="(res,index) in item.zdValue"  v-bind:key="index" @click="changeList(key,res.id)" :id="res.id">
                                <span v-if="res.id==''">{{res.value}}</span>
                                <span v-else>{{res.value}}</span>
                            </li>
                        </div>
                    </ul>
                    <ul v-if="item.valueField=='zd_buy_price'">
                        <li class="title">{{item.valueName}}</li>
                        <div style="float:left;width:1100px;">
                            <li class="sort" :class="res.id==label[key]?'active':''"  v-for="(res,index) in item.zdValue"  v-bind:key="index" @click="changeList(key,res.id)" :id="res.id">
                                <span v-if="res.id==''" style="display:block;height:40px;">{{res.value}}</span>
                                <span v-else-if="res.valueType==0">{{res.value}}万元以下</span>
                                <span v-else-if="res.valueType==1">{{res.value}}万元</span>
                                <span v-else-if="res.valueType==2">{{res.value}}万元以上</span>
                            </li>
                        </div>
                    </ul>
                    <ul v-if="item.valueField=='zd_mianji'">
                        <li class="title">{{item.valueName}}</li>
                        <li class="sort" :class="res.id==label[key]?'active':''"  v-for="(res,index) in item.zdValue"  v-bind:key="index" @click="changeList(key,res.id)" :id="res.id">
                            <span v-if="res.id==''">{{res.value}}</span>
                            <!-- <span v-else>{{res.value}}㎡</span> -->
                            <span v-else-if="res.valueType==0">{{res.value}}㎡以下</span>
                            <span v-else-if="res.valueType==1">{{res.value}}㎡</span>
                            <span v-else-if="res.valueType==2">{{res.value}}㎡以上</span>
                        </li>
                    </ul>
                    <ul class="nav_bot" v-if="item.valueField=='zd_fenzhan'">
                        <li class="title">{{item.valueName}}</li>
                        <li class="placename" :class="tabbar?'is_active':''">
                            <span v-for="(res,index) in item.zdValue" v-bind:key="index" :class="res.id==label[key]?'activeColor':''" @click="changeList(key,res.id)" :id="res.id">{{res.value}}</span>
                        </li>
                        <li class="more"  @click="morebtn()">{{more}} > </li>
                    </ul>
                </div>
            </div>
            <div class="navlist_bot">
                <ul class="title">
                    <li class="name">喜买屋房源信息</li>
                    <li class="tip">信息总数<span>{{numbars}}</span>，您知道吗？置顶发布的信息可使成功率提高5倍</li>
                </ul>
                <div class="infolist" v-for="(item,index) in infolist" v-bind:key="index">
                    <router-link tag="a" target="_blank" :to="{ name: 'navlistXq', query: { id: item.id }}">
                    <ul class="img">
                        <div class="video-icon" v-if="item.infoVideoUrl">
                            <img width="50" src="../assets/images/play.png" alt="">
                        </div>
                        <img v-if="item.infoVideoUrl" :src="item.infoVideoUrl+'?x-oss-process=video/snapshot,t_1000,w_210,h_140'" alt="">
                        <img v-else :src="item.picUrls[0]+'?x-oss-process=image/resize,m_fill,h_140,w_210'" alt="">
                        <li>{{item.picUrls.length}}张</li>
                    </ul>
                    <ul class="text" style="width:700px;">   
                        <li class="name">{{item.title}}</li>
                        <li class="add">
                            <img src="../assets/images/icon4.png" alt="">
                            <span>户型：{{item.classify}}</span>
                            <span>面积：{{item.area}}㎡</span>
                        </li>
                        <li class="time">
                            <img src="../assets/images/icon5.png" alt="">
                            <span>发布时间：{{item.createTime}}</span>
                        </li>
                        <li class="tally">
                            <span class="y_tip">{{item.identityMsg}}</span>
                            <span class="y_tip">{{item.dicorationNumMsg}}</span>
                            <span class="y_tip">{{item.statusMsg}}</span>
                            <p v-for="(res,index) in item.tagVos" v-bind:key="index">
                                <span>{{res.remark}}</span>
                                <img :src="res.tagPicUrl" alt="">
                            </p>
                        </li>
                    </ul>
                    <ul class="money" style="width:260px;text-align: center"><span>{{item.price }}</span>万元</ul>
                    </router-link>
                </div>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="pagesize"
                    :total="totalCount"
                    prev-text="上一页"
                    next-text="下一页"
                    @current-change="currentChange">
                </el-pagination>
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
export default {
    components: {
    Header,
    Search,
    Indexnav,
    Footer
  },
  name: 'navlist1',
  data () {
    return {
        numbars:'',
        totalCount:0,
        pagesize:10,
        label:['','','','','','',''],
        list:[],
        tabbar: false,
        more:'更多',
        infolist:[]
    }
  },
  mounted(){
    // console.log(this.$route.query.navid)
  },
  methods: {
    // 单选
    changeList(key,id){
        this.$set(this.label,key,id)
        console.log(this.label)
        var data=this.qs.stringify({
            type:1,
            identity:this.label[0],
            auStatus:this.label[1],
            dicorationNum:this.label[2],
            classify:this.label[3],
            price:this.label[4],
            area:this.label[5],
            station:this.$store.state.cityId,
            zoneId:this.label[6],
            page:1,
            pageSize:10
        })
        this.$http('/app/rendInfoApi/getBuyHouseList','post',data,'').then(
            res=>{
                if(res.data.code==100){
                    this.numbars=res.data.data.rendNum
                    this.totalCount=Math.ceil(res.data.data.rendNum/this.pagesize)*10
                    for(var i=0; i < res.data.data.rendVos.length;i++){
                        res.data.data.rendVos[i].picUrls=res.data.data.rendVos[i].picUrls.split(',');
                    }
                    this.infolist=res.data.data.rendVos
                    // console.log(this.infolist)
                }
            },
        )
    },
    // 更多
    morebtn() {
        this.tabbar = !this.tabbar
        if(this.more=='更多'){
            this.more = "收起"
        }else{
            this.more = '更多'
        }               
    },
    currentChange(pages){
        console.log(pages)
        var data=this.qs.stringify({
            type:1,
            identity:this.label[0],
            auStatus:this.label[1],
            dicorationNum:this.label[2],
            classify:this.label[3],
            price:this.label[4],
            area:this.label[5],
            station:this.$store.state.cityId,
            zoneId:this.label[6],
            page:pages,
            pageSize:10
        })
        this.$http('/app/rendInfoApi/getBuyHouseList','post',data,'').then(
            res=>{
                if(res.data.code==100){
                    this.numbars=res.data.data.rendNum
                    this.totalCount=Math.ceil(res.data.data.rendNum/this.pagesize)*10
                    for(var i=0; i < res.data.data.rendVos.length;i++){
                        res.data.data.rendVos[i].picUrls=res.data.data.rendVos[i].picUrls.split(',');
                    }
                    this.infolist=res.data.data.rendVos
                    // console.log(this.infolist)
                }
            },
        )
    }
   },
   created(){
     console.log(this.$store.state.cityId)
    //  if(this.$store.state.cityId==null){
    //      this.label[6]=''
    //  }else{
    //     this.label[6]=this.$store.state.cityId
    //  }
    
    // 数据字典
    var data=this.qs.stringify({
        type:1,
        cityId:this.$store.state.cityId
    })
    this.$http('/app/rendInfoApi/getDictionaryList','post',data,'').then(
        res=>{
            if(res.data.code==100){
                console.log(res)
                this.list=res.data.data
            }
        },
    )
    //列表
    var data=this.qs.stringify({
        type:1,
        identity:this.label[0],
        auStatus:this.label[1],
        dicorationNum:this.label[2],
        classify:this.label[3],
        price:this.label[4],
        area:this.label[5],
        station:this.$store.state.cityId,
        zoneId:this.label[6],
        page:1,
        pageSize:10
    })
    this.$http('/app/rendInfoApi/getBuyHouseList','post',data,'').then(
        res=>{
            if(res.data.code==100){
                this.numbars=res.data.data.rendNum
                this.totalCount=Math.ceil(res.data.data.rendNum/this.pagesize)*10
                for(var i=0; i < res.data.data.rendVos.length;i++){
                    res.data.data.rendVos[i].picUrls=res.data.data.rendVos[i].picUrls.split(',');
                }
                 this.infolist=res.data.data.rendVos
                //  console.log(this.infolist)
            }
        },
    )
  }
}
</script>
<style>
    .el-pagination{
        float: right;
        margin-top: 50px;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #F76617!important;
    color: #fff!important;
   }
   .el-pager li:hover{
       color: #F76617 !important
   }
   .el-pager li:hover.active{
       color: #fff !important
   }
   .btn-prev{
       padding: 0 5px !important;
   }
   .btn-next{
       padding: 0 5px !important;
   }
</style>