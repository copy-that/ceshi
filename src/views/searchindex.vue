<template>
  <div>
    <!-- header -->
    <Header/>
    <!-- 搜索 -->
    <div class="search">
      <ul class="search_top">
        <li class="left">
        <img @click="showtop" class="img1" src="../assets/images/icon1.png" alt>
        <span @click="showtop" class="span">{{city}}【切换分站】</span>
        <img @click="showtop" class="img2" src="../assets/images/icon2.png" alt>
        <ul class="search_demo" v-if="leftdisplay">
          <li v-for="(item,index) in citylist" v-bind:key="index">
            <span>{{item.provinceName}}</span>
            <span class="cityclass" :id="res.id" @click="show(index,res.id,cindex)" v-for="(res,cindex) in item.voList" v-bind:key="cindex">{{res.name}}</span>
          </li>
        </ul>
      </li>
        <li class="form">
          <input type="text" placeholder="请输入区域、商圈或者编号" v-model="searchtext">
          <span @click="searchBtn">
            <img src="../assets/images/icon3.png" alt>
          </span>
        </li>
        <li class="right">
          <router-link :to="{ name: 'fabu'}" style="display:block">出租出售发布</router-link>
        </li>
      </ul>
      <ul class="search_bot">
        <li @click="recom(1)" :class="idAvtiveid ==1?'active':''">
          <a href="javascript:void(0)">
            <img src="../assets/images/nav_icon1.png" alt>
            <span>买住宅</span>
          </a>
        </li>
        <li @click="recom(2)" :class="idAvtiveid ==2?'active':''">
          <a href="javascript:void(0)">
            <img src="../assets/images/nav_icon2.png" alt>
            <span>买商铺</span>
          </a>
        </li>
        <li @click="recom(3)" :class="idAvtiveid ==3?'active':''">
          <a href="javascript:void(0)">
            <img src="../assets/images/nav_icon3.png" alt>
            <span>买办公</span>
          </a>
        </li>
        <li @click="recom(4)" :class="idAvtiveid ==4?'active':''">
          <a href="javascript:void(0)">
            <img src="../assets/images/nav_icon4.png" alt>
            <span>买厂房</span>
          </a>
        </li>
        <li @click="recom(5)" :class="idAvtiveid ==5?'active':''">
          <a href="javascript:void(0)">
            <img src="../assets/images/nav_icon5.png" alt>
            <span>新楼盘</span>
          </a>
        </li>
        <li @click="recom(6)" :class="idAvtiveid ==6?'active':''">
          <a href="javascript:void(0)">
            <img src="../assets/images/nav_icon1.png" alt>
            <span>租住宅</span>
          </a>
        </li>
        <li @click="recom(7)" :class="idAvtiveid ==7?'active':''">
          <a href="javascript:void(0)">
            <img src="../assets/images/nav_icon2.png" alt>
            <span>租商铺</span>
          </a>
        </li>
        <li @click="recom(8)" :class="idAvtiveid ==8?'active':''">
          <a href="javascript:void(0)">
            <img src="../assets/images/nav_icon3.png" alt>
            <span>租办公</span>
          </a>
        </li>
        <li @click="recom(9)" :class="idAvtiveid ==9?'active':''">
          <a href="javascript:void(0)">
            <img src="../assets/images/nav_icon4.png" alt>
            <span>租厂房</span>
          </a>
        </li>
        <li @click="recom(10)" :class="idAvtiveid ==10?'active':''">
          <a href="javascript:void(0)">
            <img src="../assets/images/nav_icon5.png" alt>
            <span>民宿酒店</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- main -->
    <!--内容-->
    <div class="navlist">
      <div class="navlist_bot">
        <ul class="title">
          <li class="name">喜买屋房源信息</li>
          <li class="tip">信息总数
            <span>{{numbars}}</span>，您知道吗？置顶发布的信息可使成功率提高5倍
          </li>
        </ul>
        <div class="infolist" v-for="(item,index) in infolist" v-bind:key="index">
          <router-link :to="{ name: 'navlistXq', query: { id: item.infoId}}">
            <ul class="img">
              <img :src="item.picUrl" alt>
              <li>{{item.picNum}}张</li>
            </ul>
            <ul class="text" style="width:700px;">
              <li class="name">{{item.title}}</li>
              <li class="add">
                <img src="../assets/images/icon4.png" alt>
                <span
                  v-if="item.infoType==1 || item.infoType==2 || item.infoType==9"
                >户型：{{item.homeType}}</span>
                <span v-if="item.infoType==10">档次：{{item.grade}}</span>
                <span v-if="item.infoType==10">配套：{{item.mating}}</span>
                <span v-else>面积：{{item.area}}㎡</span>
              </li>
              <li class="time">
                <img src="../assets/images/icon5.png" alt>
                <span>发布时间：{{item.time }}</span>
              </li>
              <li class="tally">
                <span class="y_tip" v-for="(res,index) in item.tagNames" v-bind:key="index">{{res}}</span>
              </li>
            </ul>
            <ul class="money" v-if="item.infoType==1" style="width:260px;text-align: center">
              <span>{{item.price }}</span>万元
            </ul>
            <ul class="money" v-if="item.infoType==2" style="width:260px;text-align: center">
              <span>{{item.price }}</span>元/月
            </ul>
            <ul class="money" v-if="item.infoType==3" style="width:260px;text-align: center">
              <span>{{item.price }}</span>万元
            </ul>
            <ul class="money" v-if="item.infoType==4" style="width:260px;text-align: center">
              <span>{{item.price }}</span>元/月
            </ul>
            <ul class="money" v-if="item.infoType==5" style="width:260px;text-align: center">
              <span>{{item.price }}</span>元/平米
            </ul>
            <ul class="money" v-if="item.infoType==6" style="width:260px;text-align: center">
              <span>{{item.price }}</span>元/平米·天
            </ul>
            <ul class="money" v-if="item.infoType==7" style="width:260px;text-align: center">
              <span>{{item.price }}</span>元/平米
            </ul>
            <ul class="money" v-if="item.infoType==8" style="width:260px;text-align: center">
              <span>{{item.price }}</span>元/平米·天
            </ul>
            <ul class="money" v-if="item.infoType==9" style="width:260px;text-align: center">
              <span>{{item.price }}</span>万元
            </ul>
            <ul class="money" v-if="item.infoType==10" style="width:260px;text-align: center">
              <span>{{item.price }}</span>元/天
            </ul>
          </router-link>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pagesize"
          :total="totalCount"
          prev-text="上一页"
          next-text="下一页"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
    <!-- 底部导航 -->
    <Indexnav/>
    <!-- 底部 -->
    <Footer/>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Search from "../components/Search.vue";
import Indexnav from "../components/Indexnav.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    Header,
    Search,
    Indexnav,
    Footer
  },
  name: "searchindex",
  data() {
    return {
      numbars: "",
      infolist: [],
      totalCount: 0,
      page: 1,
      pagesize: 10,
      xzcityid: "",
      idAvtiveid: 0,
      city: "总站",
      leftdisplay: false,
      citylist: [],
      searchtext: ""
    };
  },
  mounted() {
    console.log(this.$store.state);
    if (this.$store.state.city == null) {
    } else {
      this.city = this.$store.state.city;
    }
    this.idAvtiveid = this.$route.query.navid;
  },
  methods: {
    currentChange(pages) {
      console.log(pages);
      var data = this.qs.stringify({
        page: pages,
        pageSize: 10,
        siteId: this.$store.state.cityId,
        searchValue: this.searchtext
      });
      this.$http("/app/rendInfoApi/search", "post", data, "").then(res => {
        if (res.data.code == 100) {
           this.totalCount = Math.ceil(res.data.data.total/this.pagesize) * 10;
          this.infolist = res.data.data.data;
        }
      });
    },
    showtop() {
      this.leftdisplay = !this.leftdisplay;
    },
    show(index, id,cindex) {
      this.leftdisplay = !this.leftdisplay;
      this.city = this.citylist[index].voList[cindex] && this.citylist[index].voList[cindex].name;
      this.$store.commit(
        "REMOVE_COUNT",
        this.citylist[index].voList[cindex] && this.citylist[index].voList[cindex].name
      );
      this.$store.commit(
        "REMOVE_cityId",
        this.citylist[index].voList[cindex] && this.citylist[index].voList[cindex].id
      );
      // chrome
      document.body.scrollTop = 0;
      // firefox
      document.documentElement.scrollTop = 0;
      // safari
      window.pageYOffset = 0;
      location.reload();
    },
    searchBtn() {
      this.$store.state.searchValue = this.searchtext;
      console.log(this.$route.query);
      var data = this.qs.stringify({
        page: this.page,
        pageSize: 10,
        siteId: this.$store.state.cityId,
        searchValue: this.searchtext
      });
      this.$http("/app/rendInfoApi/search", "post", data, "").then(res => {
        if (res.data.code == 100) {
          console.log(res.data.data.total);
          this.numbars = res.data.data.total;
          this.totalCount = Math.ceil(res.data.data.total/this.pagesize) * 10;
          this.infolist = res.data.data.data;
        }
      });
    },
    recom(navid) {
      this.idAvtiveid = navid;
      if (navid == 1) {
        this.$router.push({ name: "navlist1", query: { navid: navid } });
      }
      if (navid == 2) {
        this.$router.push({ name: "navlist2", query: { navid: navid } });
      }
      if (navid == 3) {
        this.$router.push({ name: "navlist3", query: { navid: navid } });
      }
      if (navid == 4) {
        this.$router.push({ name: "navlist4", query: { navid: navid } });
      }
      if (navid == 5) {
        this.$router.push({ name: "navlist5", query: { navid: navid } });
      }
      if (navid == 6) {
        this.$router.push({ name: "navlist6", query: { navid: navid } });
      }
      if (navid == 7) {
        this.$router.push({ name: "navlist7", query: { navid: navid } });
      }
      if (navid == 8) {
        this.$router.push({ name: "navlist8", query: { navid: navid } });
      }
      if (navid == 9) {
        this.$router.push({ name: "navlist9", query: { navid: navid } });
      }
      if (navid == 10) {
        this.$router.push({ name: "navlist10", query: { navid: navid } });
      }
    }
  },
  created() {
    this.$http("/otherInfo/getAreaList", "get", "", "").then(res => {
      if (res.data.code == 100) {
        // console.log(res)
        this.citylist = res.data.data;
      }
    });
    console.log(this.$route.query);
    var data = this.qs.stringify({
      page: this.page,
      pageSize:10,
      siteId: this.$store.state.cityId,
      searchValue: this.$route.query.searchValue
    });
    this.$http("/app/rendInfoApi/search", "post", data, "").then(res => {
      if (res.data.code == 100) {
        console.log(res.data.data.total);
        this.numbars = res.data.data.total;
        this.totalCount = Math.ceil(res.data.data.total/this.pagesize) * 10;
        console.log(this.totalCount)
        this.infolist = res.data.data.data;
      }
    });
  }
};
</script>
<style>
.el-pagination {
  float: right;
  margin-top: 50px;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #f76617 !important;
  color: #fff !important;
}
.el-pager li:hover {
  color: #f76617 !important;
}
.el-pager li:hover.active {
  color: #fff !important;
}
.btn-prev {
  padding: 0 5px !important;
}
.btn-next {
  padding: 0 5px !important;
}
</style>