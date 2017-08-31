<template>
  <div class="home">
    <!-- nav -->
    <nav><i class="iconfont icon-menu" @click = "showSlider"></i>今日新闻</nav>
    <swiper :options="swiperOption" ref="mySwiper" class="banner">
      <!-- slides -->
      <swiper-slide v-for = "item in top_stories" :key = "item.id">
       <router-link :to="{name:'detail',params:{id:item.id}}">
           <img :src="item.image" alt="">
           <p>{{item.title}}</p>
       </router-link>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <!-- news-list -->
    <h2>今日新闻</h2>
    <ul>
     <li v-for="item in stories" :key = "item.id" class="news clearfix">
     <router-link :to="{ name: 'detail', params: { id: item.id }}">
         <p>{{item.title}}</p>
         <img :src="item.images[0]" alt="">
       </router-link>
     </li>
    </ul>
    <!--sliderbar-->
    <div class="sliderbar"  v-if='isShowSidebar'>
      <div class="top-slide">
       <p class="clearfix">
          <span class="avatar"><img src="../assets/logo.png" alt=""></span>
          <span class="name">coral</span>
          <span class="back" @click = 'hideSlide'><i class="iconfont icon-fanhui"></i></span>
       </p>
        <div class="top-icons clearfix">
         <a href="javascript:;" class="no-ml" @click = "goCollect">
           <i class="iconfont icon-shoucang"></i>收藏
         </a>
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
    <div class="mask" v-if='isMask' @click = 'hideSlide'></div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapState,mapGetters,mapAction} from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your home',
      top_stories:'',
      stories:'',
      slideData:'',
      isShowSidebar:false,
      isMask:false,
      swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          pagination : '.swiper-pagination'
        }
    }
  },
   components: {
    swiper,
    swiperSlide
  },
  created() {
      this.fetchData()
      this.fetchSlideData()
    },
    methods:{
            // 获取知乎最新新闻数据列表和滚动swiper数据
            fetchData:function (){
              axios.get('api/news/latest')
              .then((response)=>{
                console.log(response)
                this.top_stories = response.data.top_stories
                this.stories = response.data.stories
              })
              .catch((error)=>{
                console.log(error);
              })
            },

            fetchSlideData:function (){
              axios.get('api/themes')
              .then((response)=>{
                // console.log(response)
                this.slideData = response.data.others
              })
              .catch((error)=>{
                console.log(error);
              })
            },
            showSlider:function(){
              this.isShowSidebar = true
              this.isMask = true
            },
            hideSlide:function(){
              this.isShowSidebar = false
              this.isMask = false
            },
            //跳转到收藏页面
            goCollect:function(){
              router.push({ name: 'collect'})
            }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  font-size: 0.625rem;
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
    font-size:0.625rem;
    line-height: 1.25rem;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0.3125rem;
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
  .name {
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
