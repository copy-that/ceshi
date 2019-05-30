<template>
    <div class="page">
        <div class="Login_top">
            <div class="Login_center" @click="indexBtn">
                <img src="../assets/images/logo_top.png">
            </div>
        </div>
        <div class="Login_detail">
            <div class="Login_title">
                <p class="shou" @click='top_click(index)' :class='{p_hov:titleindex==index}' v-for='(item,index) in title' v-bind:key="index">{{item}}</p>
            </div>
            <div class="Login_regiser">
                <div class="Login_regiser_bottom">
                    <p class="Login_regiser_bottom_title">请选择身份</p>
                    <div class='Login_regiser_bottom_center'>
                        <div class="shou" @click='top_regiser(1)'>
                            <img src="../assets/images/user.png">
                            <p>我是个人会员，请点此注册</p>
                            <p>成为个人会员，可以对商家/机构发表评分及点评可向商家/机构提交在线咨询，即时获得回复</p>
                        </div>
                        <div class="shou" @click='top_regiser(2)'>
                            <img src="../assets/images/qiye.png">
                            <p>我是代理人，请点此注册</p>
                            <p>开通机构网站，开通网上商铺，发布机构动态，促销资讯申请机构认证，能提高信誉，机构排名更靠前，让您获得更高关注</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
        title: ['用户登录', '用户注册', '找回密码'],
        titleindex:1,
        // 微信登录
        wxUnionid:'',
        wxOpenid:'',
        // qq登录
        qqUnionid:'',
        qqOpenid:'',
        // 方式
        state:'',
    }
  },
    methods: {
        indexBtn(){
            this.$router.push({name:'index'})
        },
        top_click(index) {
            if(index==0){
                this.$router.push({name:'login'})
            }
            if(index==1){
                this.$router.push({name:'zhuc'})
            }
            if(index==2){
                this.$router.push({name:'zhmima'})
            }
        },
        top_regiser(id) {
            if(id==1){
                this.$router.push({name:'zhucgr',query:{wxUnionid:this.wxUnionid,wxOpenid:this.wxOpenid,qqUnionid:this.qqUnionid,qqOpenid:this.qqOpenid,state:this.state}})
            }
            if(id==2){
                this.$router.push({name:'zhucsj',query:{wxUnionid:this.wxUnionid,wxOpenid:this.wxOpenid,qqUnionid:this.qqUnionid,qqOpenid:this.qqOpenid,state:this.state}})
            }
        }
    },
    created(){
        console.log(this.$route.query)
        // 
        if(this.$route.query.state=='wx'){
            this.state=this.$route.query.state
            var datawx={
                    code:this.$route.query.code,
                }
            this.$http('/threePartLogin/wxLogin','get',datawx,'').then(
                res=>{
                    console.log(res)
                    if(res.data.code==100){
                        this.$store.commit('ADD_COUNT',res.data.data)
                        this.$router.push({name:'index'})
                    }
                    if(res.data.code==103){
                        this.wxUnionid=res.data.data[0]
                        this.wxOpenid=res.data.data[1]
                        console.log(this.wxUnionid)
                        console.log(this.wxOpenid)
                    }
                    if(res.data.code==104){
                        console.log(132)
                    }
                },
            )
        }
        if(this.$route.query.state=='qq'){
            this.state=this.$route.query.state
            // return
            var dataQQ=this.qs.stringify({
                code:this.$route.query.code,
            })
            this.$http('/threePartLogin/getQQToken','post',dataQQ,'').then(
                res=>{
                    console.log(res)
                    if(res.data.code==100){
                        this.$store.commit('ADD_COUNT',res.data.data)
                        this.$router.push({name:'index'})
                    }
                    if(res.data.code==103){
                        this.qqUnionid=res.data.data[0]
                        this.qqOpenid=res.data.data[1]
                        console.log(this.qqUnionid)
                        console.log(this.qqOpenid)
                    }
                    if(res.data.code==104){
                        console.log(132)
                    }
                }
            )
        }
    }
}
</script>