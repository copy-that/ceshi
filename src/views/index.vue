<template>
  <div class="page">
    <!-- 两侧 轮播 广告 -->
    <div class="y_guanggao left"  v-if="backgroundDiv1.length !=0">
      <div class="carb-top">广告</div>
      <div class="carb-bot">广告</div>
      <swiper :options="swiperOption" ref="mySwiper1" class="y_guanggao-inner">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in backgroundDiv1" :key="index">
            <a
                target="_blank"
                :href="item.jumpUrl"
                class="y_glink"
              
              >
              <img :src="item.picUrl" alt="">
              </a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
    <div class="y_guanggao right"  v-if="backgroundDiv2.length !=0">
      <div class="carb-top">广告</div>
      <div class="carb-bot">广告</div>
      <swiper :options="swiperOption" ref="mySwiper2" class="y_guanggao-inner">
        <swiper-slide v-for="(item,index) in backgroundDiv2" :key="index">
           <a
              target="_blank"
              :href="item.jumpUrl"
              class="y_glink"
            
            >
            <img :src="item.picUrl" alt="">
            </a>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      </div>
    <!--banner-->
    <ul class="banner">
        <swiper :options="swiperOption" ref="mySwiper" style="height:475px">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in backgroundDiv" :key="index">
           <a
              target="_blank"
              :href="item.jumpUrl"
              class="banner_img"
             :style="{backgroundImage: 'url('+ item.picUrl +')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}"
            >
            </a>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>

      <!-- <li class="banner_text">房主租售 · 中介代理 · 楼盘推广 · 民宿酒店</li> -->
    </ul>
    <ul class="y_login" v-if="showText">
      <li>
        <span class="right1">欢迎回来，{{nickname}}</span>
        <span class="right2" @click="personbtn">用户中心</span>
        <span class="right2" @click="quitbtn">退出</span>
      </li>
    </ul>
    <ul class="y_type" v-if="showLogin">
      <li>
        <span @click="resgbtn(1)">注册</span>
        <span @click="resgbtn(2)">登录</span>
      </li>
    </ul>
    <!-- 搜索 -->
    <Search/>
    <!--  喜买屋公告 -->
    <div class="marquee">
      <div class="marquee_title">
        <span>喜买屋公告</span>
      </div>
      <div class="marquee_box">
        <ul class="marquee_list" :class="{marquee_top:animate}">
          <li v-for="(item,index) in marqueeList" v-bind:key="index">{{item.noticeMsg}}</li>
        </ul>
      </div>
    </div>
    <!--头条 新闻-->
    <div class="index_main" style="margin-top:10px;">
      <div class="left">
        <ul class="title">头条置顶</ul>
        <ul class="list">
          <li v-for="(item,index) in headlines" v-bind:key="index">
            <router-link :to="{ name: 'navlistXq', query: { id: item.id }}">· {{item.title}}</router-link>
          </li>
          <li class="page_btn">
            <span @click="prevBtn">上一页</span>
            <span @click="nextBtn">下一页</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <ul class="title">
          <li @click="tabbtn(1)" v-bind:class="{active:active}">网站新闻</li>
          <li @click="tabbtn(2)" v-bind:class="{active:!active}">网站公告</li>
        </ul>
        <ul class="list">
          <li v-for="(item,index) in newslist" v-bind:key="index">
            <router-link :to="{ name: 'newsXq', query: { id: item.id }}">
              <span class="name">· {{item.msgName}}</span>
              <span class="time">{{item.createTime}}</span>
            </router-link>
          </li>
          <li class="page_btn">
            <span @click="prevBtnLeft">上一页</span>
            <span @click="nextBtnLeft">下一页</span>
          </li>
        </ul>
      </div>
    </div>
    <div style="width:1200px;height:36px;margin:40px auto">
      <ul style="float:right;">
        <Share/>
      </ul>
    </div>
    <!-- 底部导航 -->
    <!-- <Indexnav/> -->
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
import Search from "../components/Search.vue";
import Indexnav from "../components/Indexnav.vue";
import Footer from "../components/Footer.vue";
import Share from "../components/Share.vue";
import Swiper from 'swiper'; 
import 'swiper/dist/css/swiper.min.css';
import axios from "axios";
export default {
  components: {
    Search,
    Indexnav,
    Footer,
    Share
  },
  name: "index",
  data() {
    return {
      swiperOption:{
        loop: true,
        autoplay:{
          delay:6000
        },
        pagination: {
            el: '.swiper-pagination',
            clickable:true
        }
      },
      // 公告
      animate: false,
      marqueeList: [],
      tipbox: false,
      textmsg: "",
      page: 1,
      page1: 1,
      page2: 1,
      // banner
      backgroundDiv: [],
      backgroundDiv1:[],
      backgroundDiv2:[],
      //
      active: true,
      // 头条置顶
      headlines: [],
      //新闻
      newslist: [],
      // 注册登录
      showText: true,
      showLogin: false,
      nickname: ""
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    swiper1() {
      return this.$refs.mySwiper.swiper1
    },
    swiper2() {
      return this.$refs.mySwiper.swiper2
    },
  },
  mounted() {
    //   this.newszx()
    console.log(this.$store.state.token);
    // 判断是否有token
    if (this.$store.state.token == null || this.$store.state.token == "") {
      this.showText = !this.showText;
      this.showLogin = !this.showLogin;
    } else {
      this.$http(
        "/app/newPartApi/getNickName",
        "post",
        "",
        this.$store.state.token
      ).then(res => {
        console.log(res);
        if (res.data.code == 100) {
          this.nickname = res.data.data;
        }
        if (res.data.code == 102) {
          this.showText = !this.showText;
          this.showLogin = !this.showLogin;
          // this.$store.state.token =''
          this.$store.commit("ADD_COUNT", "");
          // this.$router.push({name:'login'})
        }
      });
    }
  },
  methods: {
    IPGet() {
      var that = this;
      if (localStorage.getItem("city")) {
        this.GetD();
        return;
      }
      $.ajax({
        type: "get",
        url: "https://api.map.baidu.com/location/ip",
        data: {
          output: "json",
          // ak:'E12Fa1o1rpK9GiadGhvG6ObeVjlGTsw5',
          ak: "wLPpSzY4Qhtzb8R19fAksW3MkKG0BOjd"
        },
        dataType: "jsonp",
        success: function(res) {
          console.log(res);
          var datz = that.qs.stringify({
            proName: res.content.address_detail.province,
            cityName: res.content.address_detail.city
          });
          var zz = res.content.address_detail.city;
          that
            .$http("/app/newPartApi/homePosition", "post", datz, "")
            .then(params => {
              console.log(params);
              if (params.data.code == 100) {
                that.$store.commit("REMOVE_COUNT", zz);
                that.$store.commit("REMOVE_cityId", params.data.data);
                that.GetD();
              }
            });
        }
      });
    },
    GetD() {
      setInterval(this.showMarquee, 2000);
      var data1 = this.qs.stringify({
        page: 1,
        pageSize: 6,
        station: this.$store.state.cityId
        //   type:0,
      });
      this.$http("/app/newPartApi/topMsg", "post", data1, "").then(res => {
        if (res.data.code == 100) {
          console.log(res);
          this.headlines = res.data.data;
        }
      });
      var data2 = this.qs.stringify({
        page: 1,
        pageSize: 6,
        type: 1
      });
      this.$http("/pc/homePcMsg/msgList", "post", data2, "").then(res => {
        if (res.data.code == 100) {
          console.log(res);
          this.newslist = res.data.data;
        }
      });
      var data3 = {
        type: 2
      };
      this.$http("/otherInfo/getSowingMap", "get", data3, "").then(res => {
        if (res.data.code == 100) {
          console.log(res);
          this.backgroundDiv = res.data.data;
        }
      });

      this.$http("/otherInfo/getSowingMap", "get", {
        type: 3
      }, "").then(res => {
        if (res.data.code == 100) {
          console.log(res);
          this.backgroundDiv1 = res.data.data;
        }
      });

      this.$http("/otherInfo/getSowingMap", "get", {
        type: 4
      }, "").then(res => {
        if (res.data.code == 100) {
          console.log(res);
          this.backgroundDiv2 = res.data.data;
        }
      });

      this.$http("/app/newPartApi/getHomeNotice", "get", "", "").then(res => {
        if (res.data.code == 100) {
          console.log(res);
          this.marqueeList = res.data.data;
        }
      });
    },
    closebtn() {
      this.tipbox = !this.tipbox;
    },
    //   上一页
    prevBtn() {
      var page = this.page - 1;
      if (page == 0) {
        (this.tipbox = true), (this.textmsg = "已经是第一页了！");
      } else {
        var data = this.qs.stringify({
          page: page,
          pageSize: 6,
          station: this.$store.state.cityId
        });
        this.$http("/app/newPartApi/topMsg", "post", data, "").then(res => {
          if (res.data.code == 100) {
            this.page = this.page - 1;
            this.headlines = res.data.data;
          }
        });
      }
    },
    //   下一页
    nextBtn() {
      var page = this.page + 1;
      var data = this.qs.stringify({
        page: page,
        pageSize: 6,
        station: this.$store.state.cityId
      });
      this.$http("/app/newPartApi/topMsg", "post", data, "").then(res => {
        console.log(res);
        if (res.data.code == 100) {
          if (res.data.data.length !== 0) {
            this.page = this.page + 1;
            this.headlines = res.data.data;
          }
          if (res.data.data.length == 0) {
            (this.tipbox = true), (this.textmsg = "已经是最后一页了！");
          }
        }
      });
    },
    //   上一页
    prevBtnLeft() {
      if (this.active == true) {
        console.log(1);
        var page1 = this.page1 - 1;
        if (page1 == 0) {
          (this.tipbox = true), (this.textmsg = "已经是第一页了！");
        } else {
          var data2 = this.qs.stringify({
            page: page1,
            pageSize: 6,
            type: 1
          });
          this.$http("/pc/homePcMsg/msgList", "post", data2, "").then(res => {
            if (res.data.code == 100) {
              console.log(res);
              this.page1 = this.page1 - 1;
              this.newslist = res.data.data;
            }
          });
        }
      } else {
        console.log(2);
        var page2 = this.page2 - 1;
        if (page2 == 0) {
          (this.tipbox = true), (this.textmsg = "已经是第一页了！");
        } else {
          var data3 = this.qs.stringify({
            page: page2,
            pageSize: 6,
            type: 1
          });
          this.$http("/pc/homePcMsg/msgList", "post", data3, "").then(res => {
            if (res.data.code == 100) {
              console.log(res);
              this.page1 = this.page2 - 1;
              this.newslist = res.data.data;
            }
          });
        }
      }
    },
    //   下一页
    nextBtnLeft() {
      if (this.active == true) {
        var page1 = this.page1 + 1;
        var data2 = this.qs.stringify({
          page: page1,
          pageSize: 6,
          type: 1
        });
        this.$http("/pc/homePcMsg/msgList", "post", data2, "").then(res => {
          if (res.data.code == 100) {
            console.log(res);
            if (res.data.data.length !== 0) {
              this.page1 = this.page1 + 1;
              this.newslist = res.data.data;
            }
            if (res.data.data.length == 0) {
              (this.tipbox = true), (this.textmsg = "已经是最后一页了！");
            }
          }
        });
      } else {
        var page2 = this.page2 + 1;
        var data3 = this.qs.stringify({
          page: page2,
          pageSize: 6,
          type: 2
        });
        this.$http("/pc/homePcMsg/msgList", "post", data3, "").then(res => {
          if (res.data.code == 100) {
            console.log(res);
            if (res.data.data.length !== 0) {
              this.page2 = this.page2 + 1;
              this.newslist = res.data.data;
            }
            if (res.data.data.length == 0) {
              (this.tipbox = true), (this.textmsg = "已经是最后一页了！");
            }
          }
        });
      }
    },
    personbtn() {
      this.$router.push({ name: "personzl", query: { type: 10 } });
    },
    quitbtn() {
      this.$store.commit("ADD_COUNT", "");
      console.log(this.$store.token);
      location.reload();
    },
    // 注册登录跳转
    resgbtn(type) {
      if (type == 2) {
        this.$router.push({ name: "login" });
      }
      if (type == 1) {
        this.$router.push({ name: "zhuc" });
      }
    },
    tabbtn: function(index) {
      if (index == 1) {
        this.active = true;
        var data2 = this.qs.stringify({
          page: 1,
          pageSize: 6,
          type: 1
        });
        this.$http("/pc/homePcMsg/msgList", "post", data2, "").then(res => {
          if (res.data.code == 100) {
            console.log(res);
            this.newslist = res.data.data;
          }
        });
      }
      if (index == 2) {
        this.active = false;
        var data2 = this.qs.stringify({
          page: 1,
          pageSize: 6,
          type: 2
        });
        this.$http("/pc/homePcMsg/msgList", "post", data2, "").then(res => {
          if (res.data.code == 100) {
            console.log(res);
            this.newslist = res.data.data;
          }
        });
      }
    },
    showMarquee: function() {
      this.animate = true;
      setTimeout(() => {
        this.marqueeList.push(this.marqueeList[0]);
        this.marqueeList.shift();
        this.animate = false;
      }, 500);
    }
  },
  created() {

    this.IPGet();
   
  }
};
</script>
<style lang="">
.y_login {
  width: 1200px;
  margin: auto;
  margin-top: 30px;
}
.y_login li {
  width: 100%;
  text-align: right;
  font-size: 16px;
}
.y_login li span {
  margin-left: 20px;
}
.y_login li .right1 {
  color: #000;
  font-weight: 600;
}
.y_login li .right2 {
  cursor: pointer;
  color: #f76617;
}
.y_type {
  width: 1200px;
  margin: auto;
  margin-top: 30px;
}
.y_type li {
  width: 100%;
  text-align: right;
  font-size: 18px;
}
.y_type li span {
  cursor: pointer;
  margin-left: 20px;
}
.y_type li span:hover {
  color: #f76617;
}
.swiper-pagination-bullet-active{
  background: #ffffff;
}

.y_guanggao{
  position: relative;
  top: 557px;
  width: 1200px;
  margin:  0 auto;
  height: 0;
}


.y_guanggao-inner{
  border: 1px solid #D90F0F;
  position: absolute!important;
  width: 260px;
  height: 600px;
}

.y_guanggao.left .y_guanggao-inner{
  left: -310px;
}
.y_guanggao.right  .y_guanggao-inner{
  right: -310px;
}
.y_guanggao-inner img{
  width: 260px;
}

.carb-top{
  z-index: 2;
  position: absolute;
  color: #ffffff;
  padding-left: 20px;
  border-bottom-right-radius: 20px;
  top: 0;
  background-color: #D90F0F;
  height: 27px;
  line-height: 27px;
  width: 85px;
}
.y_guanggao.left .carb-top{
  left: -310px;
}
.y_guanggao.right .carb-top{
  right: -154px;
}
.carb-bot{
  z-index: 2;
  position: absolute;
  top: 570px;
  height: 20px;
  line-height: 20px;
  width: 40px;
  font-size: 12px;
  color: #DDDDDD;
  border:1px solid #E2E2E2;
  border-radius:2px;
  text-align: center;
}

.y_guanggao.left .carb-bot{
  left: -100px;
}
.y_guanggao.right .carb-bot{
  right: -300px;
}
</style>