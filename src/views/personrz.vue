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
                <div class="cer">
                    <form action="">
                        <ul>
                            <li class="name">
                                <span>姓名：</span>
                                <input type="text" placeholder="请输入您的姓名" v-model="name">
                            </li>
                            <li class="sfzimg">
                                <span>身份证正反面照片：</span>
                                <ul class="demo">
                                    <li class="upimg1" :style="{backgroundImage: 'url('+ picimg1 +')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}">
                                        <img :src="upPicimg1" alt="">
                                        <input ref="img1" @change="uploadimg($event,1)" type="file">
                                    </li>
                                    <li class="upimg2" :style="{backgroundImage: 'url('+ picimg2 +')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}">
                                        <img :src="upPicimg2" alt="">
                                        <input ref="img2" @change="uploadimg($event,2)" type="file">
                                    </li>
                                </ul>
                            </li>
                            <li class="sfzimg">
                                <span>房&ensp;&ensp;产&ensp;&ensp;证&ensp;照&ensp;片：</span>
                                <ul class="demo">
                                    <li class="upimg3" :style="{backgroundImage: 'url('+ picimg3 +')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}">
                                        <img :src="upPicimg3" alt="">
                                        <input ref="img3" @change="uploadimg($event,3)" type="file">
                                    </li>
                                </ul>
                            </li>
                            <li class="btn" @click="submitbtn">提交</li>
                        </ul>
                    </form>
                </div>
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
  name: 'personrz',
  data () {
    return {
        tipbox:false,
        textmsg:'',
        picimg1:require('../assets/images/upimg1.png'),
        picimg2:require('../assets/images/upimg2.png'),
        picimg3:require('../assets/images/upimg3.jpg'),
        name:'',
        upPicimg1:'',
        upPicimg2:'',
        upPicimg3:'',
    }
  },
   methods: {
       // 上传图片
        uploadimg(event,type){
            var that = this;
            let files=event.target.files[0];
            if(!files) return;
            let reader = new FileReader();
            console.log(reader)
            reader.readAsDataURL(files);
            if(type==1){
                reader.onloadend = function () {
                    that.upPicimg1 = this.result;
                }
            }
            if(type==2){
                reader.onloadend = function () {
                    that.upPicimg2 = this.result;
                }
            }
            if(type==3){
                reader.onloadend = function () {
                    that.upPicimg3=this.result
                    // console.log(that.upPicimg3)
                }
            }
            
        },
        closebtn(){
            this.tipbox=!this.tipbox
        },
        submitbtn(){
            if(this.name==''){
                this.tipbox=true,
                this.textmsg='请输入您的姓名！'
            }else if(this.upPicimg1==''){
                this.tipbox=true,
                this.textmsg='请上传身份证正面！'
            }else if(this.upPicimg2==''){
                this.tipbox=true,
                this.textmsg='请上传身份证反面！'
            }else if(this.upPicimg3==''){
                this.tipbox=true,
                this.textmsg='请上传房产证照片！'
            }else{
                console.log(this.$refs.img1.files)
                let form = new FormData()
                form.append('image1',this.$refs.img1.files[0])
                form.append('image2',this.$refs.img2.files[0])
                form.append('image3',this.$refs.img3.files[0])
                form.append('certificationName',this.name)                
                this.$http('/app/commonUser/userCertification','post',form,this.$store.state.token).then(
                    res=>{
                        if(res.data.code==100){
                            console.log(res)
                        }
                    },
                )
            }
        }
   }
}
</script>