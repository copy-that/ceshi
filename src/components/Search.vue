<template>
  <div class="search">
    <ul class="search_top">
      <li class="left">
        <img @click="showtop" class="img1" src="../assets/images/icon1.png" alt>
        <span @click="showtop" class="span">{{$store.state.city}}【切换分站】</span>
        <img @click="showtop" class="img2" src="../assets/images/icon2.png" alt>
        <ul class="search_demo" v-if="leftdisplay">
          <li v-for="(item,index) in citylist" v-bind:key="index">
            <span>{{item.provinceName}}</span>
            <span
              class="cityclass"
              :id="res.id"
              @click="show(index,res.id,cindex)"
              v-for="(res,cindex) in item.voList"
              v-bind:key="cindex"
            >{{res.name}}</span>
          </li>
        </ul>
      </li>
      <li class="form">
        <input type="text" placeholder="请输入标题或者编号" v-model="searchtext">
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
</template>

<script>
export default {
  data() {
    return {
      xzcityid: "",
      idAvtiveid: 0,
      city: "总站",
      leftdisplay: false,
      citylist: [],
      searchtext: ""
    };
  },
  mounted() {
    if (this.$store.state.city == null) {
    } else {
      this.city = this.$store.state.city;
    }
    this.idAvtiveid = this.$route.query.navid;
    console.log(this.$store.token);
    // 判断是否有token
    if (this.$store.state.token == null) {
      this.showText = !this.showText;
      this.showLogin = !this.showLogin;
    }
  },
  created() {
    this.$http("/otherInfo/getAreaList", "get", "", "").then(res => {
      if (res.data.code == 100) {
        console.log(res);
        this.citylist = res.data.data;
      }
    });
  },
  methods: {
    // 注册登录跳转
    resgbtn(type) {
      if (type == 2) {
        this.$router.push({ name: "login" });
      }
      if (type == 1) {
        this.$router.push({ name: "zhuc" });
      }
    },
    // 城市切换
    showtop() {
      this.leftdisplay = !this.leftdisplay;
    },
    show(index, id, cindex) {
      this.leftdisplay = !this.leftdisplay;
      this.city =
        this.citylist[index].voList[cindex] &&
        this.citylist[index].voList[cindex].name;
      this.$store.commit(
        "REMOVE_COUNT",
        this.citylist[index].voList[cindex] &&
          this.citylist[index].voList[cindex].name
      );
      this.$store.commit(
        "REMOVE_cityId",
        this.citylist[index].voList[cindex] &&
          this.citylist[index].voList[cindex].id
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
      this.$router.push({
        name: "searchindex",
        query: { searchValue: this.searchtext }
      });
    },
    recom(navid) {
      this.idAvtiveid = navid;
      this.$router.push({ name: `navlist${navid}`, query: { navid: navid } });
      // if (navid == 1) {
      //   this.$router.push({ name: "navlist1", query: { navid: navid } });
      // }
      // if (navid == 2) {
      //   this.$router.push({ name: "navlist2", query: { navid: navid } });
      // }
      // if (navid == 3) {
      //   this.$router.push({ name: "navlist3", query: { navid: navid } });
      // }
      // if (navid == 4) {
      //   this.$router.push({ name: "navlist4", query: { navid: navid } });
      // }
      // if (navid == 5) {
      //   this.$router.push({ name: "navlist5", query: { navid: navid } });
      // }
      // if (navid == 6) {
      //   this.$router.push({ name: "navlist6", query: { navid: navid } });
      // }
      // if (navid == 7) {
      //   this.$router.push({ name: "navlist7", query: { navid: navid } });
      // }
      // if (navid == 8) {
      //   this.$router.push({ name: "navlist8", query: { navid: navid } });
      // }
      // if (navid == 9) {
      //   this.$router.push({ name: "navlist9", query: { navid: navid } });
      // }
      // if (navid == 10) {
      //   this.$router.push({ name: "navlist10", query: { navid: navid } });
      // }
    }
  }
};
</script>

