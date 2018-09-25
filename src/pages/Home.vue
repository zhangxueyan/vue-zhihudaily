<template>
  <div class="home">
    <!-- nav -->
    <nav><i class="iconfont icon-menu" @click = "showSidebar"></i>今日新闻</nav>
    <swiper :options="swiperOption" ref="mySwiper" class="banner">
      <swiper-slide v-for = "item in top_stories" :key = "item.id">
        <router-link :to="{name:'detail',params:{id:item.id}}">
           <img :src="item.image" alt="">
           <p>{{item.title}}</p>
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <!-- newslist -->
    <ul v-for="item in list">
     <p class="test-titl">{{item.date}}</p>
     <li class="news clearfix" v-for=" x in item.stories" :key = "x.id">
       <router-link :to="{ name:'detail', params:{ id: x.id }}">
         <p>{{x.title}}</p>
         <img :src="x.images[0]" alt="">
       </router-link>
     </li>
    </ul>
    <div>
      <infinite-loading @infinite="onInfinite" ref="infiniteLoading">
        <loading slot="spinner"></loading>
      </infinite-loading>
    </div>
    <!-- newslist -->
    <!--sliderbar-->
    <div class="sliderbar"  v-if='isShowSidebar'>
      <div class="top-slide">
       <p class="clearfix">
          <span class="avatar"><img src="../assets/logo.png" alt=""></span>
          <span class="name">coral</span>
          <span class="back" @click = 'hideSidebar'><i class="iconfont icon-fanhui"></i></span>
       </p>
        <div class="top-icons clearfix">
         <router-link class="no-ml" :to="{name:'collect'}">
           <i class="iconfont icon-shoucang"></i>收藏
         </router-link>
         <a href="javascript:;">
           <i class="iconfont icon-xiaoxi"></i>消息
         </a>
         <a href="javascript:;">
           <i class="iconfont icon-shezhi"></i>设置
         </a>
        </div>
      </div>
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for = "item in slideData">
          <router-link :to="{ name: 'themeDetail', params: { id: item.id }}">
            {{item.name}}
          </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--mask-->
    <div class="mask" v-if='isMask' @click = 'hideSidebar'></div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapState,mapGetters,mapActions} from 'vuex'
import InfiniteLoading from 'vue-infinite-loading';
import Loading from '../components/Loading'

export default {
  name: 'home',
  data () {
    return {
      message:'helloworld',
      allIds:[],
      top_stories:'',
      list:[],
      count:0,
      slideData:'',
      isShowSidebar:false,
      isMask:false,
      swiperOption: {
          // autoplay: 3000,
          // initialSlide :2
      }
    }
  },
    computed:{
      ...mapState([
        'count2'
        ]),
      ...mapState({
        vcount:"count2"
      }),
      ...mapGetters({
        getCount2:"getCount2"
      })
  },
   components: {
    swiper,
    swiperSlide,
    InfiniteLoading,
    Loading
  },
  created() {
      this.fetchData()
      this.fetchThemeData()
    },
    methods:{
            // 获取知乎最新新闻数据列表和滚动swiper数据
            fetchData:function (){
              var _this =this;
              axios.get('api/news/latest')
              .then((response)=>{
                _this.top_stories = response.data.top_stories
                _this.list = [response.data];
              })
              .catch((error)=>{
                console.log(error);
              })
            },
            fetchThemeData:function (){
              axios.get('api/themes')
              .then((response)=>{
                this.slideData = response.data.others
              })
              .catch((error)=>{
                console.log(error);
              })
            },
            showSidebar:function(){
              this.isShowSidebar = true
              this.isMask = true
            },
            hideSidebar:function(){
              this.isShowSidebar = false
              this.isMask = false
            },
            onInfinite() {
              var _this = this;
              window.onscroll = function(){
                  var dh = document.body.scrollHeight||document.documentElement.scrollHeight;
                  var wh = document.documentElement.clientHeight;
                  var st = document.body.scrollTop||document.documentElement.scrollTop;

                  function getDateParams(num){
                     var nowDate = new Date();
                     var getDate = nowDate.getDate();
                     var newDate = new Date(nowDate.setDate(getDate-num));
                     var formatYear = newDate.getFullYear();
                     var formatMonth = newDate.getMonth()+1>=10?''+(newDate.getMonth()+1):'0'+ (newDate.getMonth()+1);
                     var formatDate = newDate.getDate()>=10?''+newDate.getDate():'0'+ newDate.getDate();
                     var formatTime = formatYear + formatMonth + formatDate;
                     return formatTime;
                  }

                  if (dh - st - wh == 0) {
                   setTimeout(function(){
                       axios.get('api/news/before/'+getDateParams(_this.count))
                       .then((response)=>{  
                        _this.list = _this.list.concat([response.data])
                        console.log(_this.list)
                        _this.list.forEach(function(item){
                         return item.stories.forEach(function(child){
                           _this.allIds = _this.allIds.concat(child.id)
                         })
                       })     
                      })
                       .catch((error)=>{
                        console.log(error);
                      })
                      _this.count++
                      console.log(getDateParams(_this.count))  
                   },2000)


                 }
              }
            },
            ...mapActions([
               'increase',
               'decrease'
            ])
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news-title{
  font-size:0.5rem;
  padding:0.1rem 0;
}
.no-ml {
  margin-left: 0!important;
}
.clearfix:after{
  content: "";
  display: block;
  clear: both;
}
nav {
  height: 0.9375rem;
  background: #00a2ea;
  line-height: 0.9375rem;
  font-size: 0.4rem;
  color: #fff;
  text-align: center;
  position: relative;
}
.icon-menu {
  font-size: 0.625rem;
  position: absolute;
  left: 0.46875rem;
  top:0;
}
.banner {
  height: 6.25rem;
  overflow: hidden;
}
.banner img{
  width:100%;
}
.banner a {
  display: block;
  position: relative;
  height: 100%;
}
.banner p{
  width:100%;
  color: #fff;
  font-size:0.4rem;
  background:rgba(0,0,0,0.5);
  padding: 0.3rem 0.1rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: absolute;
  left: 0;
  bottom:0;
}
.news {
  background: #fff;
  border: 1px solid #ccc;
  padding: 0.390625rem;
  margin-top: 0.15625rem;
}
.news p {
  width: 6.25rem;
  float: left;
}

.sliderbar {
  width: 6.0rem;
  height: 100%;
  background: #232a30;
  position: fixed;
  z-index: 15;
  left: 0;
  top:0;
  z-index: 100;
  padding: 3.59375rem 0.625rem 0;
  color: #fff;
  text-align: left;
}
.top-slide{
  width: 6rem;
  padding: 0.3125rem 0.625rem 0; 
  position: fixed;
  left: 0;
  top:0;
}
.top-slide p {
  font-size: 0.46875rem;
  text-align: left;
  line-height: 1.125rem;
}
.top-slide span{
  display: block;
  float: left;
}
.avatar{
  border-radius: 50%;
  background: rgb(255, 255, 255);
  width: 1.25rem;
  height: 1.25rem;
  overflow: hidden;
}
.avatar img{
  width: 100%;
}
.name{
  margin-left: 0.625rem;
  font-size: 0.625rem;
}
.back {
  float: right!important;
}
.back i{
  font-size: 0.78125rem;
}
.top-icons{
  margin: 0.3125rem 0 0.46875rem;
}
.top-icons a{
  display:block;
  float: left;
  width: 1.09375rem;
  height: 1.09375rem;
  font-size: 0.375rem;
  padding-top: 0.78125rem;
  color: #fff;
  line-height: 1.09375rem;
  text-align: center;
  position: relative;
  margin-left: 0.3125rem;
}
.top-icons i {
  font-size: 0.78125rem;
  position: absolute;
  left: 0.125rem;
  top:0;
}
.mask {
  width: 10rem;
  height: 100%;
  position: fixed;
  background: rgba(0,0,0,0.5);
  left: 0;
  top:0;
  z-index: 10;
}
.menu-wrapper{
 padding: 0 20px;
 flex: auto;
 overflow: auto;
}
.menu-wrapper li {
  font-size:0.375rem;
  line-height: 1.09375rem;
}
.menu-wrapper li a{
  display: block;
  color: #fff;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed;
  left:0;
  top:0;
  z-index: 10;
}
</style>
