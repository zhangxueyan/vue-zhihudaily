<template>
  <div class="themeDetail">
    <nav @click = "goBack"><i class="iconfont icon-xiangqian"></i>{{ themeDetail.name }}</nav>
    <div class="theme-first clearfix" @click = "goEdiorList">
      <p style="float:left;line-height:1.171875rem">主编</p>
      <ul class="clearfix" style="float:left">
        <li v-for="item in themeDetail.editors" class="editor-avatar">
         <img :src="item.avatar" alt="">
       </li>
     </ul>
     <i class="iconfont icon-xianghou"></i>
    </div>
    <ul class="theme-list">
      <li v-for = "item in themeDetail.stories" class="clearfix">
       <router-link :to="{ name: 'detail', params: { id: item.id }}">
           <p>{{item.title}}</p>
       </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  name: 'themeDetail',
  data () {
    return {
      msg: 'Welcome to Your themeDetail',
      themeDetail:''
    }
  },
      created() {
      this.fetchthemeData()
    },
    methods:{
            // 获取知乎主题页面的内容
            fetchthemeData:function (){
              axios.get('api/theme/'+this.$route.params.id)
              .then((response)=>{
                console.log(response)
                this.themeDetail = response.data
              })
              .catch((error)=>{
                console.log(error);
              })
            },
            goBack:function(){
              router.go(-1)
            },
            goEdiorList:function(){
              router.push({ name: 'editorList', params: { id: this.$route.params.id }})
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
.editor-avatar {
  width: 1.171875rem;
  height: 1.171875rem;
  border-radius: 50%;
  float: left;
  overflow: hidden;
  margin-left: 0.15625rem;
}
.editor-avatar img{
  width: 100%;
}
.theme-first {
  padding: 0.15625rem 0.3125rem;
  position: relative;
  border-bottom: 1px solid #ccc;
}
.icon-xianghou {
  font-size: 0.78125rem;
  position: absolute;
  right: 0.15625rem;
  top:0;
}
.description {
  line-height: 1.25rem;
  padding-left: 0.3125rem;
}
.theme-list li{
  padding: 0.3125rem;
  border-bottom: 1px solid #ccc;
}
.theme-list p {
  font-size: 0.25rem;
}

</style>
