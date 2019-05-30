<template>
  <div class="bdsharebuttonbox">
    <!-- <a v-for="item in defaultConfig.shareList" :key="item.id" :class="'bds_'+item" :data-cmd="item"></a> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // defaultConfig: {
      //   shareList: ['more','qzone','tsina','tqq','renren','weixin'],
      //   share: [{bdSize: 24}],
      //   slide: false,
      //   image: false,
      //   selectShare: false
      // }
    }
  },
  // props: ['shareConfig'],
  // beforeCreate(){
  //   window._bd_share_main = ''; 
  // },
  // mounted () {
  //   console.log(this.shareConfig)
  //   if (this.shareConfig) {
  //     this.shareConfig.shareList ? this.defaultConfig.shareList = this.shareConfig.shareList :'';
  //     if (this.shareConfig.shareList) {
  //     }
  //     if (this.shareConfig.share) {
  //       this.defaultConfig.share = this.shareConfig.share
  //     }
  //     if (this.shareConfig.slide) {
  //       this.defaultConfig.slide = this.shareConfig.slide
  //     }
  //     if (this.shareConfig.image) {
  //       this.defaultConfig.image = this.shareConfig.image
  //     }
  //     if (this.shareConfig.selectShare) {
  //       this.defaultConfig.selectShare = this.shareConfig.selectShare
  //     }
  //   }
  //   window._bd_share_config = this.defaultConfig
  //   document.getElementsByTagName('body')[0].appendChild(document.createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='
  // }
}
</script>
<style>
/* .bds_more{
  margin-left: 50px !important;
}
.bd_weixin_popup{
  position: fixed!important;
  top: 50%!important;
  left: 50%!important;
  margin-top: -150px;
  margin-left: -120px;
} */
</style>
