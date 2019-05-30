<template>
    <div>
        <ul class="person_left">
            <li @click="personnav(1)" :class="personnavid ==1?'active':''"><a href="javascript:void(0)">我的预约</a></li>
            <li @click="personnav(2)" :class="personnavid ==2?'active':''"><a href="javascript:void(0)">我的发布</a></li>
            <li @click="personnav(3)" :class="personnavid ==3?'active':''"><a href="javascript:void(0)">看房历史</a></li>
            <li @click="personnav(4)" :class="personnavid ==4?'active':''"><a href="javascript:void(0)">我的收藏</a></li>
            <li @click="personnav(5)" :class="personnavid ==5?'active':''"><a href="javascript:void(0)">我的钱包</a></li>
            <li @click="personnav(6)" :class="personnavid ==6?'active':''"><a href="javascript:void(0)">个人认证</a></li>
            <li @click="personnav(7)" :class="personnavid ==7?'active':''"><a href="javascript:void(0)">消息通知</a></li>
            <li @click="personnav(8)" :class="personnavid ==8?'active':''"><a href="javascript:void(0)">问题反馈</a></li>
            <li @click="personnav(9)" :class="personnavid ==9?'active':''"><a href="javascript:void(0)">关于我们</a></li>
            <li @click="personnav(10)" :class="personnavid ==10?'active':''"><a href="javascript:void(0)">个人资料</a></li>
        </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      personnavid:1,
    }
  },
  mounted(){
      this.personnavid = this.$route.query.type?this.$route.query.type:this.personnavid
  },
  methods: {
    personnav(type){
        this.personnavid=type
        if(type==1){
            this.$router.push({name:'personyuyue', query: { type: type }})
        }
        if(type==2){
            this.$router.push({name:'personfabu', query: { type: type }})
        }
        if(type==3){
            this.$router.push({name:'personhis', query: { type: type }})
        }
        if(type==4){
            this.$router.push({name:'personsc', query: { type: type }})
        }
        if(type==5){
            this.$router.push({name:'personmoney', query: { type: type }})
        }
        if(type==6){
            this.$router.push({name:'personrz', query: { type: type }})
        }
        if(type==7){
            this.$router.push({name:'personxxtz', query: { type: type }})
        }
        if(type==8){
            this.$router.push({name:'personwt', query: { type: type }})
        }
        if(type==9){
            this.$router.push({name:'personabout', query: { type: type }})
        }
        if(type==10){
            this.$router.push({name:'personzl', query: { type: type }})
        }
    }
  }
}
</script>