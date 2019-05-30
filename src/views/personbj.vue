<template>
    <div class="page">
        <!-- header -->
        <Header/>
        <!--main-->
        <div class="fabu_page" style="padding-bottom:50px;">
            <div class="fabu_page_top">
                <p>
                    <router-link :to="{ name: 'personfabu', query: { type: 2 }}">我的发布 ></router-link>编辑信息
                </p>
            </div>
            <ul class="fabu_list">
                <li class="name">所属地区：</li>
                <li class="input">
                <el-cascader
                    placeholder="请选择所属地区"
                    :options="options"
                    separator=","
                    v-model="selectedOptions"
                    @change="handleChange"
                    @blur='blurChange'>
                </el-cascader>
                </li>
            </ul>
            <ul class="fabu_list">
                <li class="name">有&ensp;效&ensp;期：</li>
                <li class="input">
                <el-select v-model="value" placeholder="请选择有效期限" @change="industryChange">
                    <el-option
                    v-for="item in industry"
                    :key="item.id"
                    :label="item.periodName"
                    :value="item.periodValue"
                    ></el-option>
                </el-select>
                </li>
            </ul>
            <ul class="fabu_list">
                <li class="name">信息标题：</li>
                <li class="input">
                    <input class="text" placeholder="请输入信息标题" type="text" v-model="title">
                </li>
            </ul>
            <ul class="fabu_list">
                <li class="name">称&emsp;&emsp;呼：</li>
                <li class="input">
                    <input class="text" placeholder="我们应该如何称呼您" type="text" v-model="callName">
                </li>
            </ul>
            <ul class="fabu_list">
                <li class="name">手机号码：</li>
                <li class="input">
                    <input class="text" placeholder="您的联系方式，方便我们及时与您联系" type="text" v-model="phone">
                </li>
            </ul>
            <ul class="fabu_list">
                <li class="name">地理位置：</li>
                <li class="input">
                    <el-select
                        v-model="value9"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入详细地址"
                        :remote-method="remoteMethod"
                        @change="addloc">
                        <el-option
                        v-for="item in add"
                        :key="item.uid"
                        :label="item.address"
                        :value="item.address+','+item.location.lat+','+item.location.lng">
                        </el-option>
                    </el-select>
                </li>
            </ul>
            <ul class="fabu_list" v-if="type==1 || type==9">
                <li class="name">装&emsp;&emsp;修：</li>
                <li class="input">
                <el-select v-model="zxvalue" placeholder="请选择装修类型" @change="zxinput">
                    <el-option
                    v-for="item in zxlist"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                    ></el-option>
                </el-select>
                </li>
            </ul>
            <ul class="fabu_list" v-if="type==2">
                <li class="name">出租类型：</li>
                <li class="input">
                <el-select v-model="czvalue" placeholder="请选择出租类型" @change="czinput">
                    <el-option
                    v-for="item in czlist"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                    ></el-option>
                </el-select>
                </li>
            </ul>
            <ul class="fabu_list" v-if="type==1 || type==2 || type==9">
                <li class="name">户&emsp;&emsp;型：</li>
                <li class="input">
                <el-select v-model="hxvalue" placeholder="请选择户型" @change="hxinput">
                    <el-option
                    v-for="item in hxlist"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                    ></el-option>
                </el-select>
                </li>
            </ul>
             <ul class="fabu_list" v-if="type==10">
                <li class="name">档&emsp;&emsp;次：</li>
                <li class="input">
                <el-select v-model="dcvalue" placeholder="请选择档次" @change="dcinput">
                    <el-option
                    v-for="item in dclist"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                    ></el-option>
                </el-select>
                </li>
            </ul>
            <ul class="fabu_list" v-if="type==10">
                <li class="name">配&emsp;&emsp;套：</li>
                <li class="input">
                <el-select v-model="ptvalue" placeholder="请选择配套" @change="ptinput">
                    <el-option
                    v-for="item in ptlist"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                    ></el-option>
                </el-select>
                </li>
            </ul>
            <ul class="fabu_list">
                <li class="name">看房时间段：</li>
                <li class="input">
                    <input class="text" placeholder="请填写看房时间段" type="text" v-model="seeBook">
                </li>
            </ul>
            <ul class="fabu_list" style="border:none" v-if="type==1 || type==2 || type==5 || type==6 || type==7 || type==8 || type==9">
                <li class="name">身&emsp;&emsp;份：</li>
                <li class="fabu_right">
                    <span :class="identity==0?'active':''" @click="identityA">个人</span>
                    <span :class="identity==1?'active':''" @click="identityB">经纪人</span>
                </li>
                <li class="fabu_zj" v-if="zjshow">
                    <p class="zj_name">中&ensp;介&ensp;费：</p>
                    <p class="zj_money">
                        <input placeholder="" type="number" v-model="tbBrokerageFee">
                        <span>元</span>
                    </p>
                </li>
            </ul>
            <ul class="fabu_list" style="border:none" v-if="type==1 || type==2 || type==3 || type==4 || type==5 || type==6 || type==7 || type==8 || type==9">
                <li class="name">面&emsp;&emsp;积：</li>
                <li class="fabu_area">
                    <input placeholder="" type="number" v-model="area">
                    <span>平方米</span>
                </li>
            </ul>
            <ul class="fabu_list" style="border:none" v-if="type==1 || type==3 || type==5 || type==7 || type==9">
                <li class="name">价&emsp;&emsp;格：</li>
                <li class="fabu_area">
                    <input placeholder="" type="number" v-model="price">
                    <span>万元</span>
                </li>
            </ul>
            <ul class="fabu_list" style="border:none" v-if="type==2 || type==4 || type==6 || type==8 || type==10">
                <li class="name">租&emsp;&emsp;金：</li>
                <li class="fabu_area">
                    <input placeholder="" type="number" v-model="price">
                    <span>元/月</span>
                </li>
            </ul>
            <!-- 房屋配置 -->
            <ul class="fabu_list" style="border:none;margin:0px auto" v-if="type==2">
                <li class="name" style="width:100%">服务配置:</li>
            </ul>
            <ul class="fwpz" v-if="type==2">
                <li v-for="(item,index) in fwpzlist" v-bind:key="index" @click="fwpzbtn(index,item.id,item.flag)">
                    <img class="btn1" v-if="item.flag==1" src="../assets/images/kuang_hover.png" alt="">
                    <img class="btn1" v-else src="../assets/images/kuang.png" alt="">
                    <span>{{item.value}}</span>
                </li>
            </ul>
            <ul class="fabu_list" style="border:none;margin:0px auto">
                <li class="name" style="width:100%">上传房源照片:</li>
            </ul>
            <ul class="fabu_up">
                <li class="upbtn">
                    <img src="../assets/images/upimg4.jpg">
                    <input @change="uploadimg" type="file">
                </li>
                <li class="imgUp" v-for="(item,index) in upimg" v-bind:key="index">
                    <img :src="item" alt="">
                    <span @click="deletebtn(index)">X</span>
                </li>
            </ul>
            <ul class="fabu_list" style="border:none;margin:0px auto">
                <li class="name" style="width:100%">上传房源视频(选填):</li>
            </ul>
            <ul class="fabu_up">
                <li class="upbtn">
                <img src="../assets/images/upimg4.jpg">
                <input ref="video" @change="uploadvideo" type="file" accept = "video/*">
                </li>
                <li class="imgUp" style="background: #000;">
                <video ref="vidsou" :src="videoPop" height="100" width="100" @click="preview"></video>
                </li>
            </ul>
            
            <ul class="fabu_list" style="border:none;margin:0px auto;height:auto">
                <li class="name" style="width:100%;line-height:50px;">房源信息:</li>
                <textarea class="fy_text" placeholder="描述一下您的房子吧! 无效虚假房源，须赔付看房客信息费!" v-model="remark"></textarea>
            </ul>
            <ul class="fabu_btn">
                <li class="btn" @click="releaseBtn">发布</li>
            </ul>
        </div>
        <div class="tipbox" v-if="tipbox">
            <ul>
                <li class="textmsg">{{textmsg}}</li>
                <li class="tipbtn" @click="closebtn">确认</li>
            </ul>
        </div>
        <!-- 底部 -->
        <Footer/>
    </div>
</template>
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { addressData } from "../assets/js/area1.js";
import { error } from 'util';
export default {
    components: {
        Header,
        Footer
    },
    name: "personbj",
    data(){
        return{
            videoPop:'',
            // 弹框
            boxnum:0,
            tipbox:false,
            textmsg:'',
            // 信息类型
            type:'',
            // 地区
            options: [],
            selectedOptions: [],
            addname:'',
            // 有效期
            industry: [],
            value: "",
            // 地址
            add:[],
            value9: [], 
            //装修
            zxlist: [],
            zxvalue: "", 
            //出租类型
            czlist: [],
            czvalue: "", 
            //户型
            hxlist: [],
            hxvalue: "", 
            //房屋配置
            fwpzlist:[],
            houseVos:[],
            // 中介费显示
            zjshow:false,
            //上传图片
            upimg: [],
            //档次
            dclist: [],
            dcvalue: "", 
            //配套
            ptlist: [],
            ptvalue: "", 
            // 提交
            latitude:'',//纬度
            longitude:'',//经度
            provinceId: "", //省份ID
            cityId: "", //城市ID
            zoneId: "", //区域ID
            validityFlag: "", //有效期
            title: "", //信息标题
            callName:'',//称呼
            phone:'',//电话
            locationText:'',//地址位置
            dicorationNum:'',//装修类型(传id)
            form:'',//出租类型(传id)
            classify:'',//户型
            grade:'',//档次
            mating:'',//配套
            seeBook:'',//看房时间段
            identity:'',//身份
            tbBrokerageFee:'',//中介费
            area:'',//面积
            price:'',//价格
            fwpzId:[],//房屋配置id
            pictureUrls:'',//图片
            remark:'',//房源信息
        }
    },
    mounted(){
        //   地区
        this.options = addressData;
        // 有效期
        this.$http("/app/rendInfoApi/getPeriod","post","",this.$store.state.token).then(res => {
            if (res.data.code == 100) {
                this.industry = res.data.data;
            }
        });
        // 装修
        this.$http("/app/rendInfoApi/getDecorate","post","",this.$store.state.token).then(res => {
            if (res.data.code == 100) {
                this.zxlist = res.data.data;
            }
        });
        // 出租类型
        this.$http("/app/rendInfoApi/getRendType","post","",this.$store.state.token).then(res => {
            if (res.data.code == 100) {
                // console.log(res);
                this.czlist = res.data.data;
            }
        });
        // 户型
        this.$http("/app/rendInfoApi/getHouseType","post","",this.$store.state.token).then(res => {
            if (res.data.code == 100) {
                this.hxlist = res.data.data;
            }
        });
         // 档次
        this.$http("/app/rendInfoApi/getGrade","post","",this.$store.state.token).then(res => {
            if (res.data.code == 100) {
                // console.log(res);
                this.dclist = res.data.data;
            }
        });
        // 配套
        this.$http("/app/rendInfoApi/getMating","post","",this.$store.state.token).then(res => {
            if (res.data.code == 100) {
                // console.log(res);
                this.ptlist = res.data.data;
            }
        });
        
    },
    methods:{
        closebtn(){
            if(this.boxnum==0){
                this.tipbox=!this.tipbox
            }else{
                this.$router.push({name:'personfabu', query: { type: 2 }})
            }
        },
        //获取省市区
        getSelectIndex(pro, cit, zon) {
            var select = [];
            addressData.map((item1, key1) => {
                if (item1.value == pro) {
                select.push(item1.label);
                item1.children.map((item2, key2) => {
                    if (item2.value == cit) {
                    select.push(item2.label);
                    item2.children.map((item3, key3) => {
                        if (item3.value == zon) {
                        select.push(item3.label);
                        }
                    });
                    }
                });
                }
            });
            this.addname=select[0]+select[1]+select[2]
            console.log(this.addname)
        },
        //  选择城市
        handleChange: function(value) {
            this.provinceId = value[0];
            this.cityId = value[1];
            this.zoneId = value[2];
        },
        blurChange(res){
            this.addname=res.target.defaultValue
        },
        // 选择有效期
        industryChange: function(value) {
            this.validityFlag = value;
        },
        // 地址
        addloc(value){
            this.locationText=value.split(',')[0]
            this.latitude=value.split(',')[1]
            this.longitude=value.split(',')[2]
        },
        remoteMethod(query){
            console.log(query)
            var that = this
            $.ajax({
                type:'get',
                url:'https://api.map.baidu.com/place/v2/search',
                data:{
                    query:query,
                    region:that.addname,
                    output:'json',
                    // ak:'E12Fa1o1rpK9GiadGhvG6ObeVjlGTsw5',
                    ak:'wLPpSzY4Qhtzb8R19fAksW3MkKG0BOjd',
                    page_size:5,
                },
                dataType:'jsonp',
                success:function(res){
                    that.add=res.results
                    console.log(that.add)
                },
            });
        },
        //  装修
        zxinput(value){
            this.dicorationNum=value
        },
        //  出租类型
        czinput(value){
            this.form=value
        },
        //  户型
        hxinput(value){
            this.classify=value
        },
        // 选择身份
        identityA(){
            this.identity=0
            this.zjshow=false
        },
        identityB(){
            this.identity=1
            this.zjshow=true
        },
        // 配置
        fwpzbtn(index,id,flag){
            if(flag==0){
                this.fwpzlist[index].flag=1
                this.fwpzId.push(id)
                console.log(this.fwpzId)
            }
            if(flag==1){
                this.fwpzlist[index].flag=0
                var indId = this.fwpzId.indexOf(id)
                this.fwpzId.splice(indId,1)
                console.log(this.fwpzId)
            }
        },
        //  档次
        dcinput(value){
            this.grade=value
        },
        // 配套
        ptinput(value){
            this.mating=value
        },
        preview(){
            let video = this.$refs.vidsou;
            video.play()
        },
         // 上传视频
        uploadvideo(event){

            var that = this;
            let files = event.target.files[0];
            if (!files) return;
            let reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onloadend = function() {
            that.videoPop = this.result;
            };
        },
        // 上传图片
        uploadimg: function(e) {
            var that = this;
            let form = new FormData();
            form.append("file", e.target.files[0]);
            this.$http('/otherInfo/uploadImg','post',form,'').then(
            res=>{
                if(res.data.code==100){
                    this.upimg.push(res.data.data)
                    // console.log(this.upimg.join(','))
                }
            })
            
        },
        //删除图片
        deletebtn: function(index) {
            this.upimg.splice(index, 1);
            // console.log(this.upimg.length);
            // console.log(this.upimg.join(','))
        },
        validPhone(phone){
            var myreg = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$$/;
            return myreg.test(phone)
        },
        // 发布
        releaseBtn(){
            console.log(12)
            if(this.provinceId==''){
                this.tipbox=true,
                this.textmsg='请选择所属地区！'
            }else if(this.cityId==''){
                this.tipbox=true,
                this.textmsg='请选择所属地区！'
            }else if(this.zoneId==''){
                this.tipbox=true,
                this.textmsg='请选择所属地区！'
            }else if(this.validityFlag==''){
                this.tipbox=true,
                this.textmsg='请选择有效期限！'
            }else if(this.title==''){
                this.tipbox=true,
                this.textmsg='请输入信息标题！'
            }else if(this.callName==''){
                this.tipbox=true,
                this.textmsg='请输入您的称呼！'
            }else if(this.phone==''){
                this.tipbox=true,
                this.textmsg='请输入您的联系方式！'
            }else if(!this.validPhone(this.phone)){
                this.tipbox=true,
                this.textmsg='请输入正确的联系方式！'
            }else if(this.locationText==''){
                this.tipbox=true,
                this.textmsg='请输入详细地址！'
            }else if(this.latitude==''){
                this.tipbox=true,
                this.textmsg='请输入详细地址！'
            }else if(this.longitude==''){
                this.tipbox=true,
                this.textmsg='请输入详细地址！'
            }else if(this.seeBook==''){
                this.tipbox=true,
                this.textmsg='请填写看房时间段！'
            }else if(this.upimg.length==0){
                this.tipbox=true,
                this.textmsg='请上传图片！'
            }else if(this.remark==''){
                this.tipbox=true,
                this.textmsg='请填写房子的描述！'
            }else if(this.type==1 || this.type==9){
                if(this.dicorationNum==''){
                    this.tipbox=true,
                    this.textmsg='请选择装修类型！'
                }else if(this.classify==''){
                    this.tipbox=true,
                    this.textmsg='请选择户型！'
                }else if(this.area==''){
                    this.tipbox=true,
                    this.textmsg='请输入面积！'
                }else if(this.price==''){
                    this.tipbox=true,
                    this.textmsg='请输入价格！'
                }else{
                    console.log(1,9)
                    var data=this.qs.stringify({
                        id:this.$route.query.id,
                        provinceId:this.provinceId,
                        cityId:this.cityId,
                        zoneId:this.zoneId,
                        validityFlag:this.validityFlag,
                        title:this.title,
                        callName:this.callName,
                        phone:this.phone,
                        locationText:this.locationText,
                        dicorationNum:this.dicorationNum,
                        classify:this.classify,
                        identity:this.identity,
                        tbBrokerageFee:this.tbBrokerageFee,
                        area:this.area,
                        seeBook:this.seeBook,
                        price:this.price,
                        remark:this.remark,
                        longitude:this.longitude,
                        latitude:this.latitude,
                        pictureUrls:this.upimg.join(','),
                    })
                    this.$http("/app/newPartApi/updateInfo","post",data,this.$store.state.token).then(res => {
                        if (res.data.code == 100) {
                            console.log(res);
                            this.boxnum=1
                            this.tipbox=true,
                            this.textmsg=res.data.msg
                        }
                    });
                }
            }else if(this.type==2){
                if(this.form==''){
                    this.tipbox=true,
                    this.textmsg='请选择出租类型！'
                }else if(this.classify==''){
                    this.tipbox=true,
                    this.textmsg='请选择户型！'
                }else if(this.area==''){
                    this.tipbox=true,
                    this.textmsg='请输入面积！'
                }else if(this.price==''){
                    this.tipbox=true,
                    this.textmsg='请输入价格！'
                }else{
                    console.log(2)
                    var data=this.qs.stringify({
                        id:this.$route.query.id,
                        provinceId:this.provinceId,
                        cityId:this.cityId,
                        zoneId:this.zoneId,
                        validityFlag:this.validityFlag,
                        title:this.title,
                        callName:this.callName,
                        phone:this.phone,
                        locationText:this.locationText,
                        form:this.form,
                        classify:this.classify,
                        identity:this.identity,
                        tbBrokerageFee:this.tbBrokerageFee,
                        area:this.area,
                        houseAllocation:this.fwpzId.join(','),
                        seeBook:this.seeBook,
                        price:this.price,
                        remark:this.remark,
                        longitude:this.longitude,
                        latitude:this.latitude,
                        pictureUrls:this.upimg.join(','),
                    })
                    this.$http("/app/newPartApi/updateInfo","post",data,this.$store.state.token).then(res => {
                        if (res.data.code == 100) {
                            console.log(res);
                            this.boxnum=1
                            this.tipbox=true,
                            this.textmsg=res.data.msg
                        }
                    });
                }
            }else if(this.type==3 || this.type==4){
                if(this.area==''){
                    this.tipbox=true,
                    this.textmsg='请输入面积！'
                }else if(this.price==''){
                    this.tipbox=true,
                    this.textmsg='请输入价格！'
                }else{
                    console.log(3,4)
                    var data=this.qs.stringify({
                        id:this.$route.query.id,
                        provinceId:this.provinceId,
                        cityId:this.cityId,
                        zoneId:this.zoneId,
                        validityFlag:this.validityFlag,
                        title:this.title,
                        callName:this.callName,
                        phone:this.phone,
                        locationText:this.locationText,
                        area:this.area,
                        seeBook:this.seeBook,
                        price:this.price,
                        remark:this.remark,
                        longitude:this.longitude,
                        latitude:this.latitude,
                        pictureUrls:this.upimg.join(','),
                    })
                    this.$http("/app/newPartApi/updateInfo","post",data,this.$store.state.token).then(res => {
                        if (res.data.code == 100) {
                            console.log(res);
                            this.boxnum=1
                            this.tipbox=true,
                            this.textmsg=res.data.msg
                        }
                    });
                }
            }else if(this.type==5 || this.type==6 || this.type==7 || this.type==8){
                if(this.area==''){
                    this.tipbox=true,
                    this.textmsg='请输入面积！'
                }else if(this.price==''){
                    this.tipbox=true,
                    this.textmsg='请输入价格！'
                }else{
                    console.log(5,6,7,8)
                    var data=this.qs.stringify({
                        id:this.$route.query.id,
                        provinceId:this.provinceId,
                        cityId:this.cityId,
                        zoneId:this.zoneId,
                        validityFlag:this.validityFlag,
                        title:this.title,
                        callName:this.callName,
                        phone:this.phone,
                        locationText:this.locationText,
                        identity:this.identity,
                        tbBrokerageFee:this.tbBrokerageFee,
                        area:this.area,
                        seeBook:this.seeBook,
                        price:this.price,
                        remark:this.remark,
                        longitude:this.longitude,
                        latitude:this.latitude,
                        pictureUrls:this.upimg.join(','),
                    })
                    this.$http("/app/newPartApi/updateInfo","post",data,this.$store.state.token).then(res => {
                        if (res.data.code == 100) {
                            console.log(res);
                            this.boxnum=1
                            this.tipbox=true,
                            this.textmsg=res.data.msg
                        }
                    });
                }
            }else if(this.type==10){
                if(this.grade==''){
                    this.tipbox=true,
                    this.textmsg='请选择档次！'
                }else if(this.mating==''){
                    this.tipbox=true,
                    this.textmsg='请选择配套！'
                }else if(this.price==''){
                    this.tipbox=true,
                    this.textmsg='请输入价格！'
                }else{
                    console.log(10)
                    var data=this.qs.stringify({
                        id:this.$route.query.id,
                        provinceId:this.provinceId,
                        cityId:this.cityId,
                        zoneId:this.zoneId,
                        validityFlag:this.validityFlag,
                        title:this.title,
                        callName:this.callName,
                        phone:this.phone,
                        locationText:this.locationText,
                        grade:this.grade,
                        mating:this.mating,
                        seeBook:this.seeBook,
                        price:this.price,
                        remark:this.remark,
                        longitude:this.longitude,
                        latitude:this.latitude,
                        pictureUrls:this.upimg.join(','),
                    })
                    this.$http("/app/newPartApi/updateInfo","post",data,this.$store.state.token).then(res => {
                        if (res.data.code == 100) {
                            console.log(res);
                            this.boxnum=1
                            this.tipbox=true,
                            this.textmsg=res.data.msg
                        }
                    });
                }
            }
        }
    },
    created(){
        if(this.$store.state.token==null || this.$store.state.token==''){
          this.$router.push({name:'login'})
        }
        this.type=this.$route.query.type
        var data=this.qs.stringify({
            infoId:this.$route.query.id
        })
        this.$http('/app/newPartApi/beforeUpdate','post',data,this.$store.state.token).then(
          res=>{
              if(res.data.code==100){
                console.log(res)
                this.selectedOptions=[res.data.data.provinceId,res.data.data.cityId,res.data.data.zoneId]
                this.provinceId = res.data.data.provinceId;
                this.cityId = res.data.data.cityId;
                this.zoneId = res.data.data.zoneId;
                this.getSelectIndex(this.provinceId, this.cityId,this.zoneId)
                
                this.value=res.data.data.validityFlag;
                this.validityFlag=res.data.data.validityFlag;
               
                this.title=res.data.data.title;
                this.callName=res.data.data.callName;
                this.phone=res.data.data.phone;

                this.value9=res.data.data.locationText;
                this.locationText=res.data.data.locationText;

                this.zxvalue=res.data.data.dicorationNum;
                this.dicorationNum=res.data.data.dicorationNum;

                this.hxvalue=res.data.data.classify;
                this.classify=res.data.data.classify;

                this.seeBook=res.data.data.seeBook;
                this.identity=res.data.data.identity;
                this.tbBrokerageFee=res.data.data.tbBrokerageFee;
                this.area=res.data.data.area;
                this.price=res.data.data.price;
                
                this.videoPop = res.data.data.infoVideoUrl;
                this.upimg=res.data.data.picUrls.split(',');
                
                this.remark=res.data.data.remark;
                this.latitude=res.data.data.latitude;
                this.longitude=res.data.data.longitude;

                this.czvalue=res.data.data.form;
                this.form=res.data.data.form;

                this.houseVos=res.data.data.houseVos;
                this.dcvalue=res.data.data.grade;
                this.grade=res.data.data.grade;
                this.ptvalue=res.data.data.mating;
                this.mating=res.data.data.mating;
                // 房屋配置
                this.$http("/app/rendInfoApi/getAllocation","post","",this.$store.state.token).then(res => {
                    if (res.data.code == 100) {
                        console.log(res)
                        this.fwpzlist = res.data.data;
                        this.fwpzlist = res.data.data.map(item => {
                            console.log(this.houseVos)
                            this.houseVos.map(item1 => {
                            if (item.id == item1.id) {
                                item.flag = 1;
                                this.fwpzId.push(item.id);
                            }
                            });
                            return item;
                        });
                        console.log(this.fwpzlist)
                    }
                });
              }
          },
      )
      
    }
}
</script>
<style>
.el-cascader,
.el-select {
  width: 480px !important;
  font-size: 16px;
}
.el-input__inner {
  border: none !important;
}
input::-webkit-input-placeholder {
  color: #666 !important;
}
.el-input__inner {
  font-size: 16px !important;
}
.fabu_list {
  width: 600px;
  height: 40px;
  padding: 3px 0;
  line-height: 40px;
  margin: 20px auto;
  border-bottom: 1px solid #f3f3f3;
}
.fabu_list .name {
  float: left;
  width: 105px;
}
.fabu_list .input {
  float: left;
  width: 480px;
  height: 40px;
}
.fabu_list .input .text{
    display: block;
    width: 480px;
    height: 40px;
    padding: 0 25px 0 15px;
    font-size: 16px;
}
.fabu_list .input img{
    display: block;
    width: 30px;
    height: 30px;
    margin-left: 15px;
}
.fabu_list .fabu_right{
  float: left;
  width:200px;
  height: 40px;
  margin-left: 15px;
}
.fabu_list .fabu_right span{
  display: block;
  float: left;
  width: 80px;
  color: #999;
  text-indent: 25px;
  background: url("../assets/images/pay_t.jpg") no-repeat left center;
  background-size: 14px 15px;
  cursor: pointer;
}
.fabu_list .fabu_right .active{
  background: url("../assets/images/pay_t.png") no-repeat left center;
  background-size: 14px 15px;
}
.fabu_zj{
  float: left;
  width: 280px;
  height: 40px;
  line-height: 40px;
}
.zj_name{
  float: left;
  width: 100px;
   height: 40px;
  line-height: 40px;
}
.zj_money{
  float: left;
  width: 180px;
   height: 40px;
  line-height: 40px;
}
.zj_money input{
  float: left;
  display: block;
  width: 100px;
   height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #f3f3f3
}
.zj_money span{
  float: left;
  display: block;
  width: 80px;
   height: 40px;
  line-height: 40px;
  text-align: center;
}
.fabu_list .fabu_area{
  float: left;
  width: 240px;
  height: 40px;
}
.fabu_list .fabu_area input{
  float: left;
  display: block;
  width: 120px;
  height: 40px;
  margin-left: 20px;
  border-bottom: 1px solid #f3f3f3;
}
.fabu_list .fabu_area span{
  float: left;
  display: block;
  width: 100px;
  height: 40px;
  text-align: center;
}
.fabu_up{
  width: 600px;
  padding: 5px 0;
  margin: auto;
  overflow: hidden;
}
.fabu_up .upbtn{
  float: left;
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 20px;
  margin-bottom: 20px;
  
}
.fabu_up .upbtn img{
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100px;
  height: 100px;
}
.fabu_up .upbtn input{
  position: absolute;
  display: block;
  width: 100px;
  height: 100px;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}
.fabu_up .imgUp{
  float: left;
  position: relative;
   width: 100px;
  height: 100px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.fabu_up .imgUp img{
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100px;
  height: 100px;
}
.fabu_up .imgUp span{
  display: block;
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  cursor: pointer;
}
.fy_text{
  display: block;
  width: 100%;
  height: 180px;
  border: 1px solid #ddd;
  resize: none;
  padding: 10px;
  font-size: 14px;
  font-family: "微软雅黑";
  outline: none;
}
.fabu_btn{
  width: 600px;
  margin:20px auto 0;
}
.fabu_btn .text{
  text-align: center;
  line-height: 100px;
}
.fabu_btn .btn{
  width: 600px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background: #F76617;
  border-radius: 5px;
  cursor: pointer;
}
.yu_main{
        position: relative;
        width: 1198px;
        /* height: 700px; */
        border: 1px solid #ddd;
        margin:50px auto 0;
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
        float: right;
        text-align: center;
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
        margin-right: 20px;
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
    .fwpz{
        width: 600px;
        margin:0 auto 10px;
        overflow: hidden;
    }
    .fwpz li{
        float: left;
        width: 100px;
        height: 40px;
        line-height: 40px;
        color: #999;
        cursor: pointer;
    }
    .fwpz li img{
        float: left;
        display: block;
        width: 12px;
        height: 12px;
        margin-top: 14px;
    }
    .fwpz li span{
        float: left;
        display: block;
        margin-left: 10px;
    }
</style>
