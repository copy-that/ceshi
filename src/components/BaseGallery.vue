<template>
  <transition name="gallery">
    <div class="gallery-slideshow">
      <!-- <button class="gallery-slideshow__prev" @click.stop="onPrev">&lsaquo;</button> -->
      <div class="gallery-slideshow__container" v-if="images">
        <div class="gallery-slideshow__container__image">
          <img
            class="gallery-slideshow__container__image__img"
            @click.stop="onModal"
            :src="imageUrl+((video&&imgIndex==0)?'?x-oss-process=image/resize,w_690,h_400/watermark,size_20,text_5Zac5Lmw5bGL,color_ffffff':'')"
          >
        </div>
        <div class="play-dialog" v-if="video&&imgIndex==0" @click="playVideo">
            <img class="play-icon" src="../assets/images/play.png" alt="" v-if="!isplay" srcset="">
        </div>
        <div
          class="gallery-slideshow__gallery__title"
          v-if="images"
        >{{ imgIndex + 1 }} / {{ images.length }}</div>
      </div>
      <!-- <button class="gallery-slideshow__next" @click.stop="onNext">&rsaquo;</button> -->
      <div class="gallery-slideshow__gallery" ref="gallery">
        <div
          class="gallery-slideshow__gallery__container"
          v-if="images"
          :style="{ transform: 'translate(' + galleryXPos + 'px, 0)' }"
        >
          <img
            class="gallery-slideshow__gallery__container__img"
            v-for="(image, i) in images"
            :src="image"
            @click.stop="onClickThumb(image, i)"
            :key="i"
            :class="{ 'gallery-slideshow__gallery__container__img--active': i === imgIndex}"
          >
        </div>
      </div>
      
      <div class="gallery-modal" v-if="showModal">
          <div class="mask">
            <div class="big-top">
                <video class="big-top-img" 
                  :src="video" 
                 ref="videoplayer" v-if="video&&imgIndex==0" controls></video>
                <img v-else class="big-top-img" :src="imageUrl" alt="">
            </div>
            <div class="list">
                <div
                    class="gallery-slideshow__gallery__container"
                    v-if="images"
                    :style="{ transform: 'translate(' + galleryXPos + 'px, 0)' }"
                    >
                    <img

                        class="gallery-slideshow__gallery__container__img"
                        v-for="(image, i) in images"
                        :src="image"
                        @click.stop="onClickThumb(image, i)"
                        :key="i"
                        :class="{ 'gallery-slideshow__gallery__container__img--active': i === imgIndex}"
                    >
                </div>
            </div>
            <div class="vinum">{{ imgIndex + 1 }} / {{ images.length }}</div>
            <div  class="pic-left pa"  @click.stop="onPrev">
                <i class="icon"></i>
            </div>
            <div class="pic-right pa"  @click.stop="onNext">
                <i class="icon"></i>
            </div>
            <div class="close" @click.stop="showModal=false"></div>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["images", "index","video"],
  computed: {
    imageUrl() {
      return this.images[this.imgIndex];
    }
  },
  data() {
    return {
      isplay:false,
      showModal: false,
      imgIndex: this.index,
      image: null,
      galleryXPos: 0,
      thumbnailWidth: 140
    };
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if (e.keyCode === 37) {
        this.onPrev();
      }
      if (e.keyCode === 39) {
        this.onNext();
      }
    });
  },
  watch: {
    index(val) {
      this.imgIndex = val;
    }
  },
  methods: {
    playVideo(){
      this.showModal = true;
      this.$refs.videoplayer.play()
    },
    onModal(){
        if (this.imgIndex === null) return;
        this.showModal = true;
    },
    onPrev() {
      if (this.imgIndex === null) return;
      if (this.imgIndex > 0) {
        this.imgIndex--;
      } else {
        this.imgIndex = this.images.length - 1;
      }
      this.updateThumbails();
    },
    onNext() {
      if (this.imgIndex === null) return;
      if (this.imgIndex < this.images.length - 1) {
        this.imgIndex++;
      } else {
        this.imgIndex = 0;
      }
      this.updateThumbails();
    },
    onClickThumb(image, index) {
      this.imgIndex = index;
      this.updateThumbails();
    },
    updateThumbails() {
      if (!this.$refs.gallery) {
        return;
      }
      const galleryWidth = this.$refs.gallery.clientWidth;
      const currThumbsWidth = this.imgIndex * this.thumbnailWidth;
      const centerPos =
        Math.floor(galleryWidth / (this.thumbnailWidth * 2)) *
        this.thumbnailWidth;
      if (currThumbsWidth < centerPos) {
        this.galleryXPos = 0;
      } else if (
        currThumbsWidth >
        this.images.length * this.thumbnailWidth - galleryWidth + centerPos
      ) {
        this.galleryXPos = -(
          this.images.length * this.thumbnailWidth -
          galleryWidth
        );
      } else {
        this.galleryXPos = -(this.imgIndex * this.thumbnailWidth) + centerPos;
      }
    }
  }
};
</script>

<style lang="css">
.gallery-enter {
    opacity: 0;
}
.gallery-leave-active {
    opacity: 0;
}
.gallery-slideshow{
    position: relative;
    height: 540px;
    width: 690px;
    overflow: hidden;
}
.gallery-slideshow__container{
    height: 400px;
    width: 690px;
    position: relative;
}
.gallery-slideshow__container__image{
    height: 400px;
    width: 690px;
    background-color: #f7f7f7;
}
.gallery-slideshow__container__image__img{
    height: 400px;
    /* width: 690px; */
    display: block;
    margin: 0 auto;
}
.gallery-slideshow__gallery__title{
    position: absolute;
    background-color: rgba(0, 0, 0, .6);
    border-radius: 4px;
    padding: 3px 6px;
    color: #ffffff;
    font-size: 12px;
    right: 48%;
    bottom:10px;
}
.play-dialog{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6)
}
.play-icon{
    position: absolute;
    width: 50px;
    height: 50px;
    z-index: 10;
    left: 325px;
    bottom: 175px;
}
.gallery-slideshow__next,.gallery-slideshow__prev{
    position: absolute;
    top: 200px;
    height: 36px;
    width: 36px;
    background-color: rgba(31,45,61,.11);
    border: 0;
    padding: 0;
    margin: 0;
    border-radius: 100%;
}
.gallery-slideshow__gallery{
    width: 690px;
    height: 140px;
}
.gallery-slideshow__gallery__container{
    width: 690px;
    overflow: visible;
    height: 140px;
    white-space: nowrap;
    transition: all 200ms ease-in-out;
}
.gallery-slideshow__gallery__container__img{
    width:130px;
    height: 120px;
    display: inline-block;
    margin: 10px 10px 10px 0;
    background: #fff;
    opacity: .85;
}
.gallery-slideshow__gallery__container__img--active{
    opacity: 1;
}

.gallery-modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    background-color: rgba(0,0,0,0.85);
    height: 100%;
}
.mask{
    left: 0px;
    top: 1px;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 999999;
}
.big-top{
    position: relative;
    margin-top: 50px;
    margin-bottom: 20px;
    height: 70%;
    overflow: hidden;
}
.big-top-img{
    width: auto;
    height: auto;
    max-height: 100%;
    display: block;
    margin: 0 auto;
    border: 0;
}
.list{
    width: 690px;
    height: 140px;
    margin: 60px auto 0;
    overflow: hidden;
    bottom: 20px;
}

.close{
    position: absolute;
    width: 80px;
    height: 80px;
    top: 0;
    right: 0;
    display: inline-block;
    cursor: pointer;
    background: url(//img.58cdn.com.cn/ui8/house/detail/images/zufang-detail-icon.png) no-repeat center;
    background-size: auto 80px;
    background-position: -1488px 0;
}
.pa{
    width: 20%;
    height: 100%;
    position: absolute;
    top: 0;
}
.pic-left{
    left: 0;
}
.pic-right{
    right: 0;
}
.pic-right .icon{
    top: 50%;
    width: 28px;
    height: 50px;
    margin-top: -25px;
    display: block;
    background: url(//img.58cdn.com.cn/ui8/house/detail/images/zufang-detail-icon.png) no-repeat center;
    background-size: auto 80px;
    position: absolute;
    right: 50px;
    background-position: -2056px 0;
}

.pic-left .icon{
    top: 50%;
    width: 28px;
    height: 50px;
    margin-top: -25px;
    display: block;
    background: url(//img.58cdn.com.cn/ui8/house/detail/images/zufang-detail-icon.png) no-repeat center;
    background-size: auto 80px;
    position: absolute;
    left: 50px;
    background-position: -2092px 0;
}

.vinum{
    display: block;
    position: absolute;
    left: 50%;
    bottom: 175px;
    margin-left: -25px;
    width: 49px;
    height: 26px;
    line-height: 26px;
    color: #fff;
    background: #000;
    font-size: 12px;
    filter: alpha(opacity=50);
    -moz-opacity: .5;
    opacity: .5;
    text-align: center;
}
</style>