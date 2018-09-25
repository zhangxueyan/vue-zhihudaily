<template>
  <div class="detail">
     <div class="detail-top">
      <img :src="detailOne.image" alt="">
      <p class="detail-title">{{detailOne.title}}</p>
     </div>
     <div v-html="detailOne.body"></div>
     <div class="fot-nav">
      <i class="iconfont icon-xiangqian" @click = "goBack"></i>
      <!-- <i class="iconfont icon-xianghou" @click ="goNext"></i> -->
      <i class="iconfont icon-dianzan" @click = "toggleZan" :class="{active:isZan}">
        <em>{{extraData.popularity}}</em>
      </i>
      <i class="iconfont icon-fenxiang" @click = 'isShowShareBox = true,isMask= true'></i>
      <i class="iconfont icon-pinglun" @click = "goComments"><em>{{extraData.comments}}</em></i>
    </div>

    <!-- 分享面板 -->
    <div class="share-box" v-if="isShowShareBox">
       <h2>分享这篇内容</h2>
       <div>
         <span>微信好友</span>
         <span>微信朋友圈</span>
         <span>QQ好友</span>
         <span>新浪微博</span><br>
         <span>复制链接</span>
         <span>印象笔记</span>
         <span>腾讯微博</span>
         <span>有道笔记</span>
       </div>
       <div class="share-btns">
           <p class="collect" v-if="isCollect" @click = "isCollect = false">取消收藏</p>
           <p class="collect" v-else @click = "isCollect = true">收藏</p>
           <p class="cancel" @click = 'isShowShareBox = false,isMask=false'>取消</p>
       </div>
    </div>
    <!--mask-->
    <div class="mask" v-if='isMask' @click = 'isShowShareBox = false,isMask=false'></div>

  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
  export default {
    name: 'detail',
    props:['transitionVariable'],
    data () {
      return {
        msg: 'Welcome to Your detail',
        detailOne:'',
        isZan:false,
        extraData:'',
        isShowShareBox:false,
        isCollect:false,
        isMask:false
      }
    },
    created() {
      this.fetchData()
      this.fetchExtraData()
    },
    methods:{
            // 获取知乎最新新闻数据列表和滚动swiper数据
            fetchData:function (){
              axios.get('api/news/'+this.$route.params.id)
              .then((response)=>{
                this.detailOne = response.data
                console.log(response.data)
                console.log(this.$route.params.id)
              })
              .catch((error)=>{
                console.log(error);
              })
            },
            goNext(){
            router.push({ name: 'detail', params: { id: this.$store.state.nextId }})
            },
            goBack:function(){
              router.go(-1)
            },
            toggleZan:function(){
              
              if(this.isZan == false){
                this.extraData.popularity ++
              }
              else{
                this.extraData.popularity--
              }
              this.isZan = !this.isZan
            },
             // 获取知乎新闻额外信息
            fetchExtraData:function(){
              axios.get('api/story-extra/'+this.$route.params.id)
              .then((response)=>{
                this.extraData = response.data
              })
              .catch((error)=>{
                console.log(error);
              })
            },
            // 跳转到评论页面
            goComments:function(){
             router.push({ name: 'comments', params: { id: this.$route.params.id }})
            }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail{
  font-size:0.34375rem;
  line-height: 0.9375rem;
  text-align: center;
}
.detail-top {
  position: relative;
}
.detail-title {
    position: absolute;
    width: 100%;
    line-height: 0.625rem;
    font-size: 24px;
    text-align: center;
    left: 0;
    bottom: 0.625rem;
    color: #fff;
}
.fot-nav {
  width: 10rem;
  height: 0.9375rem;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
}
.iconfont {
  font-size: 0.78125rem;
  padding:0 0.1rem;
}
.icon-dianzan.active{
  color:red;
}
.icon-dianzan,.icon-pinglun{
  position: relative;
}
.icon-dianzan em,.icon-pinglun em{
    font-style: normal;
    font-size: 0.375rem;
    width: 0.625rem;
    height: 0.625rem;
    position: absolute;
    right: -0.390625rem;
    top: -0.3125rem;
    color: red;
}
.icon-fenxiang {
  margin-left: 0.3125rem;
}
.share-box {
  width: 10rem;
  padding: 0.3125rem;
  background-color: #e9e9e9;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 15;
}
.collect,.cancel{
  background: #fff;
  margin-top: 0.15625rem;
}
.share-btns {
  padding: 0 0.3125rem;
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
</style>
