<template>
 <div class="comments">
   <nav><i class="iconfont icon-xiangqian" @click = 'goBack'></i>{{extraData.comments}}条评论</nav>
   <div class="comments-wrapper">
      <h2 @click ="showLongDetail">{{extraData.long_comments}}条长评论
         <i class="iconfont icon-xiangxia" v-if='isShowLongDetail'></i>
         <i class="iconfont icon-xiangshang" v-else></i>
      </h2>
      <ul v-if="isShowLongDetail">
        <li v-for = "item in extraLongData.comments" class="comment-one clearfix">
          <img :src="item.avatar" alt="" class="avatar">
          <div class="comment-text">
            <p><span>{{item.author}}</span><span>{{item.likes}}</span></p>
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
      <h2 @click ="showShortDetail">{{extraData.short_comments}}条短评论
        <i class="iconfont icon-xiangxia" v-if='isShowShortDetail'></i>
        <i class="iconfont icon-xiangshang" v-else></i>
      </h2>
      <ul v-if="isShowShortDetail">
        <li v-for = "item in extraShortData.comments" class="comment-one clearfix">
          <img :src="item.avatar" alt="" class="avatar">
          <div class="comment-text">
            <p><span>{{item.author}}</span><span>{{item.likes}}</span></p>
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
   </div>
 </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
  export default {
    name: 'detail',
    data () {
      return {
        msg: 'Welcome to Your comments',
        extraData:'',
        extraLongData:'',
        isShowLongDetail:true,
        extraShortData:'',
        isShowShortDetail:false
      }
    },
    created() {
      this.fetchComments()
      this.fetchLongComments()
      this.fetchShortComments()
    },
    methods:{
            // 获取知乎某个id新闻详情的长短评论数量
            fetchComments:function (){
              axios.get('api/story-extra/'+this.$route.params.id)
              .then((response)=>{
                this.extraData = response.data
              })
              .catch((error)=>{
                console.log(error);
              })
            },
            // 获取知乎某个id新闻详情的长评论详情
            fetchLongComments:function (){
              axios.get('api/story/'+this.$route.params.id+'/long-comments')
              .then((response)=>{
                console.log(response)
                this.extraLongData = response.data
              })
              .catch((error)=>{
                console.log(error);
              })
            },
            goBack:function(){
              router.go(-1)
            },
            showLongDetail:function(){
             this.isShowLongDetail = !this.isShowLongDetail
            },
           // 获取知乎某个id新闻详情的短评论详情
            fetchShortComments:function (){
              axios.get('api/story/'+this.$route.params.id+'/short-comments')
              .then((response)=>{
                console.log(response)
                this.extraShortData = response.data
              })
              .catch((error)=>{
                console.log(error);
              })
            },
            showShortDetail:function(){
               this.isShowShortDetail = !this.isShowShortDetail
            }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav{
  height: 1.25rem;
  background: #028fd6;
  font-size: 0.625rem;
  text-align: center;
  line-height: 1.25rem;
  color: #fff;
  position: relative;
}
.icon-xiangqian {
  font-size: 0.78125rem;
  position: absolute;
  left: 0;
  top:0;
}
.comments-wrapper h2{
  font-size: 0.375rem;
  line-height: 1.25rem;
  background: #fff;
  padding-left: 0.3125rem;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.comments-wrapper i {
  font-size: 0.46875rem;
  position: absolute;
  right: 0.3125rem;
  top:0;
}
.avatar {
  float: left;
  border-radius: 50%;
  width: 1.0625rem;
  height: 1.0625rem;
}
.avatar img{
  width: 100%;
}
.comment-text {
  float: left;
}
.comment-one {
  padding: 0 0.15625rem;
}
.comment-text {
  width: 7.8125rem;
  margin-left: 0.15625rem;
}
</style>
