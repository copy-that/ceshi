<template>
    <div class="footer">
        <div class="footer_main">
            <div class="top">
                <ul class="left">
                    <li class="title">热门城市</li>
                    <li class="name">
                        <span v-for="(item,index) in fwlist" v-bind:key="index" @click="show(index,item.id)">{{item.name}}</span>
                    </li>
                </ul>
                <ul class="right">
                    <li class="title">客服：{{qqNumber}}</li>
                    <li class="img"><img :src="wxPicture" alt=""></li>
                    <li class="text">扫码添加微信</li>
                </ul>
            </div>
            <div class="bot">
                <ul class="bot_top">
                    <li><router-link :to="{ name: 'index'}">首页</router-link></li>
                    <li><router-link :to="{ name: 'navlist1',query:{navid:1}}">买房</router-link></li>
                    <li><router-link :to="{ name: 'navlist6',query:{navid:6}}">租房</router-link></li>
                    <li><router-link :to="{ name: 'navlist2',query:{navid:2}}">商铺</router-link></li>
                    <li><router-link :to="{ name: 'navlist3',query:{navid:3}}">写字楼</router-link></li>
                    <li><router-link :to="{ name: 'navlist4',query:{navid:4}}">厂房仓库</router-link></li>
                    <li><router-link :to="{ name: 'personzl', query: { type: 10 }}">个人中心</router-link></li>
                </ul>
                <ul class="bot_text">
                    <li> Processed in 0.091266 second(s) , 16 queries</li>
                    <li> 咨询热线：4000000956     网站备案号：闽ICP备16021783号     © 喜买屋房产网    微信公众号：喜买屋</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return{
            fwlist:[],
            qqNumber:'',
            wxNick:'',
            wxNumber:'',
            wxPicture:'',
        }
    },
    mounted(){
        var data=this.qs.stringify({
            cityId:this.$store.state.cityId
        })
        this.$http('/otherInfo/getFooterMsg','post',data,'').then(
        res=>{
            if(res.data.code==100){
                // console.log(res)
                this.fwlist=res.data.data.areaVos
                this.qqNumber=res.data.data.qqNumber
                this.wxNick=res.data.data.wxNick
                this.wxNumber=res.data.data.wxNumber
                this.wxPicture=res.data.data.wxPicture
              }
           },
        )
    },
    methods:{
        show(index,id) {
            console.log(index,id)
            this.$store.commit(
                "REMOVE_COUNT",
                this.fwlist[index] && this.fwlist[index].name
            );
            this.$store.commit(
                "REMOVE_cityId",
                this.fwlist[index] && this.fwlist[index].id
            );
            
             // chrome
            document.body.scrollTop = 0
            // firefox
            document.documentElement.scrollTop = 0
            // safari
            window.pageYOffset = 0
            location.reload()
        }
    }
}
</script>